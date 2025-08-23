import { z } from 'zod';

const baseSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome da viagem é obrigatório')
    .min(3, 'Nome da viagem deve ter pelo menos 3 caracteres')
    .max(100, 'Nome da viagem deve ter no máximo 100 caracteres'),

  country: z
    .string()
    .min(1, 'País é obrigatório')
    .min(2, 'País deve ter pelo menos 2 caracteres')
    .max(50, 'País deve ter no máximo 50 caracteres'),

  startDate: z.string().min(1, 'Data de início é obrigatória'),

  endDate: z.string().min(1, 'Data de fim é obrigatória'),

  description: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 10,
      'Descrição deve ter pelo menos 10 caracteres'
    )
    .refine(
      (val) => !val || val.length <= 1000,
      'Descrição deve ter no máximo 1000 caracteres'
    ),
});

export const tripSettingsSchema = baseSchema.extend({});
export const createTripSchema = baseSchema.extend({});

export type TripSettingsFormData = z.infer<typeof tripSettingsSchema>;
export type CreateTripFormData = z.infer<typeof createTripSchema>;
