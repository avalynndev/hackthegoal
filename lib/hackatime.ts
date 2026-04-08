import { cookies } from "next/headers";

const BASE = "https://hackatime.hackclub.com/api/v1/authenticated";

async function hackatimeFetch(path: string) {
  const cookiesT = await cookies();
  const token = cookiesT.get("hackatime_token")?.value;
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 }, // cache for 5 minutes
  });

  if (!res.ok) throw new Error(`Hackatime error: ${res.status}`);
  return res.json();
}

export const getMe = () => hackatimeFetch("/me");
export const getStreak = () => hackatimeFetch("/streak");
export const getHours = (start: string, end: string) =>
  hackatimeFetch(`/hours?start_date=${start}&end_date=${end}`);
export const getProjects = () => hackatimeFetch("/projects");
export const getLatestHeartbeat = () => hackatimeFetch("/heartbeats/latest");
