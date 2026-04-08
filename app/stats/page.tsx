"use client";

import { useState } from "react";
import { StatsProvider } from "@/components/stats-provider";
import { ApiKeyForm } from "@/components/api-key-form";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  const [apiKey, setApiKey] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (key: string) => {
    setApiKey(key);
    setSubmitted(true);
  };

  const handleReset = () => {
    setApiKey("");
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {!submitted ? (
        <ApiKeyForm onSubmit={handleSubmit} />
      ) : (
        <StatsProvider apiKey={apiKey}>
          <Dashboard onReset={handleReset} />
        </StatsProvider>
      )}
    </main>
  );
}
