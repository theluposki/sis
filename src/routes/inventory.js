import { Router } from "express";
import { inventory } from "../model/inventory.js";

const route = Router();

route.post("/", (req, res) => {
  const result = inventory.insert(req.body);
  res.status(200).json(result);
});

route.get("/count", async (req, res) => {
  const result = await inventory.count();
  res.status(200).json(result);
});

route.get("/", async (req, res) => {
  const result = await inventory.readAll();
  res.status(200).json(result);
});

route.get("/name/:name", async (req, res) => {
  const result = await inventory.readAllByNamesLike(req.params.name)
  res.status(200).json(result)
})

route.get("/inv", async (req, res) => {
  const result = await inventory.readAllByNames();
  res.status(200).json(result);
});

route.get("/:id", async (req, res) => {
  const result = await inventory.readOneByID(req.params.id);
  res.status(200).json(result);
});

route.get("/name-id/:id", async (req, res) => {
  const result = await inventory.readOneByIDNames(req.params.id);
  res.status(200).json(result);
});

route.put("/:id", async (req, res) => {
  const result = await inventory.update(req.params.id, req.body);
  res.status(200).json(result);
});

route.put("/:id/inc", async (req, res) => {
  const result = await inventory.increment(req.params.id);
  res.status(200).json(result);
});

route.put("/:id/dec", async (req, res) => {
  const result = await inventory.decrement(req.params.id);
  res.status(200).json(result);
});

route.delete("/:id", async (req, res) => {
  const result = await inventory.deleteOneByID(req.params.id);
  res.status(200).json(result);
});

export default route;
