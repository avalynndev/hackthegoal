import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_id: process.env.HACKATIME_CLIENT_ID!,
    redirect_uri: process.env.HACKATIME_REDIRECT_URI!,
    response_type: "code",
    scope: "profile read",
    state,
  });

  const res = NextResponse.redirect(
    `https://hackatime.hackclub.com/oauth/authorize?${params}`,
  );

  res.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return res;
}
