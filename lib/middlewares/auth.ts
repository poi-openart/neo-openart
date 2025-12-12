import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import type { ApiHandler, ContextProvider } from "./index";

interface AuthContext {
  token: JWT;
}

export function auth(): ContextProvider<AuthContext> {
  return (h: ApiHandler<AuthContext & any>) =>
    async (req: NextRequest, ctx: any) => {
      const token = await getToken({ req });
      const uid = token?.sub;

      if (!uid) {
        return NextResponse.json(
          {
            error: "Unauthorized",
            message: "Please login to continue",
          },
          { status: 401 }
        );
      }

      return h(req, { ...ctx, token });
    };
}
