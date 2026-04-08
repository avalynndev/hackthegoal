"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound, Clock, BarChart3, Zap } from "lucide-react";

interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
}

export function ApiKeyForm({ onSubmit }: ApiKeyFormProps) {
  const [key, setKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) onSubmit(key.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
            <Clock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Hackatime Stats</h1>
          <p className="text-muted-foreground text-sm">
            Visualize all your coding data from Hackatime
          </p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-muted-foreground" />
              Enter your API key
            </CardTitle>
            <CardDescription className="text-xs">
              Find it at{" "}
              <a
                href="https://hackatime.hackclub.com/my/wakatime_setup"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-2"
              >
                hackatime.hackclub.com/my/wakatime_setup
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="apikey"
                  className="text-xs text-muted-foreground"
                >
                  API Key
                </Label>
                <Input
                  id="apikey"
                  type="password"
                  placeholder="waka_xxxxxxxxxxxxxxxxxxxxxxxx"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="font-mono text-sm"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full" disabled={!key.trim()}>
                Load my stats
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex flex-wrap justify-center gap-2">
          {[
            { icon: BarChart3, label: "Projects & Languages" },
            { icon: Zap, label: "Live heartbeats" },
            { icon: Clock, label: "Daily totals" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 border border-border/50 rounded-full px-3 py-1"
            >
              <Icon className="w-3 h-3" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
