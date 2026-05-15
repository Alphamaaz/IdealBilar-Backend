import dotenv from 'dotenv';
import connectDB from '../../../database/db.js';
import ConciergeFaq from '../models/conciergeFaq.model.js';

dotenv.config();

const starterFaqs = [
  {
    question: 'How can I view available cars?',
    answer: 'You can view available vehicles from the Inventory page. Use filters to narrow by brand, model, fuel type, gearbox, and price.',
    category: 'inventory',
    sortOrder: 1,
    isFeatured: true,
  },
  {
    question: 'How do I book a rental car?',
    answer: 'Open the Rental page, select a car, choose your pickup and return dates, then submit the rental inquiry. Our team will review and confirm availability.',
    category: 'rental',
    sortOrder: 2,
    isFeatured: true,
  },
  {
    question: 'How can I book a service?',
    answer: 'Use the Workshop or Car Wash page to choose a service and preferred time. If the selected time is unavailable, choose another slot.',
    category: 'service',
    sortOrder: 3,
    isFeatured: true,
  },
  {
    question: 'Can I sell my car to Ideal Bilar?',
    answer: 'Yes. Use the Sell a Car page, enter your vehicle details, upload photos, and submit it for valuation.',
    category: 'sell',
    sortOrder: 4,
    isFeatured: true,
  },
  {
    question: 'I need help from an admin',
    answer: 'You can message an Ideal Bilar representative directly. Click Message Admin and we will connect you to support.',
    category: 'support',
    sortOrder: 5,
    isFeatured: true,
  },
];

const seed = async () => {
  await connectDB();

  for (const faq of starterFaqs) {
    await ConciergeFaq.findOneAndUpdate(
      { question: faq.question },
      { $setOnInsert: faq },
      { upsert: true, returnDocument: 'after' },
    );
  }

  console.log(`Seeded ${starterFaqs.length} concierge FAQs`);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
