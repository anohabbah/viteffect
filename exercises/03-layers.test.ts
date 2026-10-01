import { Effect, Layer } from "effect"
import { describe, expect, expectTypeOf, it } from "vitest"
import { Config, Greeter, MainLayer, program } from "./03-layers.ts"

describe("03 · layers", () => {
  it("Greeter.layer", () => {
    expectTypeOf(Greeter.layer).toEqualTypeOf<Layer.Layer<Greeter, never, Config>>()
    const custom = Greeter.layer.pipe(Layer.provide(Layer.succeed(Config, { greeting: "Bonjour" })))
    expect(Effect.runSync(program.pipe(Effect.provide(custom)))).toBe("Bonjour, Ada!")
  })

  it("program", () => {
    expectTypeOf(program).toEqualTypeOf<Effect.Effect<string, never, Greeter>>()
    const fake = Layer.succeed(Greeter, { greet: (name) => Effect.succeed(`hi ${name}`) })
    expect(Effect.runSync(program.pipe(Effect.provide(fake)))).toBe("hi Ada")
  })

  it("MainLayer", () => {
    expectTypeOf(MainLayer).toEqualTypeOf<Layer.Layer<Greeter>>()
    expect(Effect.runSync(program.pipe(Effect.provide(MainLayer)))).toBe("Hello, Ada!")
  })
})
