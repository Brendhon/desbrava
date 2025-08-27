'use client';

import { DatePicker, Input, Textarea } from '@/components/form';
import { NavigationButtons } from '@/components/steps';
import { PeriodData, periodSchema } from '@/lib/schemas/period';
import { parsePtBrToDate } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Notebook } from 'lucide-react';
import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface ActivityDetailsProps {
  defaultData?: PeriodData;
  onNext: (periodData: PeriodData) => void;
  onBack: () => void;
}

export default function ActivityDetails({
  defaultData,
  onNext,
  onBack,
}: ActivityDetailsProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<PeriodData>({
    resolver: zodResolver(periodSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      description: '',
      ...defaultData,
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
        setValue('endDate', startDate)
      }
    }

    // Update end date
    updateEndDate();
  }, [startDate]);

  // Get end min date for DatePicker
  const endMinDate = useMemo(
    () => startDate ? parsePtBrToDate(startDate) : new Date(),
    [startDate]
  );

  // Handle form submission
  const onSubmit = useCallback(
    (data: PeriodData) => onNext(data),
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
    <Fragment>
      {/* Page Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Detalhes da Atividade
        </h2>
        <p className={styles.description}>
          Configure quando e como será sua atividade
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Period Selection Group */}
        <div className={styles.periodGroup}>
          <div className={styles.groupHeader}>
            <h3 className={styles.groupTitle}>
              <Calendar className={styles.groupIcon} />
              Período da Atividade
            </h3>
            <p className={styles.groupDescription}>
              Defina as datas e horários de início e fim
            </p>
          </div>

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
        </div>

        {/* Notes Section */}
        <div className={styles.notesSection}>
          <div className={styles.groupHeader}>
            <h3 className={styles.groupTitle}>
              <Notebook className={styles.groupIcon} />
              Observações e Notas
            </h3>
            <p className={styles.groupDescription}>
              Adicione informações importantes sobre a atividade
            </p>
          </div>

          <Textarea
            label="Descrição da Atividade (opcional)"
            register={register('description')}
            placeholder="Ex: Não esquecer de levar o travesseiro, local de encontro, equipamentos necessários..."
            helperText="Adicione observações, instruções ou qualquer informação relevante"
            rows={4}
            error={errors.description?.message}
          />
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          onBack={onBack}
          onNext={handleSubmit(onSubmit)}
          canProceed={isValid}
        />
      </form>
    </Fragment>
  );
}

const styles = {
  header: 'text-center pb-6',
  title: 'text-parchment-white mb-3 text-2xl font-bold',
  description: 'text-mist-gray text-lg',
  form: 'space-y-8',
  
  // Period Group Styles
  periodGroup: 'bg-slate-800/30 rounded-xl p-6 border border-slate-700/50',
  groupHeader: 'mb-6 text-center',
  groupTitle: 'text-parchment-white mb-2 text-xl font-semibold flex items-center justify-center gap-2',
  groupIcon: 'text-royal-purple h-6 w-6',
  groupDescription: 'text-mist-gray text-sm',
  
  // Section Styles
  dateSection: 'mb-6',
  timeSection: 'mb-0',
  sectionTitle: 'text-parchment-white mb-4 text-lg font-medium flex items-center gap-2',
  
  // Container Styles
  dateContainer: 'grid grid-cols-1 gap-4 md:grid-cols-2',
  dateField: 'space-y-2',
  timeContainer: 'grid grid-cols-1 gap-4 md:grid-cols-2',
  timeField: 'space-y-2',
  
  // Notes Section
  notesSection: 'bg-slate-800/30 rounded-xl p-6 border border-slate-700/50',
};
