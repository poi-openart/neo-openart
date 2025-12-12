import { auth, compose, errorBoundary } from "@/lib/middlewares";
import { NextResponse } from "next/server";

const handler = compose(errorBoundary({ scope: "get token failed" }), auth());

export const GET = handler(async (_req, { token }) => {
  return NextResponse.json({ token });
});
