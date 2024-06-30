import "./loadEnv"
import express from "express"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { registerTrpc, appRouter } from "./providers/trpc"
import { registerCors } from "./providers/cors"

import mongoose from "mongoose"

const url = "mongodb://localhost:27017"

mongoose.connect(url, {
  dbName: "trpc",
})


const app = express()

registerCors(app)

registerTrpc(app)

app.listen(4000)

export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
