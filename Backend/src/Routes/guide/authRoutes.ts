import express from 'express'
import AuthController from '../../controllers/guideController/authController'

const guide_authRoute=express.Router()

const authController=new AuthController()

guide_authRoute.post('/registration',authController.registration)

export default guide_authRoute