import express from 'express'
import AuthController from '../../controllers/guideController/authController'


const guide_authRoute=express.Router()

const authController=new AuthController()

guide_authRoute.post('/registration',authController.registration)

guide_authRoute.post('/guidelogin',authController.login)

guide_authRoute.get('/guidelogout',authController.logout)

export default guide_authRoute