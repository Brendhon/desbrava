# Card Component Usage

The Card component provides a flexible container with various styling options and smooth entrance animations.

## Basic Usage

```tsx
import Card from '@/components/ui/Card';

// Basic card
<Card>
  <h2>Card Content</h2>
  <p>This is a simple card with default styling.</p>
</Card>
```

## Animation Options

The Card component supports several entrance animation types:

### Fade In (Default)
```tsx
<Card animation="fade-in">
  <p>Card appears with a smooth fade-in effect</p>
</Card>
```

### Slide Up
```tsx
<Card animation="slide-up">
  <p>Card slides up from below with fade-in</p>
</Card>
```

### Scale In
```tsx
<Card animation="scale-in">
  <p>Card scales in from 95% to 100% with fade-in</p>
</Card>
```

### Slide Up + Scale
```tsx
<Card animation="slide-up-scale">
  <p>Card combines slide-up and scale effects</p>
</Card>
```

### No Animation
```tsx
<Card animation="none">
  <p>Card appears without animation</p>
</Card>
```

## Staggered Animations

Use delay props to create staggered entrance effects:

```tsx
<div className="space-y-4">
  <Card animation="slide-up" delay="none">
    <p>First card - no delay</p>
  </Card>
  
  <Card animation="slide-up" delay="sm">
    <p>Second card - 100ms delay</p>
  </Card>
  
  <Card animation="slide-up" delay="md">
    <p>Third card - 200ms delay</p>
  </Card>
  
  <Card animation="slide-up" delay="lg">
    <p>Fourth card - 300ms delay</p>
  </Card>
  
  <Card animation="slide-up" delay="xl">
    <p>Fifth card - 500ms delay</p>
  </Card>
</div>
```

## Complete Example with All Props

```tsx
<Card
  padding="lg"
  shadow="xl"
  background="dark"
  maxWidth="lg"
  border={true}
  rounded="xl"
  animation="slide-up-scale"
  delay="md"
  className="hover:shadow-2xl transition-shadow duration-300"
>
  <h2 className="text-2xl font-bold mb-4">Featured Content</h2>
  <p className="text-mist-gray">
    This card demonstrates all available props with enhanced hover effects.
  </p>
</Card>
```

## Animation Details

- **Duration**: All animations use a 700ms duration with ease-out timing
- **Performance**: Animations use CSS transforms and opacity for optimal performance
- **Accessibility**: Animations respect user preferences for reduced motion
- **Customization**: Animation keyframes are defined in `app/globals.css`

## Best Practices

1. **Use staggered delays** for lists of cards to create smooth entrance sequences
2. **Combine with hover effects** for interactive feedback
3. **Consider user preferences** - animations automatically respect reduced motion settings
4. **Performance**: Cards with animations are optimized for smooth 60fps rendering
