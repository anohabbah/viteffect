// Section 2 · Errors in depth — show-me-effect-deep-dive.html#errors
import { Effect, Schema } from "effect"

const users: Record<string, string> = { "1": "Ada", "2": "Grace" }

// 1. Declare a Schema-backed tagged error "NotFound" with an `id: string` field.
export class NotFound extends Schema.TaggedError<NotFound>()("NotFound", { id: Schema.String }) {}

// 2. Look a user's name up in `users`, failing with NotFound when it is missing.
//    Expected type: (id: string) => Effect<string, NotFound>
export const findUser = Effect.fn("findUser")(function* (id: string) {
  const name = users[id]
  if (name === undefined) return yield* new NotFound({ id })
  return name
})

// 3. Recover from NotFound with "anonymous" so the error channel becomes `never`.
//    Expected type: (id: string) => Effect<string>
export const findUserOrAnonymous = (id: string) =>
  findUser(id).pipe(Effect.catchTag("NotFound", () => Effect.succeed("anonymous")))

// 4. Look up every id without stopping at the first failure.
//    Return [names found, ids that were missing].
//    Expected type: (ids: Array<string>) => Effect<[Array<string>, Array<string>]>
export const findAll = (ids: Array<string>) =>
  Effect.partition(ids, findUser).pipe(
    Effect.map(([names, errors]): [Array<string>, Array<string>] => [names, errors.map((e) => e.id)]),
  )
