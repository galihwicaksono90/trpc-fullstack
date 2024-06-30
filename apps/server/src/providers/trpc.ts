import { router, publicProcedure, createContext } from "../libs/trpc"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import type { Express } from "express"
import { roleRouter } from "../modules/role/role.route"
import { userRouter } from "../modules/user/user.route"
import { authRouter } from "../modules/auth/auth.route"

export const appRouter = router({
  user: userRouter,
  role: roleRouter,
  auth: authRouter
})

export function registerTrpc(app: Express) {
  app.use("/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    }))
}

