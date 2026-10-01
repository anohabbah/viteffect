import { Effect } from "effect"
import { describe, expect, expectTypeOf, it } from "vitest"
import { fastest, withConnection, worker } from "./01-runtime.ts"

describe("01 · runtime", () => {
  it("worker", async () => {
    const log: Array<string> = []
    expectTypeOf(worker("w", 1, log)).toEqualTypeOf<Effect.Effect<string>>()
    expect(await Effect.runPromise(worker("w", 1, log))).toBe("w")
    expect(log).toEqual(["w cleanup"])
  })

  it("fastest", async () => {
    const log: Array<string> = []
    expectTypeOf(fastest(log)).toEqualTypeOf<Effect.Effect<string>>()
    expect(await Effect.runPromise(fastest(log))).toBe("fast")
    expect(log).toEqual(expect.arrayContaining(["fast cleanup", "slow interrupted", "slow cleanup"]))
  })

  it("withConnection", async () => {
    const log: Array<string> = []
    const ok = withConnection(Effect.succeed(1), log)
    expectTypeOf(ok).toEqualTypeOf<Effect.Effect<number>>()
    expect(await Effect.runPromise(ok)).toBe(1)
    expect(log).toEqual(["open", "close"])

    log.length = 0
    const failing = withConnection(Effect.fail("boom" as const), log)
    expectTypeOf(failing).toEqualTypeOf<Effect.Effect<never, "boom">>()
    expect(await Effect.runPromise(Effect.flip(failing))).toBe("boom")
    expect(log).toEqual(["open", "close"])
  })
})
