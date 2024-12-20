import express from 'express'
import AdminController from '../../controllers/adminController/adminController'

const admin_Routes=express.Router()
const adminController=new AdminController()

admin_Routes.get('/userlist',adminController.getUserList)

admin_Routes.get('/guidelisit',adminController.getGuideList)

admin_Routes.patch('/updateUser/:id',adminController.updateUserStatus)

admin_Routes.patch('/updateguide/:id',adminController.updateGuideStatus)

export default admin_Routes