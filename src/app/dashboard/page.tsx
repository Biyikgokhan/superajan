import { createClient } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Superajan",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/giris");

  // Use admin client to bypass RLS for tenant lookup
  const admin = getSupabaseAdmin();

  const { data: tenant } = await admin
    .from("tenants")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  // No tenant yet — send to onboarding
  if (!tenant) redirect("/onboarding");

  // Get current month payment status
  const { data: payment } = await admin
    .from("payments")
    .select("*")
    .eq("tenant_id", tenant.id)
    .eq("period", `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`)
    .single();

  const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  // Check if user has Google identity linked
  const googleConnected = user.app_metadata?.providers?.includes("google") ?? false;

  return (
    <DashboardClient
      user={user}
      tenant={tenant}
      payment={payment}
      currentMonth={currentMonth}
      googleConnected={googleConnected}
    />
  );
}
