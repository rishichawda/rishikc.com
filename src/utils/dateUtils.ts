/**
 * Utility functions for date and duration calculations
 */

/**
 * Calculate the difference between two dates in years and months
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns Object with years and months
 */
function calculateDateDifference(startDate: Date, endDate: Date): { years: number; months: number } {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  
  // Include the current month by adding 1
  // months += 1;
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Handle month overflow
  if (months >= 12) {
    years += Math.floor(months / 12);
    months = months % 12;
  }
  
  return { years, months };
}

/**
 * Format years and months into a human-readable string
 * @param years - Number of years
 * @param months - Number of months
 * @returns A human-readable duration string
 */
function formatDuration(years: number, months: number): string {
  const parts: string[] = [];
  
  if (years > 0) {
    parts.push(`${years} year${years > 1 ? 's' : ''}`);
  }
  
  if (months > 0) {
    parts.push(`${months} month${months > 1 ? 's' : ''}`);
  }
  
  // If both are 0 after calculation, return 1 month as minimum
  if (years === 0 && months === 0) {
    return "1 month";
  }
  
  return parts.join(' ');
}

/**
 * Calculate the duration between start and end dates using MM-YYYY format
 * @param startDate - The start date in format "MM-YYYY" (e.g., "06-2024")
 * @param endDate - Optional end date in format "MM-YYYY" or null for ongoing positions
 * @returns A human-readable duration string (e.g., "1 year 7 months")
 */
export function calculateDuration(startDate: string, endDate: string | null = null): string {
  // Parse start date
  const start = parseDateFromFormat(startDate);
  if (!start) {
    return "";
  }
  
  // Parse end date (use current date if null/ongoing)
  let end: Date;
  if (!endDate) {
    end = new Date();
  } else {
    const parsedEnd = parseDateFromFormat(endDate);
    if (!parsedEnd) {
      return "";
    }
    end = parsedEnd;
  }
  
  // Calculate and format duration
  const { years, months } = calculateDateDifference(start, end);
  return formatDuration(years, months);
}

/**
 * Parse a date string in format "MM-YYYY" to a Date object
 * @param dateString - Date string like "06-2024" or "12-2022"
 * @returns Date object or null if parsing fails
 */
export function parseDateFromFormat(dateString: string): Date | null {
  try {
    // Split the date string by hyphen
    const parts = dateString.trim().split('-');
    if (parts.length !== 2) {
      return null;
    }
    
    const [monthStr, yearStr] = parts;
    const month = parseInt(monthStr, 10) - 1; // Convert to 0-based month
    const year = parseInt(yearStr, 10);
    
    if (isNaN(month) || isNaN(year) || month < 0 || month > 11) {
      return null;
    }
    
    return new Date(year, month, 1);
  } catch (error) {
    return null;
  }
}

/**
 * Calculate duration for company experience based on all positions
 * @param positions - Array of positions with start_date and end_date
 * @returns A human-readable duration string
 */
export function calculateCompanyDuration(positions: Array<{start_date: string, end_date: string | null}>): string {
  if (!positions || positions.length === 0) {
    return "";
  }

  // Find the earliest start date and latest end date
  let earliestStart: Date | null = null;
  let latestEnd: Date | null = null;

  for (const position of positions) {
    const startDate = parseDateFromFormat(position.start_date);
    if (startDate && (!earliestStart || startDate < earliestStart)) {
      earliestStart = startDate;
    }

    let endDate: Date;
    if (!position.end_date) {
      // Ongoing position
      endDate = new Date();
    } else {
      const parsedEnd = parseDateFromFormat(position.end_date);
      if (!parsedEnd) continue;
      endDate = parsedEnd;
    }

    if (!latestEnd || endDate > latestEnd) {
      latestEnd = endDate;
    }
  }

  if (!earliestStart || !latestEnd) {
    return "";
  }

  // Calculate and format duration
  const { years, months } = calculateDateDifference(earliestStart, latestEnd);
  return formatDuration(years, months);
}
