# DangerZone Component

A reusable component for displaying dangerous actions that require user confirmation.

## Usage

```tsx
import { DangerZone } from '@/components/settings';
import { Trash2 } from 'lucide-react';

<DangerZone
  icon={Trash2}
  title="Zona de Perigo"
  description="Excluir permanentemente esta viagem e todos os seus dados associados"
  warningText="Esta ação é irreversível e excluirá todos os dados da viagem"
  actionLabel="Excluir Viagem"
  onAction={handleDelete}
  isLoading={false}
  loadingText="Excluindo..."
/>;
```

## Props

| Prop          | Type         | Required | Default            | Description                                         |
| ------------- | ------------ | -------- | ------------------ | --------------------------------------------------- |
| `icon`        | `LucideIcon` | Yes      | -                  | Icon to display in the section header               |
| `title`       | `string`     | Yes      | -                  | Main title of the danger zone section               |
| `description` | `string`     | Yes      | -                  | Description of what the action will do              |
| `warningText` | `string`     | Yes      | -                  | Warning message about the action being irreversible |
| `actionLabel` | `string`     | Yes      | -                  | Text for the action button                          |
| `onAction`    | `() => void` | Yes      | -                  | Function to call when the action button is clicked  |
| `isLoading`   | `boolean`    | No       | `false`            | Whether the action is currently being processed     |
| `loadingText` | `string`     | No       | `"Processando..."` | Text to show when loading                           |

## Features

- **Consistent Design**: Follows the same visual pattern across the application
- **Loading States**: Supports loading states with custom text
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Responsive**: Fully responsive design using Tailwind CSS
- **Customizable**: Configurable icon, text, and actions

## Examples

### Basic Usage

```tsx
<DangerZone
  icon={Trash2}
  title="Delete Account"
  description="Permanently delete your account and all associated data"
  warningText="This action cannot be undone"
  actionLabel="Delete Account"
  onAction={handleDeleteAccount}
/>
```

### With Loading State

```tsx
<DangerZone
  icon={Trash2}
  title="Clear Data"
  description="Remove all your personal data from the system"
  warningText="This will permanently delete all your data"
  actionLabel="Clear Data"
  onAction={handleClearData}
  isLoading={isClearing}
  loadingText="Clearing data..."
/>
```

## Styling

The component uses Tailwind CSS classes and follows the project's design system:

- Dark background with proper shadows
- Red accent colors for danger actions
- Consistent spacing and typography
- Hover effects and transitions

## Best Practices

1. **Clear Warnings**: Always provide clear warning text about irreversible actions
2. **Descriptive Labels**: Use descriptive action labels that clearly indicate what will happen
3. **Loading States**: Implement loading states for actions that take time
4. **Confirmation**: Consider adding additional confirmation dialogs for critical actions
5. **Accessibility**: Ensure proper ARIA labels and keyboard navigation
