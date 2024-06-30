import mongoose from "mongoose"
import { SafeIRole, roleSchema } from "../role/role.schema"
import { z } from "zod"
import { ObjectId } from "mongodb"

export type IUser = {
  name: string
  email: string
  password: string
  role: SafeIRole
}

export type SafeIUser = IUser & {
  _id: ObjectId
}

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: roleSchema,
    required: true,
  }
}, {
  versionKey: false
})

export const userModel = mongoose.model<IUser>("User", userSchema)

export const createUserInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export type CreateUserInput = z.infer<typeof createUserInputSchema>
