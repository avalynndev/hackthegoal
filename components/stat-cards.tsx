"use client";

import { useStats } from "@/components/stats-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  Flame,
  Code2,
  FolderGit2,
  Zap,
  CalendarDays,
} from "lucide-react";

function fmtSeconds(s?: number) {
  if (!s) return "0h 0m";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: any;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {label}
          </span>
          <div className={`p-1.5 rounded-md ${accent ?? "bg-muted"}`}>
            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatCards() {
  const { stats, heartbeats, loading } = useStats();

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const sd = stats?.data;
  const hbs = heartbeats?.data ?? heartbeats?.heartbeats ?? [];

  const dailyAvg = sd?.daily_average;
  const totalWeek = sd?.total_seconds;
  const numProjects = sd?.projects?.length ?? 0;
  const numLanguages = sd?.languages?.length ?? 0;
  const bestDay = sd?.best_day;
  const bestDaySeconds = bestDay?.total_seconds;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <MetricCard
        icon={Clock}
        label="This week"
        value={fmtSeconds(totalWeek)}
        sub="last 7 days"
        accent="bg-blue-500/10"
      />
      <MetricCard
        icon={Flame}
        label="Daily avg"
        value={fmtSeconds(dailyAvg)}
        sub="7-day average"
        accent="bg-orange-500/10"
      />
      <MetricCard
        icon={CalendarDays}
        label="Best day"
        value={fmtSeconds(bestDaySeconds)}
        sub={bestDay?.date ?? "—"}
        accent="bg-yellow-500/10"
      />
      <MetricCard
        icon={FolderGit2}
        label="Projects"
        value={String(numProjects)}
        sub="this week"
        accent="bg-green-500/10"
      />
      <MetricCard
        icon={Code2}
        label="Languages"
        value={String(numLanguages)}
        sub={`${hbs.length} heartbeats today`}
        accent="bg-pink-500/10"
      />
    </div>
  );
}
