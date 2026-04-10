import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json();
  const { billing_type, legal_name, tax_id, tax_office, billing_address } = body;

  if (!legal_name || !tax_id) {
    return NextResponse.json(
      { error: "Ad/unvan ve vergi numarası zorunlu." },
      { status: 400 }
    );
  }

  if (billing_type === "corporate" && !tax_office) {
    return NextResponse.json(
      { error: "Kurumsal fatura için vergi dairesi zorunlu." },
      { status: 400 }
    );
  }

  // Validate tax_id length (10 for VKN, 11 for TCKN)
  if (billing_type === "corporate" && tax_id.length !== 10) {
    return NextResponse.json(
      { error: "VKN 10 haneli olmalıdır." },
      { status: 400 }
    );
  }
  if (billing_type === "individual" && tax_id.length !== 11) {
    return NextResponse.json(
      { error: "TC Kimlik No 11 haneli olmalıdır." },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  const { error } = await admin
    .from("tenants")
    .update({
      billing_type,
      legal_name,
      tax_id,
      tax_office: tax_office || null,
      billing_address: billing_address || null,
    })
    .eq("auth_user_id", user.id);

  if (error) {
    console.error("Billing update error:", error);
    return NextResponse.json(
      { error: "Fatura bilgileri kaydedilemedi." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
