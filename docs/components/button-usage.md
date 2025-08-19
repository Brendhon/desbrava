# Button Component

A reusable button component that provides consistent styling and behavior across the application.

## Features

- Multiple variants (primary, secondary, danger, ghost)
- Different sizes (sm, md, lg)
- Icon support (left/right positioning)
- External icon support
- Disabled state
- Custom className support
- Accessibility features (aria-label)

## Usage

```tsx
import { Button } from '@/components/ui';
import { Calendar, ExternalLink } from 'lucide-react';

// Basic usage
<Button onClick={handleClick}>
  Click me
</Button>

// With icon
<Button
  variant="primary"
  icon={Calendar}
  onClick={handleClick}
>
  Connect Calendar
</Button>

// With external icon
<Button
  variant="primary"
  icon={Calendar}
  externalIcon={ExternalLink}
  onClick={handleClick}
>
  Connect External Service
</Button>

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Disabled state
<Button disabled onClick={handleClick}>
  Disabled Button
</Button>

// With custom className
<Button className="mx-auto">
  Centered Button
</Button>
```

## Props

| Prop           | Type                                              | Default     | Description             |
| -------------- | ------------------------------------------------- | ----------- | ----------------------- |
| `children`     | `ReactNode`                                       | -           | Button content          |
| `onClick`      | `() => void`                                      | -           | Click handler           |
| `disabled`     | `boolean`                                         | `false`     | Disabled state          |
| `variant`      | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Button style variant    |
| `size`         | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Button size             |
| `icon`         | `LucideIcon`                                      | -           | Icon component          |
| `iconPosition` | `'left' \| 'right'`                               | `'left'`    | Icon position           |
| `externalIcon` | `LucideIcon`                                      | -           | External icon component |
| `className`    | `string`                                          | `''`        | Additional CSS classes  |
| `type`         | `'button' \| 'submit' \| 'reset'`                 | `'button'`  | Button type             |
| `aria-label`   | `string`                                          | -           | Accessibility label     |

## Variants

- **Primary**: Royal purple background with white text
- **Secondary**: Midnight blue background with white text and border
- **Danger**: Red background with white text
- **Ghost**: Transparent background with white text and border

## Sizes

- **Small**: `px-4 py-2 text-sm rounded-md`
- **Medium**: `px-6 py-3 rounded-lg`
- **Large**: `px-8 py-4 text-lg rounded-lg`

## Accessibility

- Supports `aria-label` for screen readers
- Icons are marked as `aria-hidden="true"`
- Proper disabled state handling
- Keyboard navigation support
