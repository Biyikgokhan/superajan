import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { company, name, phone, sector } = await request.json();

  if (!company || !name) {
    return NextResponse.json(
      { error: "Şirket adı ve isim zorunludur." },
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

  // Check if tenant already exists
  const { data: existing } = await supabase
    .from("tenants")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (existing) {
    return NextResponse.json({ error: "Hesap zaten mevcut." }, { status: 409 });
  }

  // Use admin client to insert tenant (bypasses RLS)
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await admin.from("tenants").insert({
    auth_user_id: user.id,
    name,
    company,
    phone: phone || null,
    sector: sector || null,
    email: user.email,
  });

  if (error) {
    console.error("Tenant creation error:", error);
    return NextResponse.json(
      { error: "Hesap oluşturulamadı. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
