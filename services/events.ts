import api from "./api";
import { EventData } from "@/interfaces/Event";

export const getEvents = (pageNumber: number) =>
  api
    .get(`/api/events?pageNumber=${pageNumber}`)
    .then((response) => response.data)
    .catch(() => {
      return null;
    });

export const createEvent = (data: EventData) =>
  api.post("/api/events/create", data).then((response) => response.data);

export const searchEvents = (
  pageNumber: number,
  pageSize: number,
  eventName: string,
  eventType: string,
  sortType: string
) =>
  api
    .get("/api/events", {
      params: {
        pageNumber: pageNumber || undefined,
        pageSize: pageSize || undefined,
        eventName: eventName || undefined,
        eventType: eventType || undefined,
        sortType: sortType || undefined,
      },
    })
    .then((response) => response.data)
    .catch(() => {
      return null;
    });
