import { router, publicProcedure } from "../../libs/trpc/trpc"
import { getAll, createOne } from "./user.service"
import { createUserInputSchema } from "./user.schema"

export const userRouter = router({
  all: publicProcedure.query(async ({ }) => {
    const users = await getAll()
    console.log({ users })
    return users
  }),
  createOne: publicProcedure
    .input(createUserInputSchema)
    .mutation(async ({ input }) => {
      const users = await createOne(input)
      return users
    })
})


