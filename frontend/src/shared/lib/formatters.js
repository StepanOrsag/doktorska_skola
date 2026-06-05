/**
 * Formátuje datum z formátu YYYY-MM-DD na český formát D. M. YYYY
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("cs-CZ");
};

/**
 * Formátuje čas z formátu HH:MM:SS na HH:MM
 */
export const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString.slice(0, 5);
};
