"use client";

import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const fetchToken = async () => {
  const response = await fetch("/api/token");
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }
  return response.json();
};

export const TokenDisplay = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["token"],
    queryFn: fetchToken,
  });

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6",
        "dark:border-zinc-800 dark:bg-zinc-900"
      )}
    >
      <h2 className="mb-4 text-xl font-semibold">Token Information</h2>

      {isLoading && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Loading token...
        </p>
      )}

      {error && (
        <div
          className={cn(
            "rounded-md bg-red-50 p-4 text-sm text-red-800",
            "dark:bg-red-900/20 dark:text-red-400"
          )}
        >
          Error: {error.message}
        </div>
      )}

      {data && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Token Data:
          </p>
          <pre
            className={cn(
              "overflow-auto rounded-md bg-zinc-100 p-4 text-xs",
              "dark:bg-zinc-800 dark:text-zinc-200"
            )}
          >
            {JSON.stringify(data.token, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
