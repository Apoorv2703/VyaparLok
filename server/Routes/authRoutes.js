import express from "express"
import authControllers from "../Controller/authController.js"
import protect from "../middleware/authMiddleware.js"

let router = express.Router()

router.post("/register" ,authControllers.registerUser )

router.post("/login" ,authControllers.loginUser )

router.post("/private" , protect , authControllers.privateAccess )

export default router