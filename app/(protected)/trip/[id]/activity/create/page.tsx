'use client';

import ActivitySummary from '@/components/activity/ActivitySummary';
import ActivityTypeSelector, {
  ActivityTypeData,
} from '@/components/activity/ActivityTypeSelector';
import DestinationSelector, {
  DestinationData,
} from '@/components/activity/DestinationSelector';
import PeriodSelector, {
  PeriodData,
} from '@/components/activity/PeriodSelector';
import { PageHeader } from '@/components/layout';
import { Steps } from '@/components/steps';
import { Step } from '@/lib/types';
import { TripRoutes } from '@/lib/types/route';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateActivityPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  // Step management
  const [currentStep, setCurrentStep] = useState(0);

  // Form data
  const [typeData, setTypeData] = useState<ActivityTypeData>({
    type: 'accommodation',
    subType: '',
  });
  const [destinations, setDestinations] = useState<DestinationData>({});
  const [periodData, setPeriodData] = useState<PeriodData>({
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleTypeNext = (typeData: ActivityTypeData) => {
    setTypeData(typeData);
    setCurrentStep(1);
    updateStepsStatus(1);
  };

  const handleDestinationNext = (destData: DestinationData) => {
    setDestinations(destData);
    setCurrentStep(2);
    updateStepsStatus(2);
  };

  const handleDestinationBack = () => {
    setCurrentStep(0);
    updateStepsStatus(0);
  };

  const handlePeriodNext = (period: PeriodData) => {
    setPeriodData(period);
    setCurrentStep(3);
    updateStepsStatus(3);
  };

  const handlePeriodBack = () => {
    setCurrentStep(1);
    updateStepsStatus(1);
  };

  const handleSummaryBack = () => {
    setCurrentStep(2);
    updateStepsStatus(2);
  };

  const handleSubmit = async () => {
    // TODO: Implement form submission
    console.log('Submitting activity:', {
      type: typeData,
      destinations,
      periodData,
    });

    // For now, just redirect back
    router.push(TripRoutes.details(tripId));
  };

  // Steps configuration
  const steps: Step[] = [
    {
      title: 'Tipo',
      description: 'Selecione o tipo',
      status: 'current',
      children: (
        <ActivityTypeSelector typeData={typeData} onNext={handleTypeNext} />
      ),
    },
    {
      title: 'Destino',
      description: 'Defina o local ou rota',
      status: 'pending',
      children: (
        <DestinationSelector
          activityType={typeData}
          onNext={handleDestinationNext}
          onBack={handleDestinationBack}
        />
      ),
    },
    {
      title: 'Período',
      description: 'Data e horário',
      status: 'pending',
      children: (
        <PeriodSelector
          activityType={typeData}
          destinations={destinations}
          onNext={handlePeriodNext}
          onBack={handlePeriodBack}
        />
      ),
    },
    {
      title: 'Resumo',
      description: 'Revise e confirme',
      status: 'pending',
      children: (
        <ActivitySummary
          activityType={typeData}
          destinations={destinations}
          periodData={periodData}
          onBack={handleSummaryBack}
          onSubmit={handleSubmit}
        />
      ),
    },
  ];

  const updateStepsStatus = (currentStepIndex: number) => {
    steps.forEach((step, index) => {
      if (index < currentStepIndex) {
        step.status = 'completed';
      } else if (index === currentStepIndex) {
        step.status = 'current';
      } else {
        step.status = 'pending';
      }
    });
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      updateStepsStatus(stepIndex);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <PageHeader
        backHref={TripRoutes.details(tripId)}
        backText="Voltar aos Detalhes"
        backAriaLabel="Voltar aos detalhes da viagem"
        title="Nova Atividade"
        subtitle="Crie uma nova atividade seguindo os passos abaixo"
      />

      {/* Steps Progress */}
      <Steps
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        className={styles.steps}
      />
    </div>
  );
}
const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-6',
  stepsCard: 'p-6',
  steps: 'overflow-x-auto',
  contentCard: 'p-8',
  cancelContainer: 'flex justify-center pt-4',
  cancelButton:
    'px-6 py-3 text-mist-gray hover:text-parchment-white transition-colors duration-200',
};
