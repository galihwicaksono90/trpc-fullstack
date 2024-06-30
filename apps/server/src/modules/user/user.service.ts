import { User, UserModel, CreateUserInput } from "./user.schema"
import { RoleService } from "../role/role.service"

export class UserService {
  private readonly roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService
  }

  async getUsers() {
    const users = await UserModel.find()
    return users
  }

  async createUser(input: CreateUserInput) {
    const userRole = await this.roleService.getRoleByName("USER")

    if (!userRole) {
      throw new Error("User role not found")
    }

    const newUser = await UserModel.create({
      ...input,
      role: userRole
    })

    return newUser
  }
}
