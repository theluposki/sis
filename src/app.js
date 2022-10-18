import express from "express"
import cors from "cors"
import { InitializeDatabase } from "./model/index.js"

import api from "./routes/api.js"
import categories from "./routes/categories.js"
import brands from "./routes/brands.js"
import weights from "./routes/weights.js"
import products from "./routes/products.js"
import inventory from "./routes/inventory.js"
import clients from "./routes/clients.js"
import exitHistory from "./routes/exitHistory.js" 

const app = express()

app.use(cors())
app.use(express.json())

InitializeDatabase()

app.use("/api", api)
app.use("/category", categories)
app.use("/brand", brands)
app.use("/weight", weights)
app.use("/products", products)
app.use("/inventory", inventory)
app.use("/clients", clients)
app.use("/exitHistory", exitHistory)

export default app
