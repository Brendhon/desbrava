/**
 * String utility functions for handling accents and string comparisons
 */

/**
 * Normalizes a string by removing accents and converting to lowercase
 * @param str - The string to normalize
 * @returns The normalized string without accents
 */
export function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Compares two strings ignoring accents and case
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @returns True if strings are equal after normalization
 */
export function compareStrings(str1: string, str2: string): boolean {
  return normalizeString(str1) === normalizeString(str2);
}

/**
 * Checks if a string contains another string, ignoring accents and case
 * @param text - The text to search in
 * @param searchTerm - The term to search for
 * @returns True if the search term is found in the text
 */
export function containsString(text: string, searchTerm: string): boolean {
  const normalizedText = normalizeString(text);
  const normalizedSearchTerm = normalizeString(searchTerm);
  return normalizedText.includes(normalizedSearchTerm);
}

/**
 * Finds the best match for a search term in an array of strings
 * @param searchTerm - The term to search for
 * @param options - Array of strings to search in
 * @returns The best matching string or null if no match found
 */
export function findBestMatch(
  searchTerm: string,
  options: string[]
): string | null {
  const normalizedSearchTerm = normalizeString(searchTerm);

  // First, try to find exact matches
  const exactMatch = options.find(
    (option) => normalizeString(option) === normalizedSearchTerm
  );
  if (exactMatch) return exactMatch;

  // Then, try to find partial matches
  const partialMatch = options.find((option) =>
    normalizeString(option).includes(normalizedSearchTerm)
  );
  if (partialMatch) return partialMatch;

  // Finally, try to find matches that start with the search term
  const startsWithMatch = options.find((option) =>
    normalizeString(option).startsWith(normalizedSearchTerm)
  );

  return startsWithMatch || null;
}

/**
 * Generates a random ID
 * @returns A random ID
 */
export function generateRandomId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
}
