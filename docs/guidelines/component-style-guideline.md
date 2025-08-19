# 🎨 Component Style Guidelines

## Overview

How to style components in the Desbrava project using Tailwind CSS.

## Rules

### 1. Use Only Tailwind CSS

- No custom CSS files
- No inline styles
- Only Tailwind utility classes

### 2. Make It Responsive

- Works on all screen sizes
- Use: `sm:`, `md:`, `lg:`, `xl:`

### 3. Use Lucide Icons

- Only icons from `lucide-react`
- Import: `import { IconName } from 'lucide-react'`

### 4. Use Relative Sizing

- **Good**: `w-10`, `h-16`, `p-4`, `m-6`
- **Bad**: `w-[50px]`, `h-[200px]`, `p-[16px]`

## Colors

`bg-midnight-blue`, `bg-slate-dark`, `text-parchment-white`, `text-mist-gray`, `text-royal-purple`

## How to Style

### 1. Create Styles Object

Put this at the end of your component file:

```typescript
const styles = {
  container: 'bg-slate-dark rounded-lg p-6 shadow-lg',
  title: 'text-parchment-white text-2xl font-bold',
  button: 'bg-royal-purple text-parchment-white px-4 py-2 rounded-md',
};
```

### 2. Use in JSX

```tsx
// ✅ Correct
<div className={styles.container}>
  <h1 className={styles.title}>Hello</h1>
  <button className={styles.button}>Click me</button>
</div>

// ❌ Wrong
<div className="bg-slate-dark rounded-lg p-6 shadow-lg">
  <h1 className="text-parchment-white text-2xl font-bold">Hello</h1>
</div>
```

## Simple Example

```tsx
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  liked: boolean;
  onClick: () => void;
}

export function LikeButton({ liked, onClick }: LikeButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      <Heart className={styles.icon} />
      {liked ? 'Liked' : 'Like'}
    </button>
  );
}

const styles = {
  button:
    'flex items-center gap-2 bg-royal-purple text-parchment-white px-4 py-2 rounded-md hover:bg-royal-purple/80',
  icon: 'w-5 h-5',
};
```

## Checklist

- [ ] Uses only Tailwind CSS
- [ ] Responsive design
- [ ] Relative sizing (`w-10`, `h-16`)
- [ ] Lucide icons only
- [ ] Styles in `styles` object
