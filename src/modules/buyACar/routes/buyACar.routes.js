//External modules
import express from 'express'
import { buyACarController } from '../controllers/buyACar.controller.js';
//Internal modules

const buyACarRouter = express.Router();

// buy a car endpoint/URL
buyACarRouter.post('/buy-a-car', buyACarController);

// export

export {
    buyACarRouter as buyACarhandler
}
