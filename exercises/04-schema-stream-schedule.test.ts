import { Effect, Schema } from "effect"
import { describe, expect, expectTypeOf, it } from "vitest"
import { decodePerson, evenSquares, Person, retryThrice } from "./04-schema-stream-schedule.ts"

describe("04 · schema · stream · schedule", () => {
  it("Person / decodePerson", () => {
    expectTypeOf<typeof Person.Type>().toEqualTypeOf<{ readonly name: string; readonly age: number; readonly born: Date }>()
    expectTypeOf<typeof Person.Encoded>().toEqualTypeOf<{ readonly name: string; readonly age: number; readonly born: string }>()
    expectTypeOf(decodePerson).returns.toEqualTypeOf<Effect.Effect<typeof Person.Type, Schema.SchemaError>>()

    const ada = Effect.runSync(decodePerson({ name: "Ada", age: 36, born: "1815-12-10T00:00:00.000Z" }))
    expect(ada.born).toBeInstanceOf(Date)
    expect(ada.born.getUTCFullYear()).toBe(1815)

    for (const bad of [{ name: "", age: 1, born: "2000-01-01" }, { name: "A", age: 1.5, born: "2000-01-01" }, { name: "A", age: 200, born: "2000-01-01" }, { name: "A", age: 1 }]) {
      expect(Effect.runSyncExit(decodePerson(bad))._tag).toBe("Failure")
    }
  })

  it("evenSquares", () => {
    expectTypeOf(evenSquares).toEqualTypeOf<Effect.Effect<Array<number>>>()
    expect(Effect.runSync(evenSquares)).toEqual([4, 16, 36, 64, 100])
  })

  it("retryThrice", async () => {
    let attempts = 0
    const flaky = Effect.suspend(() => (++attempts < 3 ? Effect.fail("flaky" as const) : Effect.succeed(attempts)))
    expectTypeOf(retryThrice(flaky)).toEqualTypeOf<Effect.Effect<number, "flaky">>()
    expect(await Effect.runPromise(retryThrice(flaky))).toBe(3)

    attempts = 0
    const broken = Effect.suspend(() => { attempts++; return Effect.fail("broken" as const) })
    expect(await Effect.runPromise(Effect.flip(retryThrice(broken)))).toBe("broken")
    expect(attempts).toBe(4)
  })
})
