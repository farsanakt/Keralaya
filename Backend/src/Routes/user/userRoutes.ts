import express from "express"

import UserController from "@/controllers/userController/userController"
import authenticateToken from "@/middleware/isAuthenticated"
import { userStatus } from "@/middleware/userStatus"


const userController=new UserController()




const user_route=express.Router()

user_route.get('/userProfile/:email',authenticateToken,userStatus,userController.userProfile)

user_route.post('/updateprofile',authenticateToken,userController.updateProfile)



user_route.get('/getlocation',userController.getLocations)

user_route.get('/locationdetails',userController.locationDetails)

user_route.get('/guidedetails',userController.guideDetails)

user_route.get('/allguideList',userController.allGuideList)

user_route.get('/singleguidee/:id',userController.singleGuide)

user_route.post('/createPaymentIntent',userController.createPaymentIntent)

user_route.post('/paymentconfirmation',userController.paymentConfirmation)

    

export default user_route