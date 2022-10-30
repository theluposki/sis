import { Router } from "express"
import { weights } from "../model/weights.js"


const route = Router()

route.post("/", async (req, res) => {
    const { weight } = req.body
    const result = await weights.insert(weight)
    res.status(200).json(result)
})

route.get("/count", async (req, res) => {
  const result = await weights.count();
  res.status(200).json(result);
});

route.get("/weight/:weight", async (req, res) => {
  const result = await weights.readAllByBrand(req.params.weight)
  res.status(200).json(result)
})

route.get("/", async (req, res) => {
  const result = await weights.readAll()
  res.status(200).json(result)
})

route.get("/:id", async (req, res) => {
  const result = await weights.readOneByID(req.params.id)
  res.status(200).json(result)
})

route.put("/:id", async (req, res) => {
  const { weight } = req.body

  const result = await weights.update(req.params.id, weight)
  res.status(200).json(result)
})

route.delete("/:id", async (req, res) => {
  const result = await weights.deleteOneByID(req.params.id)
  res.status(200).json(result)
})

export default route
