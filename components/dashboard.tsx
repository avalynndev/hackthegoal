"use client";

import { useStats } from "@/components/stats-provider";
import { StatCards } from "@/components/stat-cards";
import { HeartbeatsSection } from "@/components/heartbeats-section";
import { StatusbarSection } from "@/components/statusbar-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, LogOut, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DashboardProps {
  onReset: () => void;
}

export function Dashboard({ onReset }: DashboardProps) {
  const { loading, errors, refresh } = useStats();
  const errorKeys = Object.keys(errors);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight">
              Hackatime Stats
            </span>
            {loading && (
              <Badge variant="secondary" className="text-xs animate-pulse">
                Loading…
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={refresh}
              disabled={loading}
              className="h-8 gap-1.5 text-xs"
            >
              <RefreshCw
                className={`w-3 h-3 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onReset}
              className="h-8 gap-1.5 text-xs text-muted-foreground"
            >
              <LogOut className="w-3 h-3" />
              Change key
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {errorKeys.length > 0 && (
          <Alert
            variant="destructive"
            className="border-destructive/40 bg-destructive/5"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Some endpoints failed:{" "}
              {errorKeys.map((k) => (
                <span key={k} className="font-mono font-medium">
                  {k} ({errors[k]}){" "}
                </span>
              ))}
            </AlertDescription>
          </Alert>
        )}
        <StatCards />
        <StatusbarSection />

        <HeartbeatsSection />
      </div>
    </div>
  );
}
