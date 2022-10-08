import { Router } from "express"
import { DateFormat } from "../Util.js"
import { block } from "../model/block.js"

const route = Router()

route.get("/", (req, res) => {
    res.status(200).json({
        time: DateFormat(),
        status: 200,
        message: "OK"
    })
})

route.get("/mine", async (req,res) => {
  const result = await block.save("lasthash", "data")
  res.status(201).json(result)
})

export default route
