import { Button } from "@/components/ui/button";
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
            <span className="font-bold text-3xl tracking-tight">Hackatime</span>
          </a>
        </div>
        <Link href="/api/auth/login">
          <Button variant="outline">Connect with Hackatime</Button>
        </Link>
      </div>
    </div>
  );
}
