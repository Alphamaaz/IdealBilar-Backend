import express from 'express';
import showroomController from '../controllers/showroom.controller.js';

const router = express.Router();

router.post('/location', showroomController.createShowroomLocation);
router.get('/locations', showroomController.getAllShowroomLocations);
router.put('/location/:id', showroomController.updateShowroomLocation);
router.delete('/location/:id', showroomController.deleteShowroomLocation);

export default router;