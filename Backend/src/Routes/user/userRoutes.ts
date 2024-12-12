import express from "express"

import UserController from "../../controllers/userController/userController"


const userController=new UserController()


const user_route=express.Router()

user_route.get('/userProfile/:email',userController.userProfile)



export default user_route