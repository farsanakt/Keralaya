import express from "express"

import UserController from "../../controllers/userController/userController"

import authenticateToken from "../../middleware/isAuthenticated"


const userController=new UserController()




const user_route=express.Router()

user_route.get('/userProfile/:email',userController.userProfile)

user_route.post('/updateprofile',authenticateToken,userController.updateProfile)

    

export default user_route