import { ButtonSkeleton, FormSectionSkeleton } from '@/components/ui/loading-skeleton';

export default function TripSettingsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Settings Form */}
      <div className="max-w-2xl mx-auto">
        <FormSectionSkeleton />
        
        {/* Privacy Settings */}
        <div className="bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-6 mb-6 animate-pulse">
          <div className="h-6 bg-mist-gray/20 rounded-md w-28 mb-6 animate-pulse" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-mist-gray/20 rounded-md w-40 animate-pulse" />
              <div className="w-12 h-6 bg-mist-gray/20 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-mist-gray/20 rounded-md w-36 animate-pulse" />
              <div className="w-12 h-6 bg-mist-gray/20 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-6 mb-6 animate-pulse">
          <div className="h-6 bg-mist-gray/20 rounded-md w-24 mb-6 animate-pulse" />
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="h-5 bg-mist-gray/20 rounded-md w-32 mb-3 animate-pulse" />
            <div className="h-4 bg-mist-gray/20 rounded-md w-full mb-4 animate-pulse" />
            <ButtonSkeleton />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
    </div>
  );
}
