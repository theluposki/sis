import express from "express"
import cors from "cors"
import { InitializeDatabase } from "./model/index.js"

import api from "./routes/api.js"
import products from "./routes/products.js" 

const app = express()

app.use(cors())
app.use(express.json())

InitializeDatabase()

app.use("/api", api)
app.use("/products", products)

export default app
