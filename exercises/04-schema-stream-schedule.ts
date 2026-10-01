// Section 4 · Schema · Stream · Schedule — show-me-effect-deep-dive.html#sss
import { Effect, Schedule, Schema, Stream } from "effect"
import { todo } from "./todo.ts"

// 1. A Person schema: non-empty `name`, integer `age` between 0 and 150,
//    and `born` sent over the wire as an ISO string but decoded to a Date.
export const Person = Schema.Struct({})

// 2. Decode unknown input into a Person.
//    Expected type: (input: unknown) => Effect<typeof Person.Type, Schema.SchemaError>
export const decodePerson = (input: unknown) => todo()

// 3. From the numbers 1..10, keep the even ones, square them, and collect them into an array.
//    Expected type: Effect<Array<number>>
export const evenSquares = todo()

// 4. Retry `effect` at most 3 more times (4 attempts total) with no delay between attempts.
//    Expected type: <A, E>(effect: Effect<A, E>) => Effect<A, E>
export const retryThrice = <A, E>(effect: Effect.Effect<A, E>) => todo()
