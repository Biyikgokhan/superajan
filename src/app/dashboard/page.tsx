import { createClient } from "@/lib/supabase-server";
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

  // Get tenant info
  const { data: tenant } = await supabase
    .from("tenants")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  // Get current month payment status
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { data: payment } = await supabase
    .from("payments")
    .select("*")
    .eq("tenant_id", tenant?.id)
    .eq("period", currentMonth)
    .single();

  // Check if user logged in via Google (has Google identity)
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
