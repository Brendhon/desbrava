# DatePicker Component

A custom date picker component built with `react-day-picker` that supports Brazilian date format (dd/MM/yyyy).

## Features

- 📅 Brazilian date format (dd/MM/yyyy)
- 🎨 Consistent with project design system using CSS variables
- 📱 Responsive design with multiple sizes
- ♿ Accessible with proper ARIA labels
- 🔧 Integrates with React Hook Form
- 🌍 Portuguese (Brazil) localization
- ✨ Multiple variants (default, error, success)
- 🎨 Custom styling using DayPicker CSS variables

## Installation

The component uses these dependencies:
- `react-day-picker` - Calendar functionality with custom CSS variables
- `date-fns` - Date manipulation and formatting
- `lucide-react` - Icons

## Basic Usage

```tsx
import DatePicker from '@/components/form/DatePicker';

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <DatePicker
      label="Data de Nascimento"
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="dd/MM/aaaa"
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label displayed above the input |
| `error` | `string` | - | Error message to display |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the input |
| `variant` | `'default' \| 'error' \| 'success'` | `'default'` | Visual variant of the input |
| `register` | `UseFormRegisterReturn` | - | React Hook Form register object |
| `helperText` | `string` | - | Helper text displayed below the input |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | - | Input ID (auto-generated if not provided) |
| `placeholder` | `string` | `'dd/MM/aaaa'` | Placeholder text |
| `value` | `string` | - | Controlled value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `popupPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Position of the calendar popup relative to the input |

## Size Variants

### Small (`sm`)
```tsx
<DatePicker size="sm" label="Data Pequena" />
```

### Medium (`md`) - Default
```tsx
<DatePicker size="md" label="Data Média" />
```

### Large (`lg`)
```tsx
<DatePicker size="lg" label="Data Grande" />
```

## Variants

### Default
```tsx
<DatePicker variant="default" label="Data Padrão" />
```

### Error
```tsx
<DatePicker 
  variant="error" 
  label="Data com Erro"
  error="Data inválida"
/>
```

### Success
```tsx
<DatePicker 
  variant="success" 
  label="Data com Sucesso"
  helperText="Data confirmada"
/>
```

## Popup Position

The `popupPosition` prop controls where the calendar popup appears relative to the input field. This is useful for optimizing space usage in different layouts.

### Bottom (Default)
```tsx
<DatePicker popupPosition="bottom" label="Data com Popup Abaixo" />
```
The popup appears below the input field.

### Top
```tsx
<DatePicker popupPosition="top" label="Data com Popup Acima" />
```
The popup appears above the input field. Useful when there's limited space below.

### Left
```tsx
<DatePicker popupPosition="left" label="Data com Popup à Esquerda" />
```
The popup appears to the left of the input field. Useful for right-aligned forms.

### Right
```tsx
<DatePicker popupPosition="right" label="Data com Popup à Direita" />
```
The popup appears to the right of the input field. Useful for left-aligned forms.

**Note**: The component automatically adjusts positioning to ensure the popup remains visible within the viewport.

## React Hook Form Integration

```tsx
import { useForm } from 'react-hook-form';
import DatePicker from '@/components/form/DatePicker';

const MyForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DatePicker
        label="Data de Nascimento"
        register={register('birthDate')}
        placeholder="dd/MM/aaaa"
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
```

## Controlled Component

```tsx
const [selectedDate, setSelectedDate] = useState<string>('');

<DatePicker
  label="Data Selecionada"
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="dd/MM/aaaa"
/>
```

## Accessibility

- Proper ARIA labels for the calendar button
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Click outside to close functionality

## Styling

The component uses a hybrid approach combining:

### Form Base Classes
- `.form-input-base` - Base input styles
- `.form-input-size-*` - Size variants (sm, md, lg)
- `.form-input-variant-*` - Visual variants (default, error, success)
- `.form-input-padding-right-icon` - Padding for right icon

### DayPicker CSS Variables
The calendar styling is controlled through CSS variables defined in `app/globals.css`:

```css
.rdp-root {
  --rdp-accent-color: #8443a4; /* royal-purple */
  --rdp-background-color: #0d1b2a; /* midnight-blue */
  --rdp-color: #e0e1dd; /* parchment-white */
  --rdp-today-color: #8443a4; /* royal-purple */
  --rdp-selected-color: #ffffff;
  --rdp-selected-background-color: #8443a4; /* royal-purple */
  /* ... more variables */
}
```

### Container Classes
- `.datepicker-container` - Main container
- `.datepicker-popup` - Calendar popup wrapper
- `.datepicker-calendar` - Calendar container

## Customization

You can customize the appearance by:

1. **Modifying CSS variables** in `app/globals.css` under `.rdp-root`
2. **Using form base classes** for consistent input styling
3. **Passing custom `className`** prop for additional styles
4. **Overriding specific styles** using Tailwind utilities

### CSS Variables Reference

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `--rdp-accent-color` | Primary accent color | `#8443a4` |
| `--rdp-background-color` | Calendar background | `#0d1b2a` |
| `--rdp-color` | Text color | `#e0e1dd` |
| `--rdp-today-color` | Today's date color | `#8443a4` |
| `--rdp-selected-color` | Selected date text | `#ffffff` |
| `--rdp-selected-background-color` | Selected date background | `#8443a4` |

## Examples

See `components/form/DatePickerExample.tsx` for comprehensive usage examples including all variants and sizes.

## Notes

- The component automatically formats dates to dd/MM/yyyy format
- Dates are parsed and validated as you type
- The calendar popup closes when clicking outside or selecting a date
- The component is fully responsive and follows the project's design system
- Styling is consistent with other form components using the same base classes
- Calendar appearance is controlled through DayPicker CSS variables for easy theming
- The `popupPosition` prop allows flexible positioning of the calendar popup
- Popup positioning automatically adapts to available space in the viewport