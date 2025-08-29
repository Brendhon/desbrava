'use client';

import { NavigationButtons } from '@/components/steps';
import { PageStructure } from '@/components/ui';
import { ActivityTypeData } from './ActivityTypeSelector';
import { DestinationData } from './DestinationSelector';
import { ActivityDetailsData } from '@/lib/schemas';
import ActivityInfoView from './ActivityInfoView';

interface ActivitySummaryProps {
  activityType: ActivityTypeData;
  destinations: DestinationData;
  details: ActivityDetailsData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function ActivitySummary({
  activityType,
  destinations,
  details,
  onBack,
  onSubmit,
  isSubmitting = false,
}: ActivitySummaryProps) {
  // Create a mock Activity object from the form data to use with ActivityInfoView
  const activity = {
    id: '',
    tripId: '',
    type: activityType.type,
    subType: activityType.subType || 'point_of_interest',
    place: destinations.place!,
    startDate: details.startDate,
    endDate: details.endDate,
    startTime: details.startTime,
    endTime: details.endTime,
    description: details.description,
  };

  return (
    <PageStructure
      title="Resumo da Atividade"
      description="Revise as informações antes de criar a atividade"
    >
      <div className={styles.container}>
        {/* Use the reusable ActivityInfoView component */}
        <ActivityInfoView activity={activity} />

        {/* Navigation Buttons */}
        <NavigationButtons
          onBack={onBack}
          onNext={onSubmit}
          canProceed={!isSubmitting}
          nextButtonText={isSubmitting ? 'Criando...' : 'Criar Atividade'}
        />
      </div>
    </PageStructure>
  );
}

const styles = {
  container: 'space-y-8',
};
