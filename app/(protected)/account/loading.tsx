import { ButtonSkeleton, FormSectionSkeleton } from '@/components/ui/loading-skeleton';

export default function AccountLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-dark rounded-lg shadow-lg border border-midnight-blue/20 p-6 mb-6 animate-pulse">
          <div className="h-6 bg-mist-gray/20 rounded-md w-32 mb-6 animate-pulse" />
          
          {/* Avatar */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-mist-gray/20 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-mist-gray/20 rounded-md w-32 animate-pulse" />
              <div className="h-3 bg-mist-gray/20 rounded-md w-24 animate-pulse" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-mist-gray/20 rounded-md w-20 mb-2 animate-pulse" />
              <div className="h-10 bg-mist-gray/20 rounded-md w-full animate-pulse" />
            </div>
            <div>
              <div className="h-4 bg-mist-gray/20 rounded-md w-32 mb-2 animate-pulse" />
              <div className="h-10 bg-mist-gray/20 rounded-md w-full animate-pulse" />
            </div>
            <div>
              <div className="h-4 bg-mist-gray/20 rounded-md w-28 mb-2 animate-pulse" />
              <div className="h-10 bg-mist-gray/20 rounded-md w-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <FormSectionSkeleton />

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
    </div>
  );
}
