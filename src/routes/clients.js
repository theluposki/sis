import { Router } from "express";
import { clients } from "../model/client.js";

const route = Router();

route.post("/", (req, res) => {
  const result = clients.insert(req.body);
  res.status(200).json(result);
});


route.get("/count", async (req, res) => {
  const result = await clients.count();
  res.status(200).json(result);
});

route.get("/client/:name", async (req, res) => {
  const result = await clients.readAllByName(req.params.name)
  res.status(200).json(result)
})

route.get("/", async (req, res) => {
  const result = await clients.readAll();
  res.status(200).json(result);
});

route.get("/:id", async (req, res) => {
  const result = await clients.readOneByID(req.params.id);
  res.status(200).json(result);
});

route.put("/:id", async (req, res) => {
  const result = await clients.update(req.params.id, req.body);
  res.status(200).json(result);
});

route.delete("/:id", async (req, res) => {
  const result = await clients.deleteOneByID(req.params.id);
  res.status(200).json(result);
});

export default route;
