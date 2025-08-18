# 🎨 Component Style Guidelines - Desbrava

## Overview

This document outlines the styling standards and patterns for all components in the Desbrava project. Follow these guidelines to maintain consistency and ensure optimal user experience.

## Core Styling Principles

### 1. Tailwind CSS Only
- Use **exclusively** Tailwind CSS utility classes for all styling
- No custom CSS files or global styles modifications
- No inline styles or CSS-in-JS solutions

### 2. Responsive Design
- Every component must be **fully responsive**
- Adapt smoothly to all screen sizes (mobile, tablet, desktop)
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)

### 3. Icon Usage
- Use **only** icons from the `lucide-react` library
- No other icon sets are permitted
- Import icons directly: `import { IconName } from 'lucide-react'`

### 4. Animations & Transitions
- Rely **solely** on Tailwind CSS built-in classes
- Use `transition-*`, `animate-*`, and `hover:*` utilities
- No custom keyframes or CSS animations

## Color Palette Integration

### Primary Colors
- **Background**: `bg-midnight-blue` (`#0D1B2A`)
- **Secondary Background**: `bg-slate-dark` (`#1B263B`)
- **Primary Text**: `text-parchment-white` (`#E0E1DD`)
- **Secondary Text**: `text-mist-gray` (`#A9B4C2`)
- **Accent**: `text-royal-purple` (`#8443A4`)

### Semantic Classes
- `bg-primary` → `bg-midnight-blue`
- `bg-secondary` → `bg-slate-dark`
- `bg-accent` → `bg-royal-purple`
- `text-text-primary` → `text-parchment-white`
- `text-text-secondary` → `text-mist-gray`

## Component Style Organization

### Styles Constant Pattern
Every component must define a `styles` constant at the end of the file:

```typescript
const styles = {
  container: "bg-secondary rounded-lg p-6 shadow-lg",
  title: "text-text-primary text-2xl font-bold mb-4",
  button: "bg-accent text-text-primary px-4 py-2 rounded-md hover:bg-accent/80 transition-colors"
};
```

### Usage in JSX
Reference styles via the `styles` object instead of inline classes:

```tsx
// ✅ Correct
<div className={styles.container}>
  <h2 className={styles.title}>Title</h2>
  <button className={styles.button}>Action</button>
</div>

// ❌ Incorrect
<div className="bg-secondary rounded-lg p-6 shadow-lg">
  <h2 className="text-text-primary text-2xl font-bold mb-4">Title</h2>
  <button className="bg-accent text-text-primary px-4 py-2 rounded-md">Action</button>
</div>
```

## Common Component Patterns

### Buttons
- **Primary**: `bg-accent text-text-primary px-4 py-2 rounded-md hover:bg-accent/80 transition-colors`
- **Secondary**: `bg-secondary text-text-primary border border-accent px-4 py-2 rounded-md hover:bg-accent/10 transition-colors`
- **Outline**: `bg-transparent text-accent border border-accent px-4 py-2 rounded-md hover:bg-accent/10 transition-colors`

### Cards
- **Container**: `bg-secondary rounded-lg p-6 shadow-lg border border-mist-gray/20`
- **Header**: `border-b border-mist-gray/20 pb-4 mb-4`
- **Content**: `text-text-secondary leading-relaxed`

### Forms
- **Input**: `bg-secondary border border-mist-gray/30 rounded-md px-3 py-2 text-text-primary focus:border-accent focus:outline-none transition-colors`
- **Label**: `text-text-primary font-medium mb-2 block`
- **Error**: `text-red-400 text-sm mt-1`

## Responsive Patterns

### Mobile-First Approach
```typescript
const styles = {
  container: "p-4 md:p-6 lg:p-8",
  grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
  text: "text-sm md:text-base lg:text-lg"
};
```

### Breakpoint Strategy
- `sm:` (640px+) - Small tablets
- `md:` (768px+) - Tablets
- `lg:` (1024px+) - Desktops
- `xl:` (1280px+) - Large desktops

## Accessibility Considerations

- Ensure sufficient color contrast ratios
- Use semantic HTML elements
- Provide focus indicators for interactive elements
- Test with screen readers and keyboard navigation

## Example Component

```tsx
import { MapPin, Calendar, Users } from 'lucide-react';

interface TripCardProps {
  title: string;
  location: string;
  date: string;
  participants: number;
}

export function TripCard({ title, location, date, participants }: TripCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <div className={styles.content}>
        <div className={styles.infoRow}>
          <MapPin className={styles.icon} />
          <span className={styles.text}>{location}</span>
        </div>
        
        <div className={styles.infoRow}>
          <Calendar className={styles.icon} />
          <span className={styles.text}>{date}</span>
        </div>
        
        <div className={styles.infoRow}>
          <Users className={styles.icon} />
          <span className={styles.text}>{participants} participants</span>
        </div>
      </div>
      
      <button className={styles.button}>
        View Details
      </button>
    </div>
  );
}

const styles = {
  container: "bg-secondary rounded-lg p-6 shadow-lg border border-mist-gray/20 hover:shadow-xl transition-shadow",
  header: "border-b border-mist-gray/20 pb-4 mb-4",
  title: "text-text-primary text-xl font-bold",
  content: "space-y-3 mb-6",
  infoRow: "flex items-center gap-3",
  icon: "text-accent w-5 h-5",
  text: "text-text-secondary",
  button: "w-full bg-accent text-text-primary py-2 px-4 rounded-md hover:bg-accent/80 transition-colors font-medium"
};
```
