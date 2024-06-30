import { UserService } from "./user.service"
import { RoleService } from "../role/role.service"
import { router, publicProcedure } from "../../libs/trpc/trpc"
import { createUserSchema } from "./user.schema"

const roleService = new RoleService()
const userService = new UserService(roleService)

export const userRouter = router({
  all: publicProcedure.query(async ({ }) => {
    return userService.getUsers()
  }),
  createOne: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      return userService.createUser(input)
    }),
})
