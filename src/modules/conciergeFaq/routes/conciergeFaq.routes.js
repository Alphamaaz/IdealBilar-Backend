import express from 'express';
import { middlewareForVerifyJwtToken } from '../../../shared/middlewares/auth.middleware.js';
import { adminOnlyMiddleware } from '../../../shared/middlewares/adminOnlyAuth.moddleware.js';
import {
  askFaqController,
  answerFaqController,
  createFaqController,
  deleteFaqController,
  getAdminFaqsController,
  getPublicFaqsController,
  getSingleFaqController,
  updateFaqController,
} from '../controllers/conciergeFaq.controller.js';

const router = express.Router();

router.get('/concierge/faqs', getPublicFaqsController);
router.post('/concierge/ask', askFaqController);
router.get('/concierge/faqs/:id/answer', answerFaqController);

router.get('/admin/concierge/faqs', middlewareForVerifyJwtToken, adminOnlyMiddleware, getAdminFaqsController);
router.post('/admin/concierge/faqs', middlewareForVerifyJwtToken, adminOnlyMiddleware, createFaqController);
router.get('/admin/concierge/faqs/:id', middlewareForVerifyJwtToken, adminOnlyMiddleware, getSingleFaqController);
router.put('/admin/concierge/faqs/:id', middlewareForVerifyJwtToken, adminOnlyMiddleware, updateFaqController);
router.delete('/admin/concierge/faqs/:id', middlewareForVerifyJwtToken, adminOnlyMiddleware, deleteFaqController);

export default router;
