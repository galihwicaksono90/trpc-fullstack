import { initTRPC } from "@trpc/server"
import { createContext } from "./context"

export const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure

