import { Router } from "express"
import { products } from "../model/product.js"


const route = Router()

route.post("/", async (req, res) => {
    const result = await products.insert(req.body)
    res.status(200).json(result)
})

export default route
