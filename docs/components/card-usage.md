# Card Component Usage

## Overview

The `Card` component is a flexible, reusable UI component that provides consistent styling for content containers throughout the Desbrava application.

## Import

```tsx
import { Card } from '@/components/ui';
```

## Props

| Prop         | Type                                                                 | Default  | Description                             |
| ------------ | -------------------------------------------------------------------- | -------- | --------------------------------------- |
| `children`   | `React.ReactNode`                                                    | -        | Content to be displayed inside the card |
| `className`  | `string`                                                             | `''`     | Additional CSS classes to apply         |
| `padding`    | `'sm' \| 'md' \| 'lg' \| 'xl'`                                       | `'lg'`   | Internal padding size                   |
| `shadow`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                    | `'lg'`   | Shadow depth                            |
| `background` | `'dark' \| 'light'`                                                  | `'dark'` | Background color theme                  |
| `maxWidth`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full' \| '7xl'` | `'none'` | Maximum width constraint                |
| `border`     | `boolean`                                                            | `true`   | Whether to show border                  |
| `rounded`    | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                              | `'lg'`   | Border radius size                      |

## Padding Options

- `sm`: `p-4` (16px)
- `md`: `p-6` (24px)
- `lg`: `p-8` (32px)
- `xl`: `p-6 md:p-8` (24px on mobile, 32px on desktop)

## Shadow Options

- `none`: No shadow
- `sm`: `shadow-sm` (minimal shadow)
- `md`: `shadow-md` (medium shadow)
- `lg`: `shadow-lg` (large shadow)
- `xl`: `shadow-xl` (extra large shadow)
- `2xl`: `shadow-2xl` (maximum shadow)

## Background Options

- `dark`: `bg-slate-dark` (dark theme)
- `light`: `bg-parchment-white` (light theme)

## MaxWidth Options

- `none`: No width constraint
- `sm`: `max-w-sm` (384px)
- `md`: `max-w-md` (448px)
- `lg`: `max-w-lg` (512px)
- `xl`: `max-w-xl` (576px)
- `2xl`: `max-w-2xl` (672px)
- `full`: `max-w-full` (100%)
- `7xl`: `max-w-7xl` (1280px)

## Rounded Options

- `sm`: `rounded` (4px)
- `md`: `rounded-md` (6px)
- `lg`: `rounded-lg` (8px)
- `xl`: `rounded-xl` (12px)
- `2xl`: `rounded-2xl` (16px)

## Usage Examples

### Basic Card

```tsx
<Card>
  <h2>Basic Card</h2>
  <p>This is a basic card with default styling.</p>
</Card>
```

### Form Container

```tsx
<Card padding="xl" shadow="lg" background="dark" maxWidth="none" border={false}>
  <form>{/* Form content */}</form>
</Card>
```

### Statistics Card

```tsx
<Card
  padding="md"
  shadow="lg"
  background="dark"
  maxWidth="none"
  border={false}
  className="flex items-center gap-4"
>
  <div className="bg-royal-purple flex h-12 w-12 items-center justify-center rounded-lg">
    <MapPin className="text-parchment-white h-6 w-6" />
  </div>
  <div>
    <h3 className="text-parchment-white text-3xl font-bold">0</h3>
    <p className="text-mist-gray">Viagens Criadas</p>
  </div>
</Card>
```

### Info Card

```tsx
<Card
  padding="sm"
  shadow="none"
  background="dark"
  maxWidth="none"
  border={false}
  className="flex items-center gap-3"
>
  <Globe className="text-royal-purple h-5 w-5" />
  <div>
    <p className="text-mist-gray text-sm">País</p>
    <p className="text-parchment-white font-medium">França</p>
  </div>
</Card>
```

### Section Container

```tsx
<Card padding="xl" shadow="lg" background="dark" maxWidth="none" border={false}>
  <div className="mb-6 flex items-center gap-3">
    <User className="text-royal-purple h-6 w-6" />
    <h2 className="text-parchment-white text-xl font-semibold">Perfil</h2>
  </div>
  {/* Section content */}
</Card>
```

## Best Practices

1. **Use appropriate padding**: Choose padding based on content density
2. **Consider shadows**: Use `none` for subtle cards, `lg` for prominent ones
3. **MaxWidth constraints**: Use `none` for full-width content, specific sizes for contained content
4. **Border control**: Set `border={false}` when you want a cleaner look
5. **Responsive padding**: Use `xl` padding for forms and sections that need more space on desktop

## Migration from Custom Cards

When migrating from custom card implementations:

1. Replace `<div className="bg-slate-dark rounded-lg p-6">` with `<Card padding="md" background="dark">`
2. Remove background and padding classes from styles
3. Keep layout-specific classes (flex, gap, etc.) in the `className` prop
4. Use appropriate shadow and border settings for the context

## Accessibility

The Card component is a semantic `div` element that can be enhanced with ARIA attributes as needed:

```tsx
<Card
  padding="lg"
  background="dark"
  className="focus-within:ring-royal-purple focus-within:ring-2"
  role="region"
  aria-labelledby="card-title"
>
  <h2 id="card-title">Card Title</h2>
  {/* Content */}
</Card>
```
