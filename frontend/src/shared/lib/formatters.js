export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("cs-CZ");
};

export const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString.slice(0, 5);
};
