import { router, publicProcedure } from "../../libs/trpc/trpc"
import { RoleService } from "../role/role.service"
import { createRoleInputSchema, IRole } from "../role/role.schema"

const roleService = new RoleService()

export const roleRouter = router({
  all: publicProcedure.query(async ({ }) => {
    const roles = await roleService.getRoles()
    return roles as IRole[]
  }),
  createOne: publicProcedure
    .input(createRoleInputSchema)
    .mutation(async ({ input }) => {
      return await roleService.createRole(input)
    }),
})


