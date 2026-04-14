import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth, username } from "better-auth/plugins";
import { db } from "@/db";
import { schema } from "@/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "HackTheGoal",
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [
    nextCookies(),
    username(),
    genericOAuth({
      config: [
        {
          providerId: "hackatime",
          clientId: process.env.HACKATIME_CLIENT_ID!,
          clientSecret: process.env.HACKATIME_CLIENT_SECRET!,
          authorizationUrl: "https://hackatime.hackclub.com/oauth/authorize",
          tokenUrl: "https://hackatime.hackclub.com/oauth/token",
          userInfoUrl: "https://hackatime.hackclub.com/api/v1/users/current",
          scopes: ["profile", "read"],
          getUserInfo: async (tokens) => {
            const res = await fetch(
              "https://hackatime.hackclub.com/api/v1/authenticated/me",
              { headers: { Authorization: `Bearer ${tokens.accessToken}` } },
            );
            const user = await res.json();

            return {
              id: String(user.id),
              name: user.github_username ?? user.slack_id ?? String(user.id),
              username:
                user.github_username ?? user.slack_id ?? String(user.id),
              email: user.emails?.[0] ?? null,
              emailVerified: false,
              image: undefined,
            };
          },
        },
      ],
    }),
  ],
});

export const { getSession } = auth.api;

export type SessionData = (typeof auth)["$Infer"]["Session"];
