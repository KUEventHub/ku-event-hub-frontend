import { getSession } from "next-auth/react";
import api from "./api";
import { CreateUser } from "@/interfaces/User";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";

export const createUser = (data: CreateUser) =>
  api.post("/api/users/create", data).then((response) => response.data);

export const getUserMenu = () =>
  api
    .get("/api/users/me")
    .then((response) => response.data)
    .catch(async (error) => {
      if (error && error.response) {
        const { status } = error.response;
        const session = await getSession();
        if (session) {
          if (status === 401) {
            SessionExpiredPopup();
          }
          return error.response;
        }
      }
      return null;
    });
