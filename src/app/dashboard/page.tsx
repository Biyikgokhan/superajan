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

  // Usage counts for current month
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
  const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString();

  const [{ count: imageCount }, { count: videoCount }] = await Promise.all([
    admin
      .from("usage_analytics")
      .select("*", { count: "exact", head: true })
      .eq("tenant_id", tenant.id)
      .in("feature", ["image_gen", "sole_swap"])
      .eq("action", "success")
      .gte("created_at", monthStart)
      .lt("created_at", monthEnd),
    admin
      .from("usage_analytics")
      .select("*", { count: "exact", head: true })
      .eq("tenant_id", tenant.id)
      .eq("feature", "video_gen")
      .eq("action", "success")
      .gte("created_at", monthStart)
      .lt("created_at", monthEnd),
  ]);

  // Check if Google Workspace is connected (stored in tenant record)
  const googleConnected = !!tenant.google_connected_at;

  return (
    <DashboardClient
      user={user}
      tenant={tenant}
      payment={payment}
      currentMonth={currentMonth}
      googleConnected={googleConnected}
      imageCount={imageCount ?? 0}
      videoCount={videoCount ?? 0}
    />
  );
}
