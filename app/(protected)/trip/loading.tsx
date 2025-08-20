import { ButtonSkeleton, FormSectionSkeleton } from '@/components/ui/loading-skeleton';

export default function TripCreationLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Form Skeleton */}
      <div className="max-w-2xl mx-auto">
        <FormSectionSkeleton />
        
        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
    </div>
  );
}
