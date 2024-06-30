import { router, publicProcedure, createContext } from "../libs/trpc"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import type { Express } from "express"
import { userRouter } from "../modules/user/user.route"
import { roleRouter } from "../modules/role/role.route"

export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return "hello world"
  }),
  user: userRouter,
  role: roleRouter
})

export function registerTrpc(app: Express) {
  app.use("/trpc", createExpressMiddleware({
    router: appRouter,
    createContext
  }))
}

