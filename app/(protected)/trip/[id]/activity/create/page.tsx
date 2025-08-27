'use client';

import ActivitySummary from '@/components/activity/ActivitySummary';
import ActivityTypeSelector, {
  ActivityTypeData,
} from '@/components/activity/ActivityTypeSelector';
import DestinationSelector, {
  DestinationData,
} from '@/components/activity/DestinationSelector';
import ActivityDetails from '@/components/activity/ActivityDetails';
import { PageHeader } from '@/components/layout';
import { Steps } from '@/components/steps';
import { ActivityDetailsData } from '@/lib/schemas';
import { Activity, Step } from '@/lib/types';
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
    subType: undefined,
  });
  const [destinations, setDestinations] = useState<DestinationData>({
    searchType: 'searchText',
  });
  const [detailsData, setDetailsData] = useState<ActivityDetailsData>({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const resetDestinationData = () => {
    setDestinations({
      searchType: 'searchText',
    });
  };

  const resetPeriodData = () => {
    setDetailsData({
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      description: '',
    });
  };

  const handleTypeNext = (newValue: ActivityTypeData) => {
    // Check if typeData is different from the new value
    const isDiff =
      typeData.type !== newValue.type || typeData.subType !== newValue.subType;

    // If it is, clear future steps
    if (isDiff) {
      resetDestinationData();
      resetPeriodData();
    }

    // Set the new typeData
    setTypeData(newValue);

    // Set the current step
    setCurrentStep(1);

    // Update the steps status
    updateStepsStatus(1);
  };

  const handleDestinationNext = (destData: DestinationData) => {
    // Check if destData is different from the current destData
    const isDiff = destData.place?.id !== destinations.place?.id;

    // If it is, clear future steps
    if (isDiff) resetPeriodData();

    // Set the new destData
    setDestinations(destData);

    // Set the current step
    setCurrentStep(2);

    // Update the steps status
    updateStepsStatus(2);
  };

  const handleDestinationBack = () => {
    setCurrentStep(0);
    updateStepsStatus(0);
  };

  const handlePeriodNext = (details: ActivityDetailsData) => {
    setDetailsData(details);
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
    const activity: Activity = {
      tripId,
      ...typeData,
      ...detailsData,
      place: destinations.place!,
    };
    // TODO: Implement form submission
    console.log('Submitting activity:', activity);

    // For now, just redirect back
    // router.push(TripRoutes.details(tripId));
  };

  // Steps configuration
  const steps: Step[] = [
    {
      title: 'Tipo',
      description: 'Selecione o tipo',
      status: 'current',
      children: (
        <ActivityTypeSelector defaultData={typeData} onNext={handleTypeNext} />
      ),
    },
    {
      title: 'Destino',
      description: 'Defina o local',
      status: 'pending',
      children: (
        <DestinationSelector
          defaultData={destinations}
          activityType={typeData}
          onNext={handleDestinationNext}
          onBack={handleDestinationBack}
        />
      ),
    },
    {
      title: 'Detalhes',
      description: 'Data, hora e descrição',
      status: 'pending',
      children: (
        <ActivityDetails
          defaultData={detailsData}    
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
          periodData={detailsData}
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
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 space-y-6',
  stepsCard: 'p-6',
  steps: 'overflow-x-auto',
  contentCard: 'p-8',
  cancelContainer: 'flex justify-center pt-4',
  cancelButton:
    'px-6 py-3 text-mist-gray hover:text-parchment-white transition-colors duration-200',
};
