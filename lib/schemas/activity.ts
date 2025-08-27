import { z } from 'zod';
import { parsePtBrToDate } from '../utils';

// Schema for activity type selection
export const activityTypeSelectorSchema = z.object({
  activityType: z.string().min(1, 'Tipo de atividade é obrigatório'),
  subType: z.string().optional(),
});

// Schema for activity creation (can be expanded as needed)
export const createActivitySchema = z.object({
  activityType: z.string().min(1, 'Tipo de atividade é obrigatório'),
  subType: z.string().optional(),
  name: z.string().min(1, 'Nome da atividade é obrigatório'),
  description: z.string().optional(),
  date: z.string().min(1, 'Data é obrigatória'),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  notes: z.string().optional(),
});

// Schema for activity details validation
export const activityDetailsSchema = z.object({
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de fim é obrigatória'),
  startTime: z.string().min(1, 'Horário de início é obrigatório'),
  endTime: z.string().min(1, 'Horário de fim é obrigatório'),
  description: z.string().optional(),
}).refine((data) => {
  // If endDate is provided, it must be >= startDate
  const startDateParsed = parsePtBrToDate(data.startDate);
  const endDateParsed = parsePtBrToDate(data.endDate);

  // If endDate is provided, it must be >= startDate
  return endDateParsed && startDateParsed
    ? endDateParsed >= startDateParsed
    : true;
}, {
  message: 'A data de fim deve ser igual ou posterior à data de início',
  path: ['endDate'],
}).refine((data) => {
  // If endTime is provided and the dates are the same, endTime must be > startTime
  if (data.endTime && data.startTime && data.startDate && data.endDate) {
    if (data.startDate === data.endDate) {
      return data.endTime > data.startTime;
    }
  }
  return true;
}, {
  message: 'O horário de fim deve ser posterior ao horário de início quando as datas forem iguais',
  path: ['endTime'],
});

export type ActivityDetailsData = z.infer<typeof activityDetailsSchema>;
export type ActivityTypeSelectorFormData = z.infer<typeof activityTypeSelectorSchema>;
export type CreateActivityFormData = z.infer<typeof createActivitySchema>;
