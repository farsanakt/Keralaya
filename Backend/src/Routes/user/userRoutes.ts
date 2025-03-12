import express from "express"

import UserController from "@/controllers/userController/userController"
import authenticateToken from "@/middleware/isAuthenticated"
import { userStatus } from "@/middleware/userStatus"
import PaymentController from "@/controllers/userController/paymentController"


const userController=new UserController()
const paymentController=new PaymentController()




const user_route=express.Router()

user_route.get('/userProfile/:email',authenticateToken,userStatus,userController.userProfile)

user_route.post('/updateprofile',authenticateToken,userController.updateProfile)

user_route.get('/getlocation',userController.getLocations)

user_route.get('/locationdetails',userController.locationDetails)

user_route.get('/guidedetails',userController.guideDetails)

user_route.get('/allguideList',userController.allGuideList)

user_route.get('/singleguidee/:id',userController.singleGuide)

user_route.post('/createPaymentIntent',paymentController.createPaymentIntent)

user_route.post('/paymentconfirmation',paymentController.paymentConfirmation)

user_route.get('/bookingDetails/:email',userController.bookingDetails)

user_route.post('/reviewPosting',userController.postReview)

user_route.get('/fetchingReview/:id',userController.guideReviews)

    

export default user_route