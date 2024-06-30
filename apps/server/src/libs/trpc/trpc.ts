import { initTRPC, TRPCError } from "@trpc/server"
import { createContext } from "./context"
import { verifyToken } from "../../utils/jwt"

export const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure

export const privateProcedure = publicProcedure.use(({ ctx, next }) => {
  const verify = verifyToken(ctx.req.headers.authorization)
  if (!verify) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx,
      user: verify.user
    }
  })
})

