import { Router } from "express";
import { exitHistory } from "../model/exitHistory.js";

const route = Router();

route.post("/", (req, res) => {
  const result = exitHistory.insert(req.body);
  res.status(200).json(result);
});

route.get("/", async (req, res) => {
  const result = await exitHistory.readAll();
  res.status(200).json(result);
});

route.get("/exits", async (req, res) => {
  const result = await exitHistory.readAllExits();
  res.status(200).json(result);
});

route.get("/:id", async (req, res) => {
  const result = await exitHistory.readOneByID(req.params.id);
  res.status(200).json(result);
});

route.put("/:id", async (req, res) => {
  const result = await exitHistory.update(req.params.id, req.body);
  res.status(200).json(result);
});

route.delete("/:id", async (req, res) => {
  const result = await exitHistory.deleteOneByID(req.params.id);
  res.status(200).json(result);
});

export default route;
