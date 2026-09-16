import { z } from 'zod';
import { ITEM_CATEGORIES, ITEM_CONDITIONS, ITEM_PATHWAYS } from '../constants/categories';

export const createItemSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title must be under 120 characters'),
  description: z
    .string()
    .max(1000, 'Description must be under 1000 characters')
    .optional(),
  category: z.enum(ITEM_CATEGORIES),
  condition: z.enum(ITEM_CONDITIONS),
  pathway: z.enum(ITEM_PATHWAYS),
  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(100000, 'Price seems too high for campus items')
    .optional()
    .default(0),
  images: z
    .array(z.string().url('Each image must be a valid URL'))
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed'),
  hostel_block: z
    .string()
    .min(1, 'Hostel block is required'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const updateItemSchema = createItemSchema.partial();

export const itemFilterSchema = z.object({
  pathway: z.enum(ITEM_PATHWAYS).optional(),
  category: z.enum(ITEM_CATEGORIES).optional(),
  condition: z.enum(ITEM_CONDITIONS).optional(),
  hostel_block: z.string().optional(),
  is_free: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .optional(),
  search: z.string().max(100).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type ItemFilterInput = z.infer<typeof itemFilterSchema>;
