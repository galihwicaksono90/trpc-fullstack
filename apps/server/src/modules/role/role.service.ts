import { roleModel, SafeIRole, IRoleName, IRole } from "./role.schema"

export async function getRoles() {
  const roles = await roleModel.find() as SafeIRole[]
  return roles
}

export async function getRoleByName({ name }: { name: IRoleName }) {
  const role = await roleModel.findOne({
    name: name
  }) as SafeIRole
  return role
}


export async function createRole({ name }: { name: IRoleName }) {
  const role = await roleModel.create({
    name: name
  }) as IRole

  return role
}
