import { Effect } from "effect"
import { describe, expect, expectTypeOf, it } from "vitest"
import { findAll, findUser, findUserOrAnonymous, NotFound } from "./02-errors.ts"

describe("02 · errors", () => {
  it("NotFound", () => {
    const e = new NotFound({ id: "9" })
    expect(e._tag).toBe("NotFound")
    expect(e.id).toBe("9")
  })

  it("findUser", () => {
    expectTypeOf(findUser).returns.toEqualTypeOf<Effect.Effect<string, NotFound>>()
    expect(Effect.runSync(findUser("1"))).toBe("Ada")
    expect(Effect.runSync(Effect.flip(findUser("9")))).toEqual(new NotFound({ id: "9" }))
  })

  it("findUserOrAnonymous", () => {
    expectTypeOf(findUserOrAnonymous).returns.toEqualTypeOf<Effect.Effect<string>>()
    expect(Effect.runSync(findUserOrAnonymous("2"))).toBe("Grace")
    expect(Effect.runSync(findUserOrAnonymous("9"))).toBe("anonymous")
  })

  it("findAll", () => {
    expectTypeOf(findAll).returns.toEqualTypeOf<Effect.Effect<[Array<string>, Array<string>]>>()
    expect(Effect.runSync(findAll(["1", "9", "2", "7"]))).toEqual([["Ada", "Grace"], ["9", "7"]])
  })
})
