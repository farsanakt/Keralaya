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

user_route.post('/cancelbooking/:id',userController.cancelBooking)

user_route.get('/alllocations',userController.allLocations)

//  chat route 

user_route.post("/send", chatController.sendMessage);
user_route.get("/existingmessages/:id", chatController.getChatHistory);
user_route.get('/idCreation/:id',chatController.idCreation)

    

export default user_route