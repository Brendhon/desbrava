# 🚀 Loading Components Usage

## Overview

Loading components provide instant loading states for better user experience during navigation and data fetching in the Desbrava project.

## Available Components

### Basic Skeletons

- `LoadingSkeleton` - Basic text skeleton with configurable count
- `CardSkeleton` - Generic card layout skeleton
- `TripCardSkeleton` - Trip card specific skeleton
- `ButtonSkeleton` - Button placeholder skeleton
- `InputSkeleton` - Input field placeholder skeleton

### Layout Skeletons

- `StatsGridSkeleton` - Grid of statistics cards
- `FormSectionSkeleton` - Form section with multiple inputs

## Usage

### 1. File-based Loading (Recommended)

Create a `loading.tsx` file in your route directory:

```tsx
// app/dashboard/loading.tsx
import { StatsGridSkeleton, TripCardSkeleton } from '@/components/ui/loading-skeleton';

export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <StatsGridSkeleton />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <TripCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
```

### 2. Manual Suspense Boundaries

Use Suspense for component-level loading:

```tsx
import { Suspense } from 'react';
import { TripCardSkeleton } from '@/components/ui/loading-skeleton';
import { TripList } from './TripList';

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<TripCardSkeleton />}>
        <TripList />
      </Suspense>
    </div>
  );
}
```

### 3. Custom Loading States

Create custom loading states using the base components:

```tsx
import { LoadingSkeleton, CardSkeleton } from '@/components/ui/loading-skeleton';

export function CustomLoading() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton count={3} className="w-3/4" />
      <CardSkeleton />
    </div>
  );
}
```

## Color Scheme

All loading components use the project's dark theme color palette:

- **Background**: `bg-slate-dark` with `border-midnight-blue/20`
- **Skeleton elements**: `bg-mist-gray/20` (20% opacity)
- **Accent elements**: `bg-royal-purple/20` (20% opacity)
- **Shadows**: `shadow-lg` for depth

## Best Practices

1. **Keep it simple** - Use the pre-built components when possible
2. **Match the layout** - Loading state should resemble the final content
3. **Consistent spacing** - Use the same spacing as the actual content
4. **Appropriate count** - Show realistic number of skeleton items
5. **Responsive design** - Ensure loading states work on all screen sizes

## Examples

### Dashboard Loading
```tsx
<StatsGridSkeleton />
<TripCardSkeleton />
```

### Form Loading
```tsx
<FormSectionSkeleton />
<ButtonSkeleton />
```

### List Loading
```tsx
<div className="grid gap-4">
  {Array.from({ length: 5 }).map((_, index) => (
    <TripCardSkeleton key={index} />
  ))}
</div>
```

## File Structure

```
app/
├── loading.tsx                    # Root loading
├── (protected)/
│   ├── dashboard/
│   │   └── loading.tsx          # Dashboard loading
│   ├── trip/
│   │   ├── loading.tsx          # Trip creation loading
│   │   └── [id]/
│   │       ├── loading.tsx      # Trip details loading
│   │       └── settings/
│   │           └── loading.tsx  # Trip settings loading
│   └── account/
│       └── loading.tsx          # Account loading
```

## Performance Benefits

- **Instant feedback** - Users see loading state immediately
- **Perceived performance** - App feels faster and more responsive
- **Better UX** - Users understand content is loading
- **Streaming** - Content loads progressively with Suspense
