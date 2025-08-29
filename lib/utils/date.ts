import { addDays, format, isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Timestamp } from 'firebase/firestore';

/**
 * Formats a date string to Brazilian Portuguese format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formats a time string to Brazilian Portuguese format
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
}

/**
 * Formats a date and time combination
 */
export function formatDateTime(dateString: string, timeString: string): string {
  const date = new Date(`${dateString}T${timeString}`);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Gets the day of the week in Portuguese
 */
export function getDayOfWeek(dateString: string): string {
  const date = parsePtBrToDate(dateString);
  if (!date) return '';
  return format(date, 'EEEE', { locale: ptBR });
}

/**
 * Gets the month name in Portuguese
 */
export function getMonthName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { month: 'long' });
}

/**
 * Checks if two dates are the same day
 */
export function isSameDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toDateString() === d2.toDateString();
}

/**
 * Gets the number of days between two dates
 */
export function getDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Gets the current date in YYYY-MM-DD format
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Gets the current time in HH:MM format
 */
export function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

/**
 * Parse date from string to Date
 */
export function parsePtBrToDate(date: string | undefined): Date | undefined {
  if (!date) return undefined;
  const parsed = parse(date, 'dd/MM/yyyy', new Date());
  return isValid(parsed) ? parsed : undefined;
}

/**
 * Add days to a date
 */
export function addDaysToDate(
  date: Date | undefined,
  days: number
): Date | undefined {
  if (!date) return undefined;
  return addDays(date, days);
}
/**
 * Parse date from Date to string
 */
export function parseDateToPtBr(date: Date | undefined): string | undefined {
  if (!date) return undefined;
  return format(date, 'dd/MM/yyyy');
}

/**
 * Check if start date is before end date
 */
export function isStartDateBeforeEndDate(
  startDate: string | undefined,
  endDate: string | undefined
): boolean {
  // If start date or end date is not provided, return false
  if (!startDate || !endDate) return false;

  // Get start and end dates
  const start = parsePtBrToDate(startDate);
  const end = parsePtBrToDate(endDate);

  // If start date is before end date, return true
  return !(start && end && start > end);
}

/**
 * Get Firebase timestamp with time
 * @param value - Date or string
 * @param time - Time string
 * @returns Timestamp or null
 */
export const getTimestampWithTime = (value?: string | Date, time?: string): Timestamp | null => {
  // If no date, return null
  if (!value) return null;

  // Get date 
  const date = value instanceof Date ? value : parsePtBrToDate(value);

  // If no date, return null
  if (!date) return null;

  // Get hours and minutes
  const hours = time ? parseInt(time.split(':')[0]) : 0;
  const minutes = time ? parseInt(time.split(':')[1]) : 0;

  // If has time, set time to the date
  date.setHours(hours);
  date.setMinutes(minutes);

  // Return Timestamp
  return Timestamp.fromDate(date);
};