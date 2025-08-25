import { LucideIcon } from 'lucide-react';
import { ActivityProps, ReactNode } from 'react';
import { ActivityTypeKey } from './activity';
import { Place, PlaceSearchType } from './places';
import { ActivityTypeData } from '@/components/activity/ActivityTypeSelector';

// Interface for select options
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  item?: ReactNode;
}

// Base interface for common form field properties
export interface BaseFieldProps {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  helperText?: string;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

// Interface for form components that support icon actions
export interface IconActionProps {
  iconAction?: () => void | null;
}

// Interface for form components that use react-hook-form
export interface FormRegisterProps {
  register?: any; // UseFormRegisterReturn from react-hook-form
}

// Interface for components that need an ID
export interface IdProps {
  id?: string;
}

// Interface for components that support placeholder
export interface PlaceholderProps {
  placeholder?: string;
}

// Interface for components that support disabled state
export interface DisabledProps {
  disabled?: boolean;
}

// Complete interface for Field component
export interface FieldProps extends BaseFieldProps, IconActionProps {
  idPrefix?: string;
  children: React.ReactNode;
}

// Complete interface for Input component
export interface InputProps
  extends BaseFieldProps,
    IconActionProps,
    FormRegisterProps {
  [key: string]: any; // Allow additional HTML input attributes
}

// Complete interface for Textarea component
export interface TextareaProps extends BaseFieldProps, FormRegisterProps {
  [key: string]: any; // Allow additional HTML textarea attributes
}

// Complete interface for Select component
export interface SelectProps extends BaseFieldProps, FormRegisterProps {
  options: SelectOption[];
  placeholder?: string;
  [key: string]: any; // Allow additional HTML select attributes
}

// Complete interface for SearchSelect component
export interface SearchSelectProps
  extends BaseFieldProps,
    FormRegisterProps,
    IdProps,
    PlaceholderProps {
  options: SelectOption[];
  defaultValue?: SelectOption;
  icon?: LucideIcon;
  position?: 'top' | 'bottom';
  onInputChange?: (value: string) => void;
  onSelect?: (value: SelectOption) => void;
  onClear?: () => void; // Callback when input is cleared
  [key: string]: any; // Allow additional HTML input attributes
}

// Complete interface for DatePicker component
export interface DatePickerProps
  extends BaseFieldProps,
    FormRegisterProps,
    IdProps,
    PlaceholderProps,
    DisabledProps {
  value: string;
  defaultValue?: string;
  popupPosition?: 'top' | 'bottom' | 'left' | 'right';
  minDate?: Date;
  maxDate?: Date;
}

// Complete interface for CountrySearchSelect component
export interface CountrySearchSelectProps
  extends BaseFieldProps,
    FormRegisterProps,
    IdProps,
    PlaceholderProps {
  defaultValue?: string; // Country code
}

// Complete interface for PlaceSearchSelect component
export interface PlaceSearchSelectProps
  extends BaseFieldProps,
    IdProps,
    PlaceholderProps {
  onValueChange?: (value: string) => void;
  debounceDelay?: number;
  defaultValue?: Place;
  activityType?: ActivityTypeData;
  latitude?: number;
  longitude?: number;
  radius?: number;
  maxResults?: number;
}

// Base interface for subtype search select components
export interface SubTypeSearchSelectProps
  extends BaseFieldProps,
    FormRegisterProps,
    IdProps,
    PlaceholderProps {
  activityType?: ActivityTypeKey;
  defaultValue?: PlaceSearchType;
  onSelect?: (option: SelectOption) => void;
}
