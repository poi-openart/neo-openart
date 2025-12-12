import Link from "next/link";
import { SignInForm } from "./components/SignInForm";
import { TokenDisplay } from "./components/TokenDisplay";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        className={cn(
          "flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16",
          "bg-white dark:bg-black sm:items-start"
        )}
      >
        <Link
          prefetch
          href="https://testing.openart.ai"
          className={cn(
            "rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white",
            "transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900",
            "dark:hover:bg-zinc-200"
          )}
        >
          back to main homepage
        </Link>
        <SignInForm />
        <TokenDisplay />
      </main>
    </div>
  );
}
