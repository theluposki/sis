import { Router } from "express";
import { products } from "../model/products.js";

const route = Router();

route.post("/", (req, res) => {
  const result = products.insert(req.body);
  res.status(200).json(result);
});

route.get("/", async (req, res) => {
  const result = await products.readAll();
  res.status(200).json(result);
});

route.get("/:id", async (req, res) => {
  const result = await products.readOneByID(req.params.id);
  res.status(200).json(result);
});

route.put("/:id", async (req, res) => {
  const result = await products.update(req.params.id, req.body);
  res.status(200).json(result);
});

route.delete("/:id", async (req, res) => {
  const result = await products.deleteOneByID(req.params.id);
  res.status(200).json(result);
});

export default route;
