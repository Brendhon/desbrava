# 🧩 Testing Guidelines

## Overview

How to write tests for the Desbrava project.

## Rules

### 1. Use Jest and React Testing Library

- For unit and integration tests of components, hooks, and utilities, use Jest and `@testing-library/react`.
- Test files should be named `*.test.ts` or `*.test.tsx`.

### 2. Test Behavior, Not Implementation

- Your tests should check what the user sees and can do.
- Find elements by text, label, or role. Avoid testing internal state or component methods.

### 3. Mock API Calls and Dependencies

- When a component fetches data or uses a service, mock those dependencies in your tests.
- This keeps tests fast and reliable.

### 4. Use Playwright for E2E Tests

- For testing complete user flows from end-to-end (e.g., signing up, creating a trip), use Playwright.
- E2E tests simulate real user interactions in a browser.

## Simple Example (Component Test)

Testing a simple `LikeButton` component.

### Component

```tsx
// components/LikeButton.tsx
'use client';
import { useState } from 'react';

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(true)}>{liked ? 'Liked' : 'Like'}</button>
  );
}
```

### Test

```tsx
// components/LikeButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LikeButton } from './LikeButton';

describe('LikeButton', () => {
  it('should show "Like" initially', () => {
    render(<LikeButton />);

    // Find the button by its text content
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
  });

  it('should show "Liked" after being clicked', () => {
    render(<LikeButton />);

    const button = screen.getByRole('button', { name: 'Like' });

    // Simulate a user click
    fireEvent.click(button);

    // Check that the text changed
    expect(screen.getByRole('button', { name: 'Liked' })).toBeInTheDocument();
  });
});
```

## Checklist

- [ ] Does the component/hook/utility have unit tests?
- [ ] Do tests check user-facing behavior?
- [ ] Are external dependencies mocked?
- [ ] Is there an E2E test for critical user flows?
