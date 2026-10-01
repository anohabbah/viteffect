// Section 0 · Basics — show-me-effect-deep-dive.html#basics
import { Effect } from "effect"

// 1. Wrap JSON.parse so a bad input becomes the typed error "BadJson" instead of a throw.
//    Expected type: Effect<unknown, "BadJson">
export const parseJson = (text: string) =>
  Effect.try({
    try: (): unknown => JSON.parse(text),
    catch: () => "BadJson" as const,
  })

// 2. Use Effect.fn("divide") to divide a by b, failing with "DivideByZero" when b is 0.
//    Expected type: (a: number, b: number) => Effect<number, "DivideByZero">
export const divide = Effect.fn("divide")(function* (a: number, b: number) {
  if (b === 0) return yield* Effect.fail("DivideByZero" as const)
  return a / b
})

// 3. Sum two parsed numbers with Effect.gen: parse both texts, then divide the sum by `by`.
//    Errors from both helpers must show up in E.
//    Expected type: Effect<number, "BadJson" | "DivideByZero">
export const averageOf = (x: string, y: string, by: number) =>
  Effect.gen(function* () {
    const a = Number(yield* parseJson(x))
    const b = Number(yield* parseJson(y))
    return yield* divide(a + b, by)
  })
