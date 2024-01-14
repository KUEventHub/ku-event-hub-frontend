import { format } from "date-fns";

export function formatDate(dateTime: Date) {
  const date = new Date(dateTime);
  const result = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return result;
}

export function formatTime(dateTime: Date) {
  return format(dateTime, "HH:mm น.");
}
