// Section 1 · Runtime & fibers — show-me-effect-deep-dive.html#runtime
import { Effect } from "effect"
import { todo } from "./todo.ts"

// 1. Make a worker that sleeps `ms` milliseconds and returns `name`.
//    Push `${name} interrupted` to `log` if it gets interrupted, and `${name} cleanup` on ANY exit.
//    Expected type: Effect<string>
export const worker = (name: string, ms: number, log: Array<string>) => todo()

// 2. Run worker("fast", 10, log) and worker("slow", 1_000, log) at the same time and return the
//    name of whichever finishes first. The loser must be interrupted (and so run its cleanup).
//    Expected type: Effect<string>
export const fastest = (log: Array<string>) => todo()

// 3. Model a connection with acquireRelease: acquiring pushes "open", releasing pushes "close".
//    `withConnection(use)` must close the connection even when `use` fails.
//    Expected type: <A, E>(use: Effect<A, E>) => Effect<A, E>
export const withConnection = <A, E>(use: Effect.Effect<A, E>, log: Array<string>) => todo()
