# 🧩 Core Component Guidelines

## Overview

A unified guide for creating components in the Desbrava project, covering component types, state management, performance, and accessibility.

## Rules

### Component Architecture

1.  **Default to Server Components**: They are the foundation. Use them for fetching data and for any UI that is not interactive. This improves performance by reducing client-side JavaScript.
2.  **Use Client Components for Interactivity**: Add `'use client'` at the top of a file when you need to use hooks (`useState`, `useEffect`) or event handlers (`onClick`). Keep them small and import them into Server Components.

### State Management

1.  **Start with `useState`**: For simple state that only one component needs, `useState` is perfect.
2.  **Lift State Up**: When multiple components need to share state, move that state to their closest common parent and pass it down via props.
3.  **Use Context for Global State**: For app-wide state that many components need (like user session or theme), use the Context API. Use it sparingly as it can make components harder to reuse.

### Performance

1.  **Optimize Images**: Always use the `<Image>` component from `next/image` for automatic optimization, resizing, and lazy loading.
2.  **Lazy-Load Heavy Components**: Use `dynamic()` from `next/dynamic` to load large components (like maps or complex charts) only when they are needed.

### Accessibility

1.  **Use Semantic HTML**: Use HTML tags for their correct purpose (`<nav>`, `<button>`, `<main>`, etc.). This is the foundation of accessibility.
2.  **Add ARIA Attributes**: Use attributes like `aria-label` to give screen reader users context for elements like icon-only buttons.
3.  **Ensure Keyboard Navigation**: All interactive elements must be reachable and usable with the Tab key. Focus states should be clearly visible.

## Simple Example

This example combines several core concepts. A **Server Component** (`TripPage`) fetches data and passes it to a **Client Component** (`TripDetails`), which manages its own state, uses an accessible button, and lazy-loads a map.

### Server Component
```tsx
// app/trips/[id]/page.tsx
import { getTrip } from '@/lib/data';
import { TripDetails } from '@/components/TripDetails';

export default async function TripPage({ params }) {
  // 1. Data is fetched on the server
  const trip = await getTrip(params.id);

  return (
    <div>
      <h1>Trip Details</h1>
      {/* 2. Data is passed as props to a Client Component */}
      <TripDetails trip={trip} />
    </div>
  );
}
```

### Client Component
```tsx
// components/TripDetails.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

// 3. Lazy-load the map component for better performance
const TripMap = dynamic(() => import('@/components/TripMap'), {
  loading: () => <p>Loading map...</p>,
});

export function TripDetails({ trip }) {
  // 4. Manage simple local state with useState
  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      <h2>{trip.title}</h2>
      <p>{trip.destination}</p>
      
      <button 
        onClick={() => setShowMap(!showMap)} 
        className={styles.button}
        // 5. Add ARIA label for accessibility
        aria-label="Toggle map view"
      >
        <MapPin className={styles.icon} aria-hidden="true" />
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>

      {showMap && <TripMap location={trip.location} />}
    </div>
  );
}

const styles = {
  button: "flex items-center gap-2 bg-royal-purple text-parchment-white px-4 py-2 rounded-md",
  icon: "w-5 h-5"
};
```

## Checklist

- [ ] Chose the right component type (Server vs. Client)?
- [ ] Is state managed effectively (local, lifted, or context)?
- [ ] Are images optimized with `next/image`?
- [ ] Are heavy components lazy-loaded?
- [ ] Is the HTML semantic and accessible (ARIA, keyboard navigation)?
