// Section 3 · Services & Layers — show-me-effect-deep-dive.html#layers
import { Context, Effect, Layer } from "effect"

export class Config extends Context.Service<Config, { readonly greeting: string }>()("@exercises/Config") {
  static readonly layer = Layer.succeed(Config, { greeting: "Hello" })
}

// 1. Declare a Greeter service whose shape is { greet: (name: string) => Effect<string> }.
//    Its `layer` reads Config and returns `${greeting}, ${name}!`.
//    Expected layer type: Layer<Greeter, never, Config>
export class Greeter extends Context.Service<Greeter, {
  readonly greet: (name: string) => Effect.Effect<string>
}>()("@exercises/Greeter") {
  static readonly layer = Layer.effect(
    Greeter,
    Effect.gen(function* () {
      const { greeting } = yield* Config
      return { greet: (name: string) => Effect.succeed(`${greeting}, ${name}!`) }
    }),
  )
}

// 2. A program that greets "Ada" through the Greeter service.
//    Expected type: Effect<string, never, Greeter>
export const program = Effect.gen(function* () {
  const greeter = yield* Greeter
  return yield* greeter.greet("Ada")
})

// 3. Wire Greeter.layer with Config.layer so the program can run.
//    Expected type: Layer<Greeter>
export const MainLayer = Greeter.layer.pipe(Layer.provide(Config.layer))
