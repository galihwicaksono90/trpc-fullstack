import { CreateExpressContextOptions } from "@trpc/server/adapters/express"

export async function createContext(opts: CreateExpressContextOptions) {
  const { req, res } = opts

  return {
    req, res
  }
}
