import { userModel, CreateUserInput, SafeIUser, IUser } from "./user.schema"
import { getRoleByName, } from "../role/role.service"


export async function createOne(input: CreateUserInput) {
  const role = await getRoleByName({ name: "USER" })

  const user = await userModel.create({
    name: input.name,
    email: input.email,
    password: input.password,
    role: role
  })
  return user
}

export async function getAll() {
  const users = await userModel.find() as SafeIUser[]
  return users
}

export async function getOneById(id: string) {
  const user = await userModel.findById(id).populate("role").exec() as SafeIUser
  return user
}

export async function getOneByEmail(email: string) {
  const user = await userModel.findOne({
    email: email
  }).populate('role').exec() as SafeIUser
  return user
}
