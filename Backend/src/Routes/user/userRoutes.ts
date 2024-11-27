import express from "express"
import AuthController from "../../controllers/userController/authController"

const user_route=express.Router()
const authController= new AuthController()

user_route.post('/signup',authController.singUp)

export default user_route