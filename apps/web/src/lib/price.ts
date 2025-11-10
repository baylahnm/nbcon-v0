/**
 * Price Formatting Utilities
 * 
 * Centralized helpers for displaying SAR pricing consistently across the app.
 */

/**
 * Formats SAR price for display
 * @param sar - Price in SAR (null for Custom pricing)
 * @param currency - Currency code (default: "SAR")
 * @returns Formatted price string (e.g., "49 SAR/month" or "Custom")
 */
export function formatSar(sar: number | null, currency: string = "SAR"): string {
  if (sar === null) {
    return "Custom";
  }
  return `${sar} ${currency}/month`;
}

/**
 * Formats price for display without "/month" suffix
 * @param sar - Price in SAR (null for Custom pricing)
 * @param currency - Currency code (default: "SAR")
 * @returns Formatted price string (e.g., "49 SAR" or "Custom")
 */
export function formatSarPrice(sar: number | null, currency: string = "SAR"): string {
  if (sar === null) {
    return "Custom";
  }
  return `${sar} ${currency}`;
}

