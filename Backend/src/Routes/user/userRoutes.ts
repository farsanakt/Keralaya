import express from "express"

import UserController from "@/controllers/userController/userController"
import authenticateToken from "@/middleware/isAuthenticated"
import { userStatus } from "@/middleware/userStatus"
import PaymentController from "@/controllers/userController/paymentController"
import  ChatController from "@/controllers/userController/chatController"


const userController=new UserController()
const paymentController=new PaymentController()
const chatController=new ChatController()




const user_route=express.Router()

user_route.get('/userProfile/:email',authenticateToken,userStatus,userController.userProfile)

user_route.post('/updateprofile',authenticateToken,userController.updateProfile)

user_route.get('/getlocation',authenticateToken,userController.getLocations)

user_route.get('/locationdetails',authenticateToken,userController.locationDetails)

user_route.get('/guidedetails',authenticateToken,userController.guideDetails)

user_route.get('/allguideList',authenticateToken,userController.allGuideList)

user_route.get('/singleguidee/:id',authenticateToken,userController.singleGuide)

user_route.post('/createPaymentIntent',paymentController.createPaymentIntent)

user_route.post('/paymentconfirmation',paymentController.paymentConfirmation)

user_route.get('/bookingDetails/:email',authenticateToken,userController.bookingDetails)

user_route.post('/reviewPosting',authenticateToken,userController.postReview)

user_route.get('/fetchingReview/:id',authenticateToken,userController.guideReviews)

user_route.post('/cancelbooking/:id',authenticateToken,userController.cancelBooking)

//  chat route 

user_route.post("/send", chatController.sendMessage);
user_route.get("/existingmessages/:id", chatController.getChatHistory);
user_route.get('/idCreation/:id',chatController.idCreation)

    

export default user_route