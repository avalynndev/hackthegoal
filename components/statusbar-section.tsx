"use client";

import { useStats } from "@/components/stats-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export function StatusbarSection() {
  const { statusbar } = useStats();

  const d = statusbar?.data;
  if (!d) return null;

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Today's status bar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 text-sm">
          {d.grand_total && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-semibold">
                {d.grand_total.text ?? d.grand_total.digital}
              </span>
            </div>
          )}
          {d.range && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Date:</span>
              <span>{d.range.date}</span>
            </div>
          )}
        </div>

        {d.categories?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {d.categories.map((c: any) => (
              <Badge key={c.name} variant="secondary" className="text-xs gap-1">
                {c.name}
                <span className="text-muted-foreground">{c.text}</span>
              </Badge>
            ))}
          </div>
        )}

        {d.projects?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">
              Today's projects
            </p>
            <div className="flex flex-wrap gap-1.5">
              {d.projects.map((p: any) => (
                <Badge key={p.name} variant="outline" className="text-xs gap-1">
                  {p.name}
                  <span className="text-muted-foreground">{p.text}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {d.languages?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">
              Today's languages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {d.languages.map((l: any) => (
                <Badge key={l.name} variant="outline" className="text-xs gap-1">
                  {l.name}
                  <span className="text-muted-foreground">{l.text}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
