"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const BASE = "https://hackatime.hackclub.com/api/hackatime/v1";
const V1 = "https://hackatime.hackclub.com/api/v1";

export interface HackatimeData {
  stats: any;
  statusbar: any;
  heartbeats: any;
  loading: boolean;
  errors: Record<string, string>;
  refresh: () => void;
}

const Ctx = createContext<HackatimeData | null>(null);

export function useStats() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStats must be used inside StatsProvider");
  return ctx;
}

async function apiFetch(url: string, apiKey: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

const today = new Date().toISOString().split("T")[0];
const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

export function StatsProvider({
  apiKey,
  children,
}: {
  apiKey: string;
  children: ReactNode;
}) {
  const [data, setData] = useState<Omit<HackatimeData, "refresh">>({
    stats: null,
    statusbar: null,
    heartbeats: null,
    loading: true,
    errors: {},
  });

  const load = async () => {
    setData((d) => ({ ...d, loading: true, errors: {} }));

    const endpoints: Array<[string, string, string]> = [
      ["statusbar", `${BASE}/users/current/statusbar/today`, ""],
      ["heartbeats", `${V1}/my/heartbeats?date=${today}`, ""],
      ["stats", `${BASE}/users/current/stats/last_7_days`, ""],
    ];

    const results: Record<string, any> = {};
    const errors: Record<string, string> = {};

    await Promise.allSettled(
      endpoints.map(async ([key, url]) => {
        try {
          results[key] = await apiFetch(url, apiKey);
        } catch (e: any) {
          errors[key] = e.message;
        }
      })
    );

    setData({
      stats: results.stats ?? null,
      statusbar: results.statusbar ?? null,
      heartbeats: results.heartbeats ?? null,
      loading: false,
      errors,
    });
  };

  useEffect(() => {
    load();
  }, [apiKey]);

  return (
    <Ctx.Provider value={{ ...data, refresh: load }}>{children}</Ctx.Provider>
  );
}