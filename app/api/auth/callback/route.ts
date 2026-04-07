import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // user denied
  if (error) {
    return NextResponse.redirect(new URL("/login?error=denied", req.url));
  }

  // verify state to prevent CSRF
  const savedState = req.cookies.get("oauth_state")?.value;
  if (!state || state !== savedState) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_state", req.url),
    );
  }

  // exchange code for access token
  const tokenRes = await fetch("https://hackatime.hackclub.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.HACKATIME_CLIENT_ID!,
      client_secret: process.env.HACKATIME_CLIENT_SECRET!,
      code: code!,
      redirect_uri: process.env.HACKATIME_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(
      new URL("/login?error=token_exchange", req.url),
    );
  }

  const { access_token } = await tokenRes.json();

  // store token in a secure httpOnly cookie
  const res = NextResponse.redirect(new URL("/dashboard", req.url));

  res.cookies.set("hackatime_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year (tokens last ~16 years)
    path: "/",
  });

  // clear the state cookie
  res.cookies.delete("oauth_state");

  return res;
}
