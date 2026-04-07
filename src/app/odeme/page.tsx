import { createClient } from "@/lib/supabase-server";
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

  // Get tenant info for contract personalization
  const { data: tenant } = await supabase
    .from("tenants")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  return (
    <OdemeClient
      user={user}
      tenant={tenant}
    />
  );
}
