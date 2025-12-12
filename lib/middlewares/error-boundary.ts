import { NextResponse, NextRequest } from "next/server";
import { ApiHandler, ContextProvider } from "./index";

export function errorBoundary<T = any>(options?: {
  scope?: string;
}): ContextProvider<T & any> {
  return (h: ApiHandler<any>) =>
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
