import express from "express"
import cors from "cors"
import { InitializeDatabase } from "./model/index.js"

import api from "./routes/api.js"
import categories from "./routes/categories.js" 

const app = express()

app.use(cors())
app.use(express.json())

InitializeDatabase()

app.use("/api", api)
app.use("/category", categories)

export default app
