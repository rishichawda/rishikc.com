import { calculateDuration, calculateCompanyDuration, parseDateFromFormat } from '../utils/dateUtils';

export function updateCareerDurations() {
  // Update company durations
  document.querySelectorAll('.company-duration').forEach(element => {
    try {
      const positions = JSON.parse((element as HTMLElement).dataset.positions || '[]');
      const dynamicDuration = calculateCompanyDuration(positions);
      element.textContent = dynamicDuration || "";
    } catch (error) {
      console.warn('Error calculating company duration:', error);
      element.textContent = "";
    }
  });

  // Update position durations
  document.querySelectorAll('.position-duration').forEach(element => {
    try {
      const htmlElement = element as HTMLElement;
      const startDate = htmlElement.dataset.startDate;
      const endDate = htmlElement.dataset.endDate === 'null' ? null : htmlElement.dataset.endDate;
      
      if (startDate) {
        const dynamicDuration = calculateDuration(startDate, endDate);
        if (dynamicDuration) {
          element.textContent = ` (${dynamicDuration})`;
        } else {
          element.textContent = "";
        }
      } else {
        element.textContent = "";
      }
    } catch (error) {
      console.warn('Error calculating position duration:', error);
      element.textContent = "";
    }
  });
}
