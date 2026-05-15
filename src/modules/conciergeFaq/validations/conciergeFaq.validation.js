import { z } from 'zod';

export const createConciergeFaqSchema = z.object({
  question: z.string().trim().min(3, 'Question must be at least 3 characters'),
  answer: z.string().trim().min(3, 'Answer must be at least 3 characters'),
  category: z.string().trim().min(2).optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const updateConciergeFaqSchema = createConciergeFaqSchema.partial();
