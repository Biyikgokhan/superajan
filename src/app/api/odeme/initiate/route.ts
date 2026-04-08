import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { initiate3DSecure } from "@/lib/garanti-pos";

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

  if (!tenant) {
    return NextResponse.json(
      { error: "Hesap bilgisi bulunamadı." },
      { status: 404 }
    );
  }

  // Check if already paid this month
  const currentPeriod = new Date().toISOString().slice(0, 7); // '2026-04'
  const { data: existingPayment } = await supabase
    .from("payments")
    .select("id, status")
    .eq("tenant_id", tenant.id)
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

  // Amount: $1200 → need TRY conversion. For now using TRY amount in kuruş.
  // TODO: Dynamic exchange rate or fixed TRY price
  const amountKurus = 120000; // 1200.00 TRY (placeholder — adjust to actual pricing)

  const result = initiate3DSecure({
    cardNumber: cardNumber.replace(/\s/g, ""),
    expMonth,
    expYear,
    cvv,
    amount: amountKurus,
    email: user.email || "",
    ip,
    tenantId: tenant.id,
  });

  // Store pending payment record
  await supabase.from("payments").upsert(
    {
      tenant_id: tenant.id,
      period: currentPeriod,
      amount: 1200.0,
      currency: "TRY",
      status: "pending",
      payment_method: "card",
      notes: `Order: ${result.orderId}`,
    },
    { onConflict: "tenant_id,period" }
  );

  return NextResponse.json({
    action: result.action,
    fields: result.fields,
  });
}
