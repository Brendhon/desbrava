import { CardSkeleton, ButtonSkeleton } from '@/components/ui/loading-skeleton';

export default function TripDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-mist-gray/20 rounded-md w-1/3 animate-pulse" />
          <div className="flex space-x-3">
            <ButtonSkeleton />
            <ButtonSkeleton />
          </div>
        </div>
        <div className="h-5 bg-mist-gray/20 rounded-md w-1/2 animate-pulse" />
      </div>

      {/* Trip Info Card */}
      <CardSkeleton />

      {/* Tabs Navigation */}
      <div className="mb-6">
        <div className="flex space-x-6 border-b border-midnight-blue/20">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 bg-mist-gray/20 rounded-md w-24 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Content Area */}
      <CardSkeleton />
    </div>
  );
}
