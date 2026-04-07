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

  if (!tenant) redirect("/giris");

  // Get current month payment status
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { data: payment } = await supabase
    .from("payments")
    .select("*")
    .eq("tenant_id", tenant.id)
    .eq("period", currentMonth)
    .single();

  // Get memories (events, projects, preferences)
  const { data: memories } = await supabase
    .from("active_memories")
    .select("*")
    .eq("tenant_id", tenant.id)
    .order("importance", { ascending: false })
    .limit(30);

  // Get recent conversations
  const { data: conversations } = await supabase
    .from("conversation_logs")
    .select("*")
    .eq("tenant_id", tenant.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(20);

  // Get usage analytics
  const { data: usage } = await supabase
    .from("usage_analytics")
    .select("*")
    .eq("tenant_id", tenant.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <DashboardClient
      user={user}
      tenant={tenant}
      payment={payment}
      currentMonth={currentMonth}
      memories={memories || []}
      conversations={conversations || []}
      usage={usage || []}
    />
  );
}
