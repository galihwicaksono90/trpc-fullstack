import { router, publicProcedure } from "../../libs/trpc/trpc"
import { getRoles, createRole } from "../role/role.service"
import { createRoleInputSchema, SafeIRole } from "../role/role.schema"


export const roleRouter = router({
  all: publicProcedure.query(async ({ }) => {
    const roles = await getRoles()
    return roles as SafeIRole[]
  }),
  createOne: publicProcedure
    .input(createRoleInputSchema)
    .mutation(async ({ input, ctx }) => {


      return await createRole(input)
    }),
})


