export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-KE", {
    timeZone: "Africa/Nairobi",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};