import { Effect } from "effect"
import { FetchHttpClient, HttpClient } from "effect/http"
import { describe, expect, expectTypeOf, it } from "vitest"
import { getTodo, titleOrMissing, Todo } from "./05-http.ts"

// A fake `fetch` so the tests never touch the network
const fakeFetch = (async (input: RequestInfo | URL) => {
  const url = String(input instanceof Request ? input.url : input)
  if (url.endsWith("/todos/1")) return Response.json({ id: 1, title: "Learn Effect", done: false })
  if (url.endsWith("/todos/2")) return Response.json({ id: 2, title: 42 })
  return new Response("not found", { status: 404 })
}) as typeof fetch

const run = <A, E>(eff: Effect.Effect<A, E, HttpClient.HttpClient>) =>
  Effect.runPromise(eff.pipe(Effect.provide(FetchHttpClient.layer), Effect.provideService(FetchHttpClient.Fetch, fakeFetch)))

describe("05 · http", () => {
  it("getTodo", async () => {
    expectTypeOf(getTodo).returns.toExtend<Effect.Effect<typeof Todo.Type, unknown, HttpClient.HttpClient>>()
    expect(await run(getTodo(1))).toEqual({ id: 1, title: "Learn Effect", done: false })
    expect((await run(Effect.exit(getTodo(2))))._tag).toBe("Failure")   // body doesn't match the schema
    expect((await run(Effect.exit(getTodo(3))))._tag).toBe("Failure")   // 404
  })

  it("titleOrMissing", async () => {
    expectTypeOf(titleOrMissing).returns.toEqualTypeOf<Effect.Effect<string, never, HttpClient.HttpClient>>()
    expect(await run(titleOrMissing(1))).toBe("Learn Effect")
    expect(await run(titleOrMissing(2))).toBe("missing")
    expect(await run(titleOrMissing(3))).toBe("missing")
  })
})
