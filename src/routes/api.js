import { Router } from "express"
import { DateFormat } from "../Util.js"

const route = Router()

route.get("/", (req, res) => {
    res.status(200).json({
        time: DateFormat(),
        status: 200,
        message: "OK"
    })
})

export default route