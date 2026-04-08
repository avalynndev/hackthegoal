"use client";

import { useStats } from "@/components/stats-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity } from "lucide-react";

export function HeartbeatsSection() {
  const { heartbeats, loading } = useStats();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  const raw =
    heartbeats?.data ??
    heartbeats?.heartbeats ??
    (Array.isArray(heartbeats) ? heartbeats : []);
  if (!raw.length) return null;

  const items = [...raw].reverse()

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Today's heartbeats
          <Badge variant="secondary" className="text-xs ml-auto">
            {raw.length} total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <div className="space-y-0.5 pr-2">
            {items.map((hb: any, i: number) => {
              const ts = hb.time ? new Date(hb.time * 1000) : null;
              const timeStr = ts
                ? ts.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : null;

              return (
                <div
                  key={hb.id ?? i}
                  className="flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors text-xs group"
                >
                  {timeStr && (
                    <span className="font-mono text-muted-foreground shrink-0 w-20">
                      {timeStr}
                    </span>
                  )}
                  <span className="truncate text-foreground/80 flex-1 font-medium">
                    {hb.entity ?? hb.file ?? "—"}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {hb.language && (
                      <Badge variant="secondary" className="text-[10px]">
                        {hb.language}
                      </Badge>
                    )}
                    {hb.project && (
                      <Badge variant="outline" className="text-[10px]">
                        {hb.project}
                      </Badge>
                    )}
                    {hb.type && (
                      <span className="text-muted-foreground">{hb.type}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
