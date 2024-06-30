import { z } from "zod"
import { IRole, RoleName, RoleSchema, } from "../role/role.schema"
import { model, Schema } from "mongoose"

export type User = {
  name: string,
  email: string
  password: string
  role: IRole
}

export const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: RoleSchema,
    required: true
  }
},
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        return ret
      }
    }
  }
)

export const UserModel = model<User>("User", UserSchema)

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
})

export type CreateUserInput = z.infer<typeof createUserSchema>
