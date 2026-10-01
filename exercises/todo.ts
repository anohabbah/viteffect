// Placeholder for unfinished exercises. Its type is `never`, so type tests fail until you replace it,
// and it only throws when used, so the other exercises in the same file can still pass.
const fail = (): never => {
  throw new Error("TODO: solve this exercise")
}

export const todo = (): never => new Proxy(fail, { get: fail, apply: fail, construct: fail }) as never
