'use client';

import { DatePicker, Input, Textarea } from '@/components/form';
import { NavigationButtons } from '@/components/steps';
import { GroupSection, PageStructure } from '@/components/ui';
import { ActivityDetailsData, activityDetailsSchema } from '@/lib/schemas';
import { Activity, Trip } from '@/lib/types';
import {
  formatTimestamp,
  parsePtBrToDate,
  parseTimestampToDate,
} from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Notebook } from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface ActivityDetailsProps {
  defaultData?: ActivityDetailsData;
  trip: Trip | null;
  lastActivity: Activity | null;
  onNext: (periodData: ActivityDetailsData) => void;
  onBack: () => void;
}

export default function ActivityDetails({
  defaultData,
  trip,
  lastActivity,
  onNext,
  onBack,
}: ActivityDetailsProps) {
  // Get default values
  const defaultValues = useMemo(() => {
    // If last activity is provided, use it as the default values
    if (lastActivity) {
      return {
        ...defaultData,
        startDate: formatTimestamp(lastActivity.endAt, 'dd/MM/yyyy'),
        startTime: formatTimestamp(lastActivity.endAt, 'HH:mm'),
      };
    }

    // If trip is provided, use it as the default values
    if (trip) {
      return {
        ...defaultData,
        startDate: formatTimestamp(trip.startAt, 'dd/MM/yyyy'),
        startTime: formatTimestamp(trip.startAt, 'HH:mm'),
      };
    }

    // If no default values are provided, return an empty object
    return defaultData || {};
  }, [defaultData, trip, lastActivity]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ActivityDetailsData>({
    resolver: zodResolver(activityDetailsSchema),
    defaultValues: {
      endDate: '',
      endTime: '',
      description: '',
      ...defaultValues,
    },
    mode: 'onChange',
  });

  // Watch form values
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  // Clear end date if start date is after end date
  useEffect(() => {
    const updateEndDate = () => {
      // Parse dates
      const startDateParsed = parsePtBrToDate(startDate);
      const endDateParsed = parsePtBrToDate(endDate);

      // Check if start date is valid
      if (!startDateParsed) return;

      // If start date is after end date, clear end date
      if (!endDateParsed || startDateParsed > endDateParsed) {
        setValue('endDate', startDate);
      }
    };

    // Update end date
    updateEndDate();
  }, [startDate]);

  // Get end min date for DatePicker
  const endMinDate = useMemo(
    () => (startDate ? parsePtBrToDate(startDate) : new Date()),
    [startDate]
  );

  // Handle form submission
  const onSubmit = useCallback(
    (data: ActivityDetailsData) => onNext(data),
    [onNext]
  );

  // Create register objects for DatePicker
  const startDateRegister = {
    name: 'startDate',
    onChange: (e: { target: { value: string; name: string } }) => {
      setValue('startDate', e.target.value);
    },
  };

  const endDateRegister = {
    name: 'endDate',
    onChange: (e: { target: { value: string; name: string } }) => {
      setValue('endDate', e.target.value);
    },
  };

  // Render
  return (
    <PageStructure
      title="Detalhes da Atividade"
      description="Configure quando e como será sua atividade"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Period Selection Group */}
        <GroupSection
          title="Período da Atividade"
          description="Defina as datas e horários de início e fim"
          icon={Calendar}
        >
          {/* Date Selection */}
          <div className={styles.dateSection}>
            <h4 className={styles.sectionTitle}>Datas</h4>
            <div className={styles.dateContainer}>
              <div className={styles.dateField}>
                <DatePicker
                  label="Data de Início"
                  defaultValue={startDate}
                  register={startDateRegister}
                  helperText="Data em que a atividade começará"
                  popupPosition="top"
                  value={startDate}
                  error={errors.startDate?.message}
                  minDate={new Date()}
                  maxDate={parseTimestampToDate(trip?.endAt)}
                />
              </div>

              <div className={styles.dateField}>
                <DatePicker
                  label="Data de Fim"
                  defaultValue={endDate || ''}
                  register={endDateRegister}
                  popupPosition="top"
                  value={endDate || ''}
                  helperText="Data em que a atividade terminará"
                  error={errors.endDate?.message}
                  disabled={!startDate}
                  minDate={endMinDate}
                  maxDate={parseTimestampToDate(trip?.endAt)}
                />
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div className={styles.timeSection}>
            <h4 className={styles.sectionTitle}>Horários</h4>
            <div className={styles.timeContainer}>
              <div className={styles.timeField}>
                <Input
                  label="Horário de Início"
                  type="time"
                  register={register('startTime')}
                  required
                  helperText="Horário em que a atividade começará"
                  error={errors.startTime?.message}
                />
              </div>

              <div className={styles.timeField}>
                <Input
                  label="Horário de Fim"
                  type="time"
                  register={register('endTime')}
                  helperText="Horário em que a atividade terminará"
                  error={errors.endTime?.message}
                />
              </div>
            </div>
          </div>
        </GroupSection>

        {/* Notes Section */}
        <GroupSection
          title="Observações e Notas"
          description="Adicione informações importantes sobre a atividade"
          icon={Notebook}
        >
          <Textarea
            label="Descrição da Atividade (opcional)"
            register={register('description')}
            placeholder="Ex: Não esquecer de levar o travesseiro, local de encontro, equipamentos necessários..."
            helperText="Adicione observações, instruções ou qualquer informação relevante"
            rows={4}
            error={errors.description?.message}
          />
        </GroupSection>

        {/* Navigation Buttons */}
        <NavigationButtons
          onBack={onBack}
          onNext={handleSubmit(onSubmit)}
          canProceed={isValid}
        />
      </form>
    </PageStructure>
  );
}

const styles = {
  form: 'space-y-8',

  // Section Styles
  dateSection: 'mb-6',
  timeSection: 'mb-0',
  sectionTitle:
    'text-parchment-white mb-4 text-lg font-medium flex items-center gap-2',

  // Container Styles
  dateContainer: 'grid grid-cols-1 gap-4 md:grid-cols-2',
  dateField: 'space-y-2',
  timeContainer: 'grid grid-cols-1 gap-4 md:grid-cols-2',
  timeField: 'space-y-2',
};
