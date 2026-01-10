import express from "express"
import authControllers from "../Controller/authController.js"

let router = express.Router()

router.post("/register" ,authControllers.registerUser )

router.post("/login" ,authControllers.loginUser )

export default router