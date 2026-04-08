import { NextRequest, NextResponse } from "next/server";
import { complete3DSecure } from "@/lib/garanti-pos";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  // Garanti POSTs form data to this URL after 3D verification
  const formData = await request.formData();

  const mdstatus = formData.get("mdstatus") as string;
  const md = formData.get("md") as string;
  const cavv = formData.get("cavv") as string;
  const eci = formData.get("eci") as string;
  const xid = formData.get("xid") as string;
  const orderid = formData.get("orderid") as string;
  const txnamount = formData.get("txnamount") as string;
  const customeripaddress = formData.get("customeripaddress") as string;

  const supabase = supabaseAdmin;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://superajan.com";

  // Find the pending payment by order ID
  const { data: payment } = await supabase
    .from("payments")
    .select("*")
    .ilike("notes", `%${orderid}%`)
    .eq("status", "pending")
    .single();

  if (!payment) {
    return NextResponse.redirect(`${baseUrl}/odeme?error=notfound`);
  }

  // Complete the 3D Secure payment
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

  if (result.success) {
    // Update payment record
    await supabase
      .from("payments")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        notes: `Order: ${orderid} | 3D Secure OK`,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id);

    return NextResponse.redirect(`${baseUrl}/odeme?success=true`);
  } else {
    // Mark payment as failed
    await supabase
      .from("payments")
      .update({
        status: "failed",
        notes: `Order: ${orderid} | ${result.message} | ${result.details || ""}`,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id);

    const errorMsg = encodeURIComponent(result.message);
    return NextResponse.redirect(`${baseUrl}/odeme?error=${errorMsg}`);
  }
}
