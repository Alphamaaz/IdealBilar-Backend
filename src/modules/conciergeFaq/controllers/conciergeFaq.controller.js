import {
  createFaq,
  deleteFaq,
  getAdminFaqs,
  getFaqById,
  getPublicFaqs,
  recordFaqClick,
  searchFaqAnswer,
  updateFaq,
} from '../services/conciergeFaq.service.js';
import {
  createConciergeFaqSchema,
  updateConciergeFaqSchema,
} from '../validations/conciergeFaq.validation.js';

const sendError = (res, error, fallback = 'Request failed') => {
  if (error?.issues) {
    return res.status(400).json({
      success: false,
      message: error.issues.map((issue) => issue.message).join(', '),
    });
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || fallback,
  });
};

const getPublicFaqsController = async (req, res) => {
  try {
    const faqs = await getPublicFaqs({ category: req.query.category });
    return res.status(200).json({
      success: true,
      message: 'Concierge FAQ questions retrieved successfully',
      data: faqs,
    });
  } catch (error) {
    return sendError(res, error, 'Failed to fetch FAQ questions');
  }
};

const getAdminFaqsController = async (req, res) => {
  try {
    const faqs = await getAdminFaqs({
      category: req.query.category,
      status: req.query.status,
    });
    return res.status(200).json({
      success: true,
      message: 'Concierge FAQs retrieved successfully',
      data: faqs,
    });
  } catch (error) {
    return sendError(res, error, 'Failed to fetch FAQs');
  }
};

const createFaqController = async (req, res) => {
  try {
    const payload = await createConciergeFaqSchema.parseAsync(req.body);
    const faq = await createFaq(payload);
    return res.status(201).json({
      success: true,
      message: 'Concierge FAQ created successfully',
      data: faq,
    });
  } catch (error) {
    return sendError(res, error, 'Failed to create FAQ');
  }
};

const getSingleFaqController = async (req, res) => {
  try {
    const faq = await getFaqById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    return res.status(200).json({ success: true, data: faq });
  } catch (error) {
    return sendError(res, error, 'Failed to fetch FAQ');
  }
};

const updateFaqController = async (req, res) => {
  try {
    const payload = await updateConciergeFaqSchema.parseAsync(req.body);
    const faq = await updateFaq(req.params.id, payload);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Concierge FAQ updated successfully',
      data: faq,
    });
  } catch (error) {
    return sendError(res, error, 'Failed to update FAQ');
  }
};

const deleteFaqController = async (req, res) => {
  try {
    const faq = await deleteFaq(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Concierge FAQ deleted successfully',
    });
  } catch (error) {
    return sendError(res, error, 'Failed to delete FAQ');
  }
};

const answerFaqController = async (req, res) => {
  try {
    const faq = await recordFaqClick(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found or inactive',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Concierge FAQ answer retrieved successfully',
      data: faq,
    });
  } catch (error) {
    return sendError(res, error, 'Failed to fetch FAQ answer');
  }
};

const askFaqController = async (req, res) => {
  try {
    const query = req.body?.message || req.body?.query || '';

    if (!query.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Question is required',
      });
    }

    const faq = await searchFaqAnswer(query);

    if (!faq) {
      return res.status(200).json({
        success: true,
        found: false,
        handoffRecommended: true,
        answer: 'I do not have a predefined answer for that yet. You can message an Ideal Bilar representative for help.',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      found: true,
      handoffRecommended: false,
      answer: faq.answer,
      data: faq,
    });
  } catch (error) {
    return sendError(res, error, 'Failed to search FAQ answer');
  }
};

export {
  askFaqController,
  answerFaqController,
  createFaqController,
  deleteFaqController,
  getAdminFaqsController,
  getPublicFaqsController,
  getSingleFaqController,
  updateFaqController,
};
