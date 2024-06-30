import { TRPCError } from "@trpc/server"
import { router, publicProcedure, privateProcedure } from "../../libs/trpc/trpc"
import { getOneByEmail, getOneById } from "../../modules/user/user.service"
import { loginInputSchema } from "./auth.schema"
import { createToken } from "../../utils/jwt"

export const authRouter = router({
  me: privateProcedure
    .query(async ({ ctx }) => {
      const user = await getOneById(ctx.user.id)
      return user
    }),
  login: publicProcedure
    .input(loginInputSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getOneByEmail(input.email)
      console.log({ user })
      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'auth not found' })
      }


      const token = createToken({
        id: user._id.toString(),
        role: user.role.name
      })

      return {
        user,
        token
      }
    }),
})


