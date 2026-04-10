import { createClient } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { redirect } from "next/navigation";
import { OdemeClient } from "./odeme-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ödeme — Superajan",
};

export default async function OdemePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/giris");

  const admin = getSupabaseAdmin();

  // Get tenant info for contract personalization
  const { data: tenant } = await admin
    .from("tenants")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  // Transition discount only for Marcomen (legacy customer)
  const MARCOMEN_TENANT_ID = "95186159-cd12-42eb-aa94-0806c798b974";
  let isFirstPayment = false;
  if (tenant?.id === MARCOMEN_TENANT_ID) {
    const { count } = await admin
      .from("payments")
      .select("*", { count: "exact", head: true })
      .eq("tenant_id", tenant.id)
      .eq("status", "paid");
    isFirstPayment = (count ?? 0) === 0;
  }

  return (
    <OdemeClient
      user={user}
      tenant={tenant}
      isFirstPayment={isFirstPayment}
    />
  );
}
