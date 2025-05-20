/**
 * Format a date string according to locale
 * @param dateStr - The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format a price amount with currency
 * @param amount - The amount to format
 * @param currencyCode - The currency code (default: USD)
 * @param locale - The locale to use (default: en-US)
 * @returns Formatted price string
 */
export function formatPrice(amount: string, currencyCode: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
} 