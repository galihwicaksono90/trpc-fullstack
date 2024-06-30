import { z } from "zod"
import { Schema, model, models } from "mongoose"

export const roleNames = ["USER", "ADMIN"] as const
export type RoleName = typeof roleNames[number]

export type Role = {
  name: RoleName
}

export const RoleSchema = new Schema<Role>({
  name: {
    type: String,
    enum: roleNames,
    unique: true,
    required: true
  }
})

export const RoleModel = model<Role>('Role', RoleSchema)

export const createRoleInputSchema = z.object({
  name: z.enum(roleNames)
})

export type CreateRoleInput = z.infer<typeof createRoleInputSchema>
