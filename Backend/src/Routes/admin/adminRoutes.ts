import express from 'express'
import AdminController from '../../controllers/adminController/adminController'
import upload from '@/config/multer';

const admin_Routes=express.Router()
const adminController=new AdminController()

admin_Routes.get('/userlist',adminController.getUserList)

admin_Routes.get('/guidelisit',adminController.getGuideList)

admin_Routes.patch('/updateUser/:id',adminController.updateUserStatus)

admin_Routes.patch('/updateguide/:id',adminController.updateGuideStatus)

admin_Routes.patch('/approvelocation/:id',adminController.approveLocation)



export default admin_Routes