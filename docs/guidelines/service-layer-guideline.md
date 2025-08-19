# 🔌 Service Layer Guidelines

## Overview

How to create services in the Desbrava project using Next.js API Routes and TypeScript.

## Rules

### 1. Use Only TypeScript
- No JavaScript files
- No React imports or hooks
- Pure TypeScript modules only

### 2. Follow Directory Structure
- All services in `services/` directory
- Create subdirectories by technology: `api/`, `firebase/`, `database/`
- Use `.service.ts` suffix for all service files
- API Routes in `app/api/` handle external communication

### 3. Use Strict Typing
- All functions must have explicit return types
- Use `Promise<ReturnType>` for async functions
- Import models from `@/models` directory

### 4. Handle Errors Properly
- Wrap external calls in `try...catch`
- Log raw errors with `console.error`
- Throw new `Error` with user-friendly messages

## How to Create Services

### 1. Create Service File
```typescript
import { UserModel } from '@/models/user.model';

interface CreateUserParams {
  name: string;
  email: string;
}

export class UserService {
  async createUser(params: CreateUserParams): Promise<UserModel> {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(params)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('UserService.createUser error:', error);
      throw new Error('Unable to create user. Please try again.');
    }
  }
}
```

### 2. Use in Components
```tsx
// ✅ Server Component
import { UserService } from '@/services/api/user.service';

export async function UserList() {
  const userService = new UserService();
  const users = await userService.getUsers();
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// ✅ Client Component
'use client';
import { UserService } from '@/services/api/user.service';

export function CreateUserForm() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const userService = new UserService();
      await userService.createUser({
        name: formData.get('name') as string,
        email: formData.get('email') as string
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  
  return (
    <form action={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

## API Routes

### Create API Route
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // Call external service or database
    const user = await createUserInDatabase(body);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('API Route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Simple Example

### Service
```typescript
// services/api/trip.service.ts
import { TripModel } from '@/models/trip.model';

export class TripService {
  async getTrips(userId: string): Promise<TripModel[]> {
    try {
      const response = await fetch(`/api/trips?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }
      
      return await response.json();
    } catch (error) {
      console.error('TripService.getTrips error:', error);
      throw new Error('Unable to load trips. Please try again.');
    }
  }
}
```

### API Route
```typescript
// app/api/trips/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Call external API or database
    const trips = await fetchTripsFromExternalAPI(userId);
    
    return NextResponse.json(trips);
  } catch (error) {
    console.error('Trips API Route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trips' },
      { status: 500 }
    );
  }
}
```

## Checklist

- [ ] Uses only TypeScript (no React imports)
- [ ] Follows directory structure (`services/technology/service.service.ts`)
- [ ] Strict typing with explicit return types
- [ ] Proper error handling with try...catch
- [ ] Imports models from `@/models`
- [ ] Services call internal Next.js API Routes (`/api/*`)
- [ ] API Routes handle external communication and validation
