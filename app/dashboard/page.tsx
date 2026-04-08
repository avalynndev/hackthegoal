import { redirect } from "next/navigation";
import { getMe, getStreak, getHours, getProjects, getApiKeys } from "@/lib/hackatime";

function getWeekRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 6);
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
  };
}

export default async function DashboardPage() {
  const { start, end } = getWeekRange();

  let me, streak, hours, projects;
  try {
    [me, streak, hours, projects ] = await Promise.all([
      getMe(),
      getStreak(),
      getHours(start, end),
      getProjects(),
    ]);
  } catch {
    redirect("/login");
  }
  const totalHours = (hours.total_seconds / 3600).toFixed(1);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-lg">
              Hack<span className="text-red-500">TheGoal</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {me.github_username ?? me.emails?.[0]}
            </span>
            {me.emails}
            <a
              href="/api/auth/logout"
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Sign out
            </a>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-1">
          Hey {me.github_username ?? "hacker"}, keep shipping! 🔥
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {start} — {end}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 mb-1">Current streak</p>
            <p className="text-2xl font-semibold text-red-500">
              {streak.streak_days}
              <span className="text-base font-normal text-gray-500 ml-1">days</span>
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 mb-1">Hours this week</p>
            <p className="text-2xl font-semibold">
              {totalHours}
              <span className="text-base font-normal text-gray-500 ml-1">hrs</span>
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 mb-1">Projects</p>
            <p className="text-2xl font-semibold">
              {projects.projects.length}
              <span className="text-base font-normal text-gray-500 ml-1">active</span>
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-base font-semibold mb-3">Projects</h2>
          <div className="flex flex-col gap-3">
            {projects.projects.map((project: {
              name: string;
              total_seconds: number;
              languages: string[];
              most_recent_heartbeat: string;
            }) => {
              const projectHours = (project.total_seconds / 3600).toFixed(1);
              const lastSeen = new Date(project.most_recent_heartbeat)
                .toLocaleDateString("en-US", { month: "short", day: "numeric" });

              return (
                <div
                  key={project.name}
                  className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {project.languages.slice(0, 3).join(", ") || "Unknown"} · last active {lastSeen}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{projectHours}h</p>
                  </div>
                </div>
              );
            })}

            {projects.projects.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">
                No projects yet — start coding and Hackatime will pick them up!
              </p>
            )}
          </div>
        </div>

        <LatestHeartbeat />
      </div>
    </main>
  );
}

import { getLatestHeartbeat } from "@/lib/hackatime";

async function LatestHeartbeat() {
  try {
    const hb = await getLatestHeartbeat();
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-400 mb-2">Currently working on</p>
        <p className="font-medium text-sm">{hb.entity}</p>
        <p className="text-xs text-gray-400 mt-1">
          {hb.project} · {hb.language} · {hb.editor}
        </p>
      </div>
    );
  } catch {
    return null;
  }
}