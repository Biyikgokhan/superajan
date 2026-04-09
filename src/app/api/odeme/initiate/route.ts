import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { initiate3DSecure } from "@/lib/garanti-pos";
import { getUsdTryRate } from "@/lib/tcmb-kur";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const body = await request.json();
  const { cardNumber, expMonth, expYear, cvv } = body;

  if (!cardNumber || !expMonth || !expYear || !cvv) {
    return NextResponse.json(
      { error: "Kart bilgileri eksik." },
      { status: 400 }
    );
  }

  // Get tenant for this user
  const { data: tenant } = await supabase
    .from("tenants")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  const tenantId = tenant?.id || user.id;

  // Check if already paid this month
  const currentPeriod = new Date().toISOString().slice(0, 7); // '2026-04'
  const { data: existingPayment } = await supabase
    .from("payments")
    .select("id, status")
    .eq("tenant_id", tenantId)
    .eq("period", currentPeriod)
    .eq("status", "paid")
    .single();

  if (existingPayment) {
    return NextResponse.json(
      { error: "Bu ay için ödemeniz zaten yapılmış." },
      { status: 400 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // Check if first payment (for transition discount)
  const admin = getSupabaseAdmin();
  const { count: paidCount } = await admin
    .from("payments")
    .select("*", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .eq("status", "paid");

  const isFirstPayment = (paidCount ?? 0) === 0;
  const baseUsd = isFirstPayment ? 800 : 1000;
  const USD_AMOUNT = Math.round(baseUsd * 1.2); // + %20 KDV

  // USD → TRY via TCMB selling rate
  const usdTryRate = await getUsdTryRate();
  const amountTry = Math.round(USD_AMOUNT * usdTryRate * 100); // kuruş cinsinden

  const result = initiate3DSecure({
    cardNumber: cardNumber.replace(/\s/g, ""),
    expMonth,
    expYear,
    cvv,
    amount: amountTry,
    email: user.email || "",
    ip,
    tenantId: tenantId,
  });

  // Store pending payment record
  const amountTryDecimal = amountTry / 100;
  await supabase.from("payments").upsert(
    {
      tenant_id: tenantId,
      period: currentPeriod,
      amount: amountTryDecimal,
      currency: "TRY",
      status: "pending",
      payment_method: "card",
      notes: `Order: ${result.orderId} | $${USD_AMOUNT} USD × ${usdTryRate} = ${amountTryDecimal} TRY`,
    },
    { onConflict: "tenant_id,period" }
  );

  return NextResponse.json({
    action: result.action,
    fields: result.fields,
    rate: usdTryRate,
    amountTry: amountTryDecimal,
  });
}
