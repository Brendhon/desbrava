import { z } from 'zod';

// Schema para seleção de tipo de atividade
export const activityTypeSelectorSchema = z.object({
  activityType: z.string().min(1, 'Tipo de atividade é obrigatório'),
  subType: z.string().optional(),
});

// Schema para criação de atividade (pode ser expandido conforme necessário)
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

// Tipos derivados dos schemas
export type ActivityTypeSelectorFormData = z.infer<
  typeof activityTypeSelectorSchema
>;
export type CreateActivityFormData = z.infer<typeof createActivitySchema>;
