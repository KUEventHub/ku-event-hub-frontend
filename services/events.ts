import api from "./api";
import { EventData } from "@/interfaces/Event";

export const getEvents = () =>
  api
    .get("/api/events")
    .then((response) => response.data)
    .catch(() => {
      return null;
    });

export const createEvent = (data: EventData) =>
  api.post("/api/events/create", data).then((response) => response.data);
