import cors from "cors"
import { Express } from "express"

export const registerCors = (app: Express) => {
  app.use(cors())
}

