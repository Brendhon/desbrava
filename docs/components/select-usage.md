# Select Component

A customizable select component built on the same foundation as the Input component, providing consistent styling and behavior across the application.

## Features

- **TypeScript Support**: Fully typed with comprehensive interfaces
- **React Hook Form Integration**: Seamless integration via `register` prop
- **Icon Support**: Optional left or right positioned icons
- **Multiple Sizes**: `sm`, `md`, `lg` variants
- **State Variants**: `default`, `error`, `success` states
- **Accessibility**: Proper labeling and ARIA attributes
- **Performance**: Memoized styles and IDs

## Props

| Prop           | Type                                | Default     | Description                                                                 |
| -------------- | ----------------------------------- | ----------- | --------------------------------------------------------------------------- |
| `label`        | `ReactNode`                         | -           | Label content displayed above the select (can be string or React component) |
| `error`        | `string`                            | -           | Error message displayed below the select                                    |
| `size`         | `'sm' \| 'md' \| 'lg'`              | `'md'`      | Size variant of the select                                                  |
| `variant`      | `'default' \| 'error' \| 'success'` | `'default'` | Visual variant of the select                                                |
| `register`     | `UseFormRegisterReturn`             | -           | React Hook Form register object                                             |
| `helperText`   | `string`                            | -           | Helper text displayed below the select                                      |
| `className`    | `string`                            | `''`        | Additional CSS classes                                                      |
| `id`           | `string`                            | -           | Custom ID for the select element                                            |
| `options`      | `SelectOption[]`                    | -           | Array of select options                                                     |
| `placeholder`  | `string`                            | -           | Placeholder text for the select                                             |
| `icon`         | `React.ComponentType`               | -           | Optional icon component                                                     |
| `iconPosition` | `'left' \| 'right'`                 | `'left'`    | Position of the optional icon                                               |

## SelectOption Interface

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Usage Examples

### Basic Select

```tsx
import Select from '@/components/form/Select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

<Select
  label="Choose an option"
  options={options}
  placeholder="Select an option"
/>;
```

### With React Component Label

```tsx
import { Globe, Info } from 'lucide-react';

<Select
  label={
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <span>Country</span>
      <Info className="h-4 w-4 text-gray-400" />
    </div>
  }
  options={options}
  placeholder="Select a country"
/>;
```

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import Select from '@/components/form/Select';

const { register } = useForm();

const options = [
  { value: 'country1', label: 'Brazil' },
  { value: 'country2', label: 'Argentina' },
  { value: 'country3', label: 'Chile' },
];

<Select
  label="Country"
  options={options}
  placeholder="Select a country"
  register={register('country')}
/>;
```

### With Icon and Error State

```tsx
import { Globe } from 'lucide-react';
import Select from '@/components/form/Select';

<Select
  label="Country"
  options={options}
  icon={Globe}
  iconPosition="left"
  error="Please select a country"
  variant="error"
/>;
```

### Different Sizes

```tsx
<Select
  label="Small Select"
  size="sm"
  options={options}
/>

<Select
  label="Large Select"
  size="lg"
  options={options}
/>
```

### With Disabled Options

```tsx
const options = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive', disabled: true },
  { value: 'pending', label: 'Pending' },
];

<Select label="Status" options={options} />;
```

## CSS Classes

The component uses the following CSS classes that should be defined in your global styles:

- `form-input-base` - Base input styles
- `form-input-size-{size}` - Size-specific styles
- `form-input-variant-{variant}` - Variant-specific styles
- `form-input-padding-left-icon` - Left icon padding
- `form-input-padding-right-icon` - Right icon padding
- `form-select-base` - Select-specific styles
- `form-select-dropdown-icon` - Dropdown arrow styles
- `form-label` - Label styles
- `form-error` - Error message styles
- `form-helper-text` - Helper text styles

## Accessibility

- Proper `label` association via `htmlFor`
- Error messages with `role="alert"`
- Icon elements marked as `aria-hidden="true"`
- Dropdown arrow icon positioned with `pointer-events-none`

## Performance Considerations

- All styles are memoized to prevent unnecessary recalculations
- Unique IDs are generated only when needed
- Component uses `forwardRef` for optimal ref handling
