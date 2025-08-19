# LoadingSpinner Component

A reusable loading component with smooth animations and friendly text messages.

## Features

- **Smooth animations** using Tailwind CSS
- **Rotating text messages** that change every 2 seconds
- **Multiple size variants** (sm, md, lg)
- **Color variants** (default, primary, secondary)
- **Progress indicators** with animated dots
- **Responsive design** for all screen sizes

## Usage

```tsx
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Basic usage
<LoadingSpinner />

// With custom size and variant
<LoadingSpinner size="lg" variant="primary" />

// Without text
<LoadingSpinner showText={false} />

// With custom className
<LoadingSpinner className="bg-gray-900" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl'` | `'lg'` | Size of the spinner |
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Color variant |
| `showText` | `boolean` | `true` | Whether to show loading text |
| `className` | `string` | `''` | Additional CSS classes |

## Size Variants

- **sm**: 24px
- **md**: 36px
- **lg**: 48px
- **xl**: 64px
- **2xl**: 80px
- **3xl**: 96px
- **4xl**: 112px
- **5xl**: 128px

## Color Variants

- **default**: Royal purple theme
- **primary**: Blue theme
- **secondary**: Emerald theme

## Text Messages

The component automatically cycles through these friendly messages:

1. "Preparando sua aventura..."
2. "Carregando experiências incríveis..."
3. "Quase lá, só um instante..."
4. "Montando o cenário perfeito..."
5. "Conectando com o universo..."

## Animations

- **Spinner**: Continuous rotation
- **Outer ring**: Pulse effect
- **Inner dot**: Bounce effect
- **Text**: Fade in/out with translation
- **Progress dots**: Scale and color transitions

## Examples

### Full-screen loading
```tsx
<LoadingSpinner size="lg" />
```

### Inline loading
```tsx
<div className="p-4">
  <LoadingSpinner size="sm" showText={false} />
</div>
```

### Custom styling
```tsx
<LoadingSpinner 
  size="md" 
  variant="primary" 
  className="bg-gradient-to-r from-blue-900 to-purple-900"
/>
```
