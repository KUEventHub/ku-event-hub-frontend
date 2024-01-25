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

export const getEventInfo = (id: string) =>
  api
    .get(`/api/events/${id}`)
    .then((response) => response.data)
    .catch(() => {
      return null;
    });

export const getEventInfoForEdit = (id: string) =>
  api
    .get(`/api/events/${id}/edit`)
    .then((response) => response.data)
    .catch(() => {
      return null;
    });

export const editEventInfo = (id: string, data: EventData) =>
  api.post(`/api/events/${id}/edit`, data).then((response) => response.data);
