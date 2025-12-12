import { NextRequest, NextResponse } from "next/server";

export type ApiContext<T = { params: Record<string, string> }> = T;

export type ApiHandler<Context = unknown> = (
  req: NextRequest,
  ctx: ApiContext<Context>
) => Promise<NextResponse>;

export type ContextProvider<Provided> = <
  BaseCtx = { params: Record<string, string> },
>(
  handler: ApiHandler<Provided & BaseCtx>
) => ApiHandler<BaseCtx>;

export function compose<Ctx1, Ctx2>(
  provider1: ContextProvider<Ctx1>,
  provider2: ContextProvider<Ctx2>
): ContextProvider<Ctx1 & Ctx2>;
export function compose<Ctx1, Ctx2, Ctx3>(
  provider1: ContextProvider<Ctx1>,
  provider2: ContextProvider<Ctx2>,
  provider3: ContextProvider<Ctx3>
): ContextProvider<Ctx1 & Ctx2 & Ctx3>;
export function compose<Ctx1, Ctx2, Ctx3, Ctx4>(
  provider1: ContextProvider<Ctx1>,
  provider2: ContextProvider<Ctx2>,
  provider3: ContextProvider<Ctx3>,
  provider4: ContextProvider<Ctx4>
): ContextProvider<Ctx1 & Ctx2 & Ctx3 & Ctx4>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compose(
  ...providers: ContextProvider<any>[]
): ContextProvider<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (handler: ApiHandler<any>) => {
    return providers.reduceRight((acc, provider) => provider(acc), handler);
  };
}

export * from "./auth";
export * from "./error-boundary";
