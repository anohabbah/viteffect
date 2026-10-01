// Section 5 · http — show-me-effect-deep-dive.html#http
import { Effect, Schema } from "effect"
import { HttpClient, HttpClientResponse } from "effect/http"
import { todo } from "./todo.ts"

export const Todo = Schema.Struct({ id: Schema.Number, title: Schema.String, done: Schema.Boolean })

// 1. GET `https://example.test/todos/${id}` with the HttpClient service, treat non-2xx responses
//    as errors, and decode the JSON body with the Todo schema.
//    Expected R: HttpClient.HttpClient (provided by the caller, e.g. FetchHttpClient.layer)
export const getTodo = (id: number) => todo()

// 2. Return the todo's title, or "missing" if the request or the decoding fails for any reason.
//    Expected type: (id: number) => Effect<string, never, HttpClient.HttpClient>
export const titleOrMissing = (id: number) => todo()
