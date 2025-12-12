import { NextRequest, NextResponse } from "next/server";

export type ApiContext<T = { params: Promise<Record<string, string>> }> = T;

export type ApiHandler<Context = any> = (
  req: NextRequest,
  ctx: ApiContext<Context>
) => Promise<NextResponse>;

export type ContextProvider<Provided> = <
  BaseCtx = { params: Promise<Record<string, string>> },
>(
  handler: ApiHandler<Provided & BaseCtx>
) => ApiHandler<BaseCtx>;

export function compose<A>(a: ContextProvider<A>): ContextProvider<A>;

export function compose<A, B>(
  a: ContextProvider<A>,
  b: ContextProvider<B>
): ContextProvider<A & B>;

export function compose<A, B, C>(
  a: ContextProvider<A>,
  b: ContextProvider<B>,
  c: ContextProvider<C>
): ContextProvider<A & B & C>;

export function compose<A, B, C, D>(
  a: ContextProvider<A>,
  b: ContextProvider<B>,
  c: ContextProvider<C>,
  d: ContextProvider<D>
): ContextProvider<A & B & C & D>;

export function compose<A, B, C, D, E>(
  a: ContextProvider<A>,
  b: ContextProvider<B>,
  c: ContextProvider<C>,
  d: ContextProvider<D>,
  e: ContextProvider<E>
): ContextProvider<A & B & C & D & E>;

export function compose(
  ...providers: ContextProvider<any>[]
): ContextProvider<any> {
  return (handler) =>
    providers.reduceRight((acc, provider) => provider(acc), handler);
}

export * from "./auth";
export * from "./error-boundary";
