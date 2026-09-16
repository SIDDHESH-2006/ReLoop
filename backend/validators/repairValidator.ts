import { z } from 'zod';

export const createRepairTicketSchema = z.object({
  item_id: z
    .string()
    .uuid('Invalid item ID format')
    .optional(),
  item_name: z
    .string()
    .min(2, 'Item name is required')
    .max(120),
  issue_description: z
    .string()
    .min(10, 'Please describe the issue in at least 10 characters')
    .max(2000),
  photos: z
    .array(z.string().url('Each photo must be a valid URL'))
    .max(5, 'Maximum 5 photos allowed')
    .optional()
    .default([]),
  preferred_hub_id: z
    .string()
    .uuid('Invalid hub ID format')
    .optional(),
});

export type CreateRepairTicketInput = z.infer<typeof createRepairTicketSchema>;
