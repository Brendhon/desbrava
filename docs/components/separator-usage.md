# Separator Component

A reusable horizontal separator component that provides consistent visual separation between content sections.

## Usage

```tsx
import { Separator } from '@/components/layout';

// Default separator (matches dashboard style)
<Separator />

// Thin separator with less spacing
<Separator variant="thin" />

// Thick separator with more spacing
<Separator variant="thick" />

// Custom styling
<Separator className="border-blue-500 my-12" />
```

## Props

| Prop        | Type                             | Default     | Description                          |
| ----------- | -------------------------------- | ----------- | ------------------------------------ |
| `className` | `string`                         | `''`        | Additional CSS classes to apply      |
| `variant`   | `'default' \| 'thin' \| 'thick'` | `'default'` | Predefined spacing and border styles |

## Variants

- **default**: `my-8 border-mist-gray/40` - Standard spacing (32px) with medium gray border
- **thin**: `my-4 border-mist-gray/40` - Reduced spacing (16px) with lighter gray border
- **thick**: `my-12 border-mist-gray/40` - Increased spacing (48px) with darker gray border

## Examples

### Basic Usage

```tsx
<div>
  <h2>Section Title</h2>
  <p>Content here...</p>
  <Separator />
  <h2>Next Section</h2>
  <p>More content...</p>
</div>
```

### With Custom Styling

```tsx
<Separator variant="thin" className="border-dashed border-blue-400" />
```

## Notes

- The component uses Tailwind CSS utility classes
- All variants include `border-t` as the base style
- Custom classes are appended to allow for additional customization
- The default variant matches the separator style used in the dashboard page
