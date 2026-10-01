// Section 2 · Errors in depth — show-me-effect-deep-dive.html#errors
import { Effect, Schema } from "effect"
import { todo } from "./todo.ts"

const users: Record<string, string> = { "1": "Ada", "2": "Grace" }

// 1. Declare a Schema-backed tagged error "NotFound" with an `id: string` field.
export class NotFound extends Schema.TaggedError<NotFound>()("NotFound", {}) {}

// 2. Look a user's name up in `users`, failing with NotFound when it is missing.
//    Expected type: (id: string) => Effect<string, NotFound>
export const findUser = (id: string) => todo()

// 3. Recover from NotFound with "anonymous" so the error channel becomes `never`.
//    Expected type: (id: string) => Effect<string>
export const findUserOrAnonymous = (id: string) => todo()

// 4. Look up every id without stopping at the first failure.
//    Return [names found, ids that were missing].
//    Expected type: (ids: Array<string>) => Effect<[Array<string>, Array<string>]>
export const findAll = (ids: Array<string>) => todo()
