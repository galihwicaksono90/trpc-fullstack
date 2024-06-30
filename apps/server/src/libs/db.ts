import mongoose from "mongoose"

const url = "mongodb://localhost:27017"

mongoose.connect(url, {
  dbName: "trpc",
})

