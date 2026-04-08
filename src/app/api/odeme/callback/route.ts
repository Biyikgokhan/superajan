import { NextRequest, NextResponse } from "next/server";
import { complete3DSecure } from "@/lib/garanti-pos";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://superajan.com";

  // Log all callback params for debugging
  const params: Record<string, string> = {};
  formData.forEach((value, key) => {
    params[key] = value as string;
  });
  console.log("[garanti-callback]", JSON.stringify(params));

  const mdstatus = params.mdstatus || "";
  const md = params.md || "";
  const cavv = params.cavv || "";
  const eci = params.eci || "";
  const xid = params.xid || "";
  const orderid = params.orderid || "";
  const txnamount = params.txnamount || "";
  const customeripaddress = params.customeripaddress || "";

  // Complete the 3D Secure payment with Garanti
  const result = await complete3DSecure({
    mdstatus,
    md,
    cavv,
    eci,
    xid,
    orderid,
    amount: txnamount,
    customeripaddress,
  });

  console.log("[garanti-callback] result:", JSON.stringify(result));

  const supabase = supabaseAdmin;

  // Try to find and update existing payment record
  const { data: payment } = await supabase
    .from("payments")
    .select("*")
    .ilike("notes", `%${orderid}%`)
    .maybeSingle();

  if (result.success) {
    if (payment) {
      await supabase
        .from("payments")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          notes: `Order: ${orderid} | 3D Secure OK`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", payment.id);
    }
    // Use 308 to preserve GET after redirect
    return NextResponse.redirect(`${baseUrl}/odeme?success=true`, 303);
  } else {
    if (payment) {
      await supabase
        .from("payments")
        .update({
          status: "failed",
          notes: `Order: ${orderid} | ${result.message} | ${result.details || ""}`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", payment.id);
    }
    const errorMsg = encodeURIComponent(result.message);
    return NextResponse.redirect(`${baseUrl}/odeme?error=${errorMsg}`, 303);
  }
}
