import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 w-full bg-darker text-surface-content">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <a
            className="inline-flex items-center gap-3 mb-8"
            href="https://hackatime.hackclub.com/"
          >
            <img
              src="https://hackatime.hackclub.com/images/new-icon-rounded.png"
              className="w-12 h-12 rounded-lg"
              alt="Hackatime"
            />{" "}
            <span className="font-bold text-3xl tracking-tight">
              HackTheGoal
            </span>
          </a>
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            Sign in to HackTheGoal
          </h1>
          <p className="text-secondary-h text-sm">
            Make coding goals. Reach them.
          </p>
        </div>
        <div className="w-full max-w-md space-y-4">
          <Link
            href="/api/auth/login"
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-primary-h text-[#1d2021] font-medium hover:opacity-90 transition-all"
          >
            <img
              src="https://hackatime.hackclub.com/images/icon-rounded.png"
              className="h-5 w-5"
              alt="HackTheGoal"
            />
            Connect with Hackatime
          </Link>
        </div>
        <div className="flex items-center gap-4 py-1">
          <div className="flex-1 h-px flex-1 bg-surface-200"></div>{" "}
          <span className="text-xs text--h uppercase tracking-wider">
            or
          </span>{" "}
          <div className="flex-1 h-px flex-1 bg-surface-200"></div>
        </div>
        <div className="text-center">
          <a
            className="text-sm text-secondary-h hover:text-primary-h transition-colors"
            href="https://hackatime.hackclub.com/"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
