import { isAfter, parse } from "date-fns";

export function isStartDateAfterEndDate(startDate: string, endDate: string) {
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();
  return isAfter(startDateTime, endDateTime);
}

export function isStartTimeAfterEndTime(
  startTime: string,
  endTime: string,
  startDate: string,
  endDate: string
) {
  const startDateTime = parse(startTime, "HH:mm", new Date(startDate));
  const endDateTime = parse(endTime, "HH:mm", new Date(endDate));
  return isAfter(startDateTime, endDateTime);
}
