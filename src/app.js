import express from "express"
import cors from "cors"
import { InitializeDatabase } from "./model/index.js"

import api from "./routes/api.js" 

const app = express()

app.use(cors())
app.use(express.json())

InitializeDatabase()

app.use("/api", api)

export default app
