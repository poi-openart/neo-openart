import { NextResponse, NextRequest } from "next/server";
import { ApiHandler, ContextProvider } from "./index";

export function errorBoundary<T = Record<string, never>>(options?: {
  scope?: string;
}): ContextProvider<T & Record<string, never>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (h: ApiHandler<any>) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (req: NextRequest, ctx: any): Promise<NextResponse> => {
      const { scope = "服务器内部错误" } = options || {};

      try {
        return await h(req, { ...ctx });
      } catch (error) {
        return NextResponse.json(
          { error: `${scope}: ${String(error)}` },
          { status: 500 }
        );
      }
    };
}
