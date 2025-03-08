import express from 'express';
import upload from '@/config/multer';
import guideController from '@/controllers/guideController/guideController'; // Import the instance directly
import authenticateToken from '@/middleware/isAuthenticated';
import slotController from '@/controllers/guideController/slotController';

const guide_route = express.Router();

guide_route.post('/addlocation', upload.array('image', 5), guideController.addLocations)

guide_route.get('/displayplaces',guideController.displayLocations)

guide_route.post('/editlocation',upload.array('image',5),guideController.editLocations)

guide_route.delete('/deleteplace/:id',guideController.deletePlaces)

guide_route.get('/guidedetails',authenticateToken,guideController.guideData)

guide_route.post('/updateprofiles',upload.single('profileImage'),guideController.updateProfile)

guide_route.post('/guideslot',slotController.availableSLots)

 guide_route.get('/guideDetaills/:email',guideController.guideDetails)

 guide_route.get('/availableguide/:id',slotController.availableGuideSlot)




  
    
export default guide_route;



