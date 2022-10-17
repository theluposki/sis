import { Router } from "express"
import { categories } from "../model/categories.js"


const route = Router()

route.post("/", async (req, res) => {
    const { category } = req.body
    const result = await categories.insert(category)
    res.status(200).json(result)
})

route.get("/", async (req, res) => {
  const result = await categories.readAll()
  res.status(200).json(result)
})

route.get("/:id", async (req, res) => {
  const result = await categories.readOneByID(req.params.id)
  res.status(200).json(result)
})

route.put("/:id", async (req, res) => {
  const { category } = req.body

  const result = await categories.update(req.params.id, category)
  res.status(200).json(result)
})

route.delete("/:id", async (req, res) => {
  const result = await categories.deleteOneByID(req.params.id)
  res.status(200).json(result)
})

export default route
