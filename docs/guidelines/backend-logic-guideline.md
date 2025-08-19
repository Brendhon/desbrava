# 🔌 Backend Logic Guidelines

## Overview

How to handle server-side logic in the Desbrava project. This includes data fetching and mutations, creating a service layer, handling authentication, and error management.

## Rules

### 1. Use Server Actions for Mutations

- Any function that creates, updates, or deletes data should be a **Server Action**, defined with `'use server'`.
- Client Components can call these actions directly.

### 2. Abstract Data Logic into a Service Layer

- Don't put database or external API calls directly in your Server Actions or Components.
- Create service files (e.g., `services/trip.service.ts`) that contain all your data access logic (e.g., Firebase, Stripe, etc.). This keeps your code organized and easier to test.

### 3. Protect Your Logic

- At the beginning of every Server Action or data fetching service, check for user authentication using `const session = await auth()`.
- If the user is not authenticated, return an authorization error.

### 4. Handle Errors Gracefully

- Wrap all data access and mutation logic in `try...catch` blocks within your service layer.
- Server Actions should not throw errors. Instead, they should catch them and return a structured object, like `{ success: false, error: 'A user-friendly error message' }`.

### 5. Revalidate Cache on Success

- After a successful mutation in a Server Action, use `revalidatePath()` or `revalidateTag()` to ensure the new data is displayed to the user.

## Comprehensive Example

This example shows a complete flow for creating a new trip, including the service, the action, and the client-side form.

### 1. Service Layer (Interacting with Firebase)

This function contains the actual database logic.

```typescript
// services/firebase/trip.service.ts
import { db } from '@/lib/firebase'; // Your initialized Firebase instance
import { collection, addDoc } from 'firebase/firestore';

export async function createTripInFirestore(tripData: {
  title: string;
  userId: string;
}) {
  try {
    await addDoc(collection(db, 'trips'), {
      ...tripData,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Firestore error creating trip:', error);
    // Throw an error to be caught by the Server Action
    throw new Error('Failed to save trip to the database.');
  }
}
```

### 2. Server Action (The Orchestrator)

This action orchestrates the validation, authentication, and data mutation call.

```typescript
// app/trips/actions.ts
'use server';

import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { createTripInFirestore } from '@/services/firebase/trip.service';

export async function createTripAction(formData: FormData) {
  // A. Authenticate the user
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'You must be logged in to create a trip.' };
  }

  const title = formData.get('title') as string;
  if (!title) {
    return { success: false, error: 'Title is required.' };
  }

  try {
    // B. Call the service to interact with the database
    await createTripInFirestore({ title, userId: session.user.id });

    // C. Revalidate the cache on success
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    // D. Return a user-friendly error
    return { success: false, error: error.message };
  }
}
```

### 3. Client Component (The UI)

This form calls the Server Action and handles the response.

```tsx
// components/CreateTripForm.tsx
'use client';

import { useState } from 'react';
import { createTripAction } from '@/app/trips/actions';

export function CreateTripForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await createTripAction(formData);
    if (!result.success) {
      setError(result.error);
    } else {
      setError(null);
      // Optionally reset the form
    }
  };

  return (
    <form action={handleSubmit} className={styles.form}>
      <input
        name="title"
        placeholder="New trip title"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Create
      </button>
      {error && <p className={styles.errorText}>{error}</p>}
    </form>
  );
}

const styles = {
  form: 'flex gap-2',
  input: 'border p-2 rounded-md',
  button: 'bg-royal-purple text-parchment-white px-4 py-2 rounded-md',
  errorText: 'text-red-500',
};
```

## Checklist

- [ ] Is data logic abstracted into a service?
- [ ] Is the mutation a Server Action?
- [ ] Is the action protected with an auth check?
- [ ] Does the action return a `{ success, error }` object?
- [ ] Is the cache revalidated on success?
