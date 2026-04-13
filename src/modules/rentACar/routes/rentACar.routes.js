// External modules
import express from 'express'

//Internal modules
import { rentACarController as RentACarHandler } from '../controller/rentACar.controller.js';
import {rentACarFetchingDataForAdminDashboardController} from '../controller/rentACarFetchingDataForDashooard.controller.js'
import { rentACarDeleteDataController } from '../controller/rentACarDeleteData.controller.js';
import { rentACarEditeController } from '../controller/rentACarEdite.controller.js';
const rentACarRouter = express.Router();

// rent a car endpoint/URL
rentACarRouter.post('/rent-a-car', RentACarHandler);

// fetching data for admin dashboard of rent a car endpoint/URL
rentACarRouter.get('/rent-a-car-data', rentACarFetchingDataForAdminDashboardController)

// delete rent a car data endpoint/URL
rentACarRouter.delete('/delete-rent-a-car-data', rentACarDeleteDataController);

// edite rent a car data endpoint/URL
rentACarRouter.put('/update-rent-a-car', rentACarEditeController);

//export
export default rentACarRouter;