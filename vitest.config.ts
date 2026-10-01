import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["exercises/**/*.test.ts"],
    // type assertions (expectTypeOf) fail the test too, not just runtime ones
    typecheck: { enabled: true, include: ["exercises/**/*.test.ts"], tsconfig: "exercises/tsconfig.json" },
  },
})
