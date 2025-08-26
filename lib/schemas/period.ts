import { z } from 'zod';
import { parsePtBrToDate } from '../utils';

// Schema for period validation
export const periodSchema = z.object({
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de fim é obrigatória'),
  startTime: z.string().min(1, 'Horário de início é obrigatório'),
  endTime: z.string().min(1, 'Horário de fim é obrigatório'),
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

export type PeriodData = z.infer<typeof periodSchema>;