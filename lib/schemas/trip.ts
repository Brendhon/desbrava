import { z } from 'zod';

const baseSchema = z.object({
  title: z
    .string()
    .min(1, 'Nome da viagem é obrigatório')
    .min(3, 'Nome da viagem deve ter pelo menos 3 caracteres')
    .max(100, 'Nome da viagem deve ter no máximo 100 caracteres'),

  country: z
    .string()
    .min(1, 'País é obrigatório')
    .min(2, 'País deve ter pelo menos 2 caracteres')
    .max(50, 'País deve ter no máximo 50 caracteres'),

  startDate: z
    .string()
    .min(1, 'Data de início é obrigatória')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'Data de início deve ser hoje ou uma data futura'),

  endDate: z
    .string()
    .min(1, 'Data de fim é obrigatória'),

  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return endDate > startDate;
}, {
  message: 'Data de fim deve ser posterior à data de início',
  path: ['endDate'],
});

export const tripSettingsSchema = baseSchema.extend({})
export const createTripSchema = baseSchema.extend({})

export type TripSettingsFormData = z.infer<typeof tripSettingsSchema>;
export type CreateTripFormData = z.infer<typeof createTripSchema>;
