# Toast Component

## Overview

The Toast component provides a notification system for displaying success, error, warning, and info messages to users. It includes smooth animations and auto-dismiss functionality.

## Features

- **Multiple Types**: Success, Error, Warning, and Info
- **Auto-dismiss**: Configurable duration (default: 5 seconds)
- **Smooth Animations**: Slide-in from right with Tailwind CSS
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: ARIA labels and keyboard navigation
- **Dark Theme**: Optimized for dark theme with consistent styling

## Usage

### Basic Usage

```tsx
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { success, error, warning, info } = useToast();

  const handleSuccess = () => {
    success('Success Title', 'Operation completed successfully');
  };

  const handleError = () => {
    error('Error Title', 'Something went wrong');
  };

  const handleWarning = () => {
    warning('Warning Title', 'Please review your input');
  };

  const handleInfo = () => {
    info('Info Title', 'Here is some information');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleWarning}>Show Warning</button>
      <button onClick={handleInfo}>Show Info</button>
    </div>
  );
}
```

### Custom Duration

```tsx
const { success } = useToast();

// Show toast for 10 seconds
success('Custom Duration', 'This toast will show for 10 seconds', 10000);

// Show toast indefinitely (no auto-dismiss)
success('No Auto-dismiss', 'This toast will stay until manually closed', 0);
```

### Manual Control

```tsx
const { success, removeToast, clearToasts } = useToast();

// Remove specific toast
const toastId = 'some-toast-id';
removeToast(toastId);

// Clear all toasts
clearToasts();
```

## API Reference

### useToast Hook

Returns an object with the following methods:

- `success(title: string, description: string, duration?: number)`: Show success toast
- `error(title: string, description: string, duration?: number)`: Show error toast
- `warning(title: string, description: string, duration?: number)`: Show warning toast
- `info(title: string, description: string, duration?: number)`: Show info toast
- `removeToast(id: string)`: Remove specific toast by ID
- `clearToasts()`: Remove all active toasts

### Toast Types

```tsx
type ToastType = 'success' | 'error' | 'warning' | 'info';
```

### Toast Interface

```tsx
interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description: string;
  duration?: number;
  createdAt: Date;
}
```

## Styling

The Toast component uses Tailwind CSS classes and follows the project's design system:

- **Success**: Green theme with CheckCircle icon
- **Error**: Red theme with AlertCircle icon
- **Warning**: Yellow theme with AlertTriangle icon
- **Info**: Blue theme with Info icon

## Animation

Toasts animate in from the right side of the screen using CSS transforms:

- **Entrance**: `translate-x-0` with opacity fade-in
- **Exit**: `translate-x-full` with opacity fade-out
- **Duration**: 300ms with `ease-in-out` timing

## Accessibility

- **ARIA Labels**: Proper `role="alert"` and `aria-live` attributes
- **Keyboard Navigation**: Close button is focusable
- **Screen Readers**: Descriptive text and icons
- **Color Contrast**: Meets WCAG accessibility standards

## Implementation Details

The Toast system consists of:

1. **ToastContext**: Manages global toast state
2. **useToast Hook**: Provides easy-to-use API
3. **Toast Component**: Individual toast display
4. **ToastContainer**: Renders all active toasts
5. **ToastProvider**: Wraps the app for context access

## Best Practices

1. **Keep titles short**: Use concise, action-oriented titles
2. **Descriptive messages**: Provide clear context in descriptions
3. **Appropriate duration**: Use longer durations for important messages
4. **Consistent usage**: Use the same toast types across the application
5. **Avoid spam**: Don't show too many toasts simultaneously

## Examples

### Form Submission

```tsx
const { success, error } = useToast();

const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    success('Form Submitted', 'Your information has been saved successfully');
  } catch (err) {
    error('Submission Failed', 'Please check your input and try again');
  }
};
```

### API Operations

```tsx
const { success, error, info } = useToast();

const handleDelete = async (id) => {
  info('Deleting...', 'Please wait while we process your request');

  try {
    await deleteItem(id);
    success('Item Deleted', 'The item has been removed successfully');
  } catch (err) {
    error('Delete Failed', 'Unable to delete the item. Please try again.');
  }
};
```
