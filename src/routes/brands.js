import { Router } from "express"
import { brands } from "../model/brands.js"


const route = Router()

route.post("/", async (req, res) => {
    const { brand } = req.body
    const result = await brands.insert(brand)
    res.status(200).json(result)
})

route.get("/", async (req, res) => {
  const result = await brands.readAll()
  res.status(200).json(result)
})

route.get("/:id", async (req, res) => {
  const result = await brands.readOneByID(req.params.id)
  res.status(200).json(result)
})

route.put("/:id", async (req, res) => {
  const { brand } = req.body

  const result = await brands.update(req.params.id, brand)
  res.status(200).json(result)
})

route.delete("/:id", async (req, res) => {
  const result = await brands.deleteOneByID(req.params.id)
  res.status(200).json(result)
})

export default route
