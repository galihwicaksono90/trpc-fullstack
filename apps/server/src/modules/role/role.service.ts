import { RoleModel, RoleName, CreateRoleInput, Role } from "./role.schema"

export class RoleService {
  async getRoles() {
    const roles = await RoleModel.find() as Role[]
    return roles
  }

  async getRoleByName(name: RoleName) {
    return await RoleModel.findOne({ name: name })
  }

  async createRole(input: CreateRoleInput) {
    return await RoleModel.create(input)
  }
}
