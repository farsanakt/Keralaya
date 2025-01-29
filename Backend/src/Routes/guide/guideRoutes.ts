import express from 'express';
import upload from '@/config/multer';
import guideController from '@/controllers/guideController/guideController'; // Import the instance directly

const guide_route = express.Router();

guide_route.post('/addlocation', upload.array('image', 4), guideController.addLocations)

guide_route.get('/displayplaces',guideController.displayLocations)

guide_route.post('/editlocation',upload.array('image',4),guideController.editLocations)

guide_route.delete('/deleteplace/:id',guideController.deletePlaces)

guide_route.get('/guidedetails/:email',guideController.guideData)
  

export default guide_route;



