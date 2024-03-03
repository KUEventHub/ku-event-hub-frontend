import api from "./api";
import { EventData } from "@/interfaces/Event";

export const getEvents = (pageNumber: number) =>
  api
    .get(`/api/events?pageNumber=${pageNumber}`)
    .then((response) => response.data)
    .catch(() => {
      return null;
    });

export const getRecommendedEvents = (pageNumber: number) =>
  api
    .get(`/api/events/recommended?pageNumber=${pageNumber}`)
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

export const joinEvent = (id: string) =>
  api.post(`/api/events/${id}/join`).then((response) => response.data);

export const leaveEvent = (id: string) =>
  api.post(`/api/events/${id}/leave`).then((response) => response.data);

export const deactivateEvent = (id: string) =>
  api.post(`/api/events/${id}/deactivate`).then((response) => response.data);
