//External modules
import express from 'express'
//Internal modules
import { buyACarController } from '../controllers/buyACar.controller.js';
import { middlewareForVerifyJwtToken } from '../../../shared/middlewares/auth.middleware.js';
import { buyACarDataFetchingController } from '../controllers/buyACarDataFetching.controller.js';
import { adminOnlyMiddleware } from '../../../shared/middlewares/adminOnlyAuth.moddleware.js';
import { buyACarDataDeleteFromAdminDasboard } from '../controllers/buyACarDataDelete.controller.js';
const buyACarRouter = express.Router();

// buy a car endpoint/URL
buyACarRouter.post('/buy-a-car',middlewareForVerifyJwtToken, buyACarController);

// fetching data of all the buy car's for admin panel 
buyACarRouter.get('/fetching-data-of-buy-cars', middlewareForVerifyJwtToken, adminOnlyMiddleware, buyACarDataFetchingController)

// Delete buy a car data from admin panel
buyACarRouter.delete('/delete-bought-cars/:carId', middlewareForVerifyJwtToken, adminOnlyMiddleware, buyACarDataDeleteFromAdminDasboard )
// export
export {
    buyACarRouter as buyACarhandler
}
