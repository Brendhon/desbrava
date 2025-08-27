'use client';

import { DatePicker, Input } from '@/components/form';
import { NavigationButtons } from '@/components/steps';
import { PeriodData, periodSchema } from '@/lib/schemas/period';
import { parsePtBrToDate } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Clock } from 'lucide-react';
import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface PeriodSelectorProps {
  defaultData?: PeriodData;
  onNext: (periodData: PeriodData) => void;
  onBack: () => void;
}

export default function PeriodSelector({
  defaultData,
  onNext,
  onBack,
}: PeriodSelectorProps) {
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
          Quando será a atividade?
        </h2>
        <p className={styles.description}>
          Selecione a data e horário da atividade
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Date Selection */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <Calendar className={styles.cardIcon} />
            Data
          </h3>

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
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <Clock className={styles.cardIcon} />
            Horário
          </h3>

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
  header: 'text-center pb-4',
  title: 'text-parchment-white mb-2 text-2xl font-bold',
  description: 'text-mist-gray',
  form: 'space-y-6',
  card: 'px-2 sm:px-4 md:px-6 lg:px-8 w-full mb-5',
  cardTitle: 'text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold',
  cardIcon: 'text-royal-purple h-5 w-5',
  dateContainer: 'grid grid-cols-1 gap-4 md:grid-cols-2',
  dateField: 'space-y-2',
  timeContainer: 'grid grid-cols-1 gap-4 md:grid-cols-2',
  timeField: 'space-y-2',
};
