import { NextResponse } from "next/server";

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/userinfo.email",
].join(" ");

export async function GET() {
  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://superajan.com").trim();
  const redirectUri = siteUrl + "/api/google/callback";

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent",
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}
