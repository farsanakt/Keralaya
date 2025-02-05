import express from "express"

import UserController from "@/controllers/userController/userController"
import authenticateToken from "@/middleware/isAuthenticated"
import { userStatus } from "@/middleware/userStatus"


const userController=new UserController()




const user_route=express.Router()

user_route.get('/userProfile/:email',authenticateToken,userStatus,userController.userProfile)

user_route.post('/updateprofile',authenticateToken,userController.updateProfile)



user_route.get('/getlocation',userController.getLocations)

    

export default user_route