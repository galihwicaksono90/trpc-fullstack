import mongoose from "mongoose"
import { z } from "zod"

const roleNames = ["USER", "ADMIN"] as const

export type IRoleName = typeof roleNames[number]

export type IRole = {
  name: IRoleName
}

export type SafeIRole = IRole & {
  _id: string
}

export const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: roleNames
  }
})

export const createRoleInputSchema = z.object({
  name: z.enum(roleNames)
})

export const roleModel = mongoose.model<IRole>("Role", roleSchema)
