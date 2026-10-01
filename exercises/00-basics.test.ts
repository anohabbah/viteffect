import { Effect } from "effect"
import { describe, expect, expectTypeOf, it } from "vitest"
import { averageOf, divide, parseJson } from "./00-basics.ts"

describe("00 · basics", () => {
  it("parseJson", () => {
    expectTypeOf(parseJson).returns.toEqualTypeOf<Effect.Effect<unknown, "BadJson">>()
    expect(Effect.runSync(parseJson('{"a":1}'))).toEqual({ a: 1 })
    expect(Effect.runSync(Effect.flip(parseJson("{nope")))).toBe("BadJson")
  })

  it("divide", () => {
    expectTypeOf(divide).returns.toEqualTypeOf<Effect.Effect<number, "DivideByZero">>()
    expect(Effect.runSync(divide(10, 2))).toBe(5)
    expect(Effect.runSync(Effect.flip(divide(1, 0)))).toBe("DivideByZero")
  })

  it("averageOf", () => {
    expectTypeOf(averageOf).returns.toEqualTypeOf<Effect.Effect<number, "BadJson" | "DivideByZero">>()
    expect(Effect.runSync(averageOf("4", "6", 2))).toBe(5)
    expect(Effect.runSync(Effect.flip(averageOf("4", "x", 2)))).toBe("BadJson")
    expect(Effect.runSync(Effect.flip(averageOf("4", "6", 0)))).toBe("DivideByZero")
  })
})
