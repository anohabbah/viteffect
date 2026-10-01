// Section 4 · Schema · Stream · Schedule — show-me-effect-deep-dive.html#sss
import { Effect, Schedule, Schema, Stream } from "effect"

// 1. A Person schema: non-empty `name`, integer `age` between 0 and 150,
//    and `born` sent over the wire as an ISO string but decoded to a Date.
export const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Int.check(Schema.isBetween({ minimum: 0, maximum: 150 })),
  born: Schema.DateFromString,
})

// 2. Decode unknown input into a Person.
//    Expected type: (input: unknown) => Effect<typeof Person.Type, Schema.SchemaError>
export const decodePerson = (input: unknown) => Schema.decodeUnknownEffect(Person)(input)

// 3. From the numbers 1..10, keep the even ones, square them, and collect them into an array.
//    Expected type: Effect<Array<number>>
export const evenSquares = Stream.range(1, 10).pipe(
  Stream.filter((n) => n % 2 === 0),
  Stream.map((n) => n * n),
  Stream.runCollect,
)

// 4. Retry `effect` at most 3 more times (4 attempts total) with no delay between attempts.
//    Expected type: <A, E>(effect: Effect<A, E>) => Effect<A, E>
export const retryThrice = <A, E>(effect: Effect.Effect<A, E>) =>
  effect.pipe(Effect.retry(Schedule.recurs(3)))
