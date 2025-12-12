"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        // Redirect to home page or dashboard
        window.location.href = "/";
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Enter your credentials to access your account
        </p>
      </div>

      {error && (
        <div
          className={cn(
            "rounded-md bg-red-50 p-4 text-sm text-red-800",
            "dark:bg-red-900/20 dark:text-red-400"
          )}
        >
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={cn(
              "flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm",
              "placeholder:text-zinc-500",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400",
              "dark:focus-visible:ring-white"
            )}
            placeholder="name@example.com"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={cn(
              "flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm",
              "placeholder:text-zinc-500",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400",
              "dark:focus-visible:ring-white"
            )}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "inline-flex h-10 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white",
          "transition-colors hover:bg-zinc-800",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:ring-white"
        )}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};
