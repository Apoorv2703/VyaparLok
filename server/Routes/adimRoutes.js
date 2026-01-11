import express from "express"
import adminController from "../Controller/adminController.js"
import adminProtect from "../middleware/adminMiddleware.js"

let router = express.Router()

router.get("/users" , adminProtect, adminController.getUsers)

export default router
