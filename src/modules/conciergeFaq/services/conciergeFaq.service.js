import ConciergeFaq from '../models/conciergeFaq.model.js';

const createFaq = async (data) => ConciergeFaq.create(data);

const getPublicFaqs = async ({ category } = {}) => {
  const filter = { isActive: true, isFeatured: true };
  if (category) filter.category = category.toLowerCase();

  return ConciergeFaq.find(filter)
    .select('question answer category sortOrder isFeatured')
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();
};

const getAdminFaqs = async ({ category, status } = {}) => {
  const filter = {};
  if (category) filter.category = category.toLowerCase();
  if (status === 'active') filter.isActive = true;
  if (status === 'inactive') filter.isActive = false;

  return ConciergeFaq.find(filter).sort({ sortOrder: 1, createdAt: -1 }).lean();
};

const getFaqById = async (id) => ConciergeFaq.findById(id).lean();

const updateFaq = async (id, data) =>
  ConciergeFaq.findByIdAndUpdate(id, data, { returnDocument: 'after' }).lean();

const deleteFaq = async (id) => ConciergeFaq.findByIdAndDelete(id).lean();

const recordFaqClick = async (id) =>
  ConciergeFaq.findOneAndUpdate(
    { _id: id, isActive: true },
    { $inc: { usageCount: 1 } },
    { returnDocument: 'after' },
  )
    .select('question answer category sortOrder isFeatured')
    .lean();

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const searchFaqAnswer = async (query) => {
  const normalizedQuery = query?.trim();
  if (!normalizedQuery || normalizedQuery.length < 2) return null;

  const textMatches = await ConciergeFaq.find(
    {
      isActive: true,
      $text: { $search: normalizedQuery },
    },
    { score: { $meta: 'textScore' } },
  )
    .sort({ score: { $meta: 'textScore' }, sortOrder: 1 })
    .limit(1)
    .select('question answer category sortOrder isFeatured score')
    .lean();

  if (textMatches[0]) {
    await ConciergeFaq.findByIdAndUpdate(textMatches[0]._id, { $inc: { usageCount: 1 } });
    return { ...textMatches[0], matchType: 'text' };
  }

  const words = normalizedQuery
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9åäö]/gi, ''))
    .filter((word) => word.length >= 3)
    .slice(0, 6);

  if (words.length === 0) return null;

  const regex = new RegExp(words.map(escapeRegex).join('|'), 'i');
  const regexMatch = await ConciergeFaq.findOne({
    isActive: true,
    $or: [
      { question: regex },
      { answer: regex },
      { category: regex },
    ],
  })
    .sort({ sortOrder: 1, createdAt: -1 })
    .select('question answer category sortOrder isFeatured')
    .lean();

  if (regexMatch) {
    await ConciergeFaq.findByIdAndUpdate(regexMatch._id, { $inc: { usageCount: 1 } });
    return { ...regexMatch, matchType: 'keyword' };
  }

  return null;
};

export {
  createFaq,
  getPublicFaqs,
  getAdminFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
  recordFaqClick,
  searchFaqAnswer,
};
