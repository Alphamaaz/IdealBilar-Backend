// External modules
import express from 'express'
// Internal modules
import  {contactusController} from '../controllers/contactus.controller.js';
import { contactusDataFetchingController } from '../controllers/contactusDataFetchingForDasboard.controller.js';
import { contactUsDeleteController } from '../controllers/contactUsDelete.controller.js';
const Router = express.Router();

// contact us endpoint/URL
Router.post('/contact-us',contactusController)

// fetching contact us data for dashboard
Router.get('/fetching-contact-us-data', contactusDataFetchingController);

// Deleting the contact us data
Router.delete('/deleting-contact-us/:id' , contactUsDeleteController);

// exports
export {Router}

