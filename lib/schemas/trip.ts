import { z } from 'zod';
import { parsePtBrToDate } from '../utils/trip';

const baseSchema = z
  .object({
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

    startDate: z
      .string()
      .min(1, 'Data de início é obrigatória')
      .refine((date) => {
        const selectedDate = parsePtBrToDate(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate >= today && !isNaN(selectedDate.getTime());
      }, 'Data de início deve ser hoje ou uma data futura'),

    endDate: z
      .string()
      .min(1, 'Data de fim é obrigatória')
      .refine((date) => {
        const selectedDate = parsePtBrToDate(date);
        return !isNaN(selectedDate.getTime());
      }, 'Data de fim deve ser uma data válida'),

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
  })
  .refine(
    (data) => {
      // Converter formato brasileiro dd/MM/yyyy para Date para comparação
      const [startDay, startMonth, startYear] = data.startDate.split('/');
      const [endDay, endMonth, endYear] = data.endDate.split('/');

      if (
        !startDay ||
        !startMonth ||
        !startYear ||
        !endDay ||
        !endMonth ||
        !endYear
      ) {
        return false;
      }

      const startDate = new Date(
        parseInt(startYear),
        parseInt(startMonth) - 1,
        parseInt(startDay)
      );
      const endDate = new Date(
        parseInt(endYear),
        parseInt(endMonth) - 1,
        parseInt(endDay)
      );

      return endDate > startDate;
    },
    {
      message: 'Data de fim deve ser posterior à data de início',
      path: ['endDate'],
    }
  );

export const tripSettingsSchema = baseSchema.extend({});
export const createTripSchema = baseSchema.extend({});

export type TripSettingsFormData = z.infer<typeof tripSettingsSchema>;
export type CreateTripFormData = z.infer<typeof createTripSchema>;
