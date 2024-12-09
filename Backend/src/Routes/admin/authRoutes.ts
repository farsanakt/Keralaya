import express from 'express'
import AuthController from '../../controllers/adminController/authController'

const adminAuth_route=express.Router()

const authController=new AuthController()


adminAuth_route.post('/loginn',authController.login)



export default adminAuth_route