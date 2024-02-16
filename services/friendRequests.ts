import api from "./api";

export const addFriend = (userId: string) =>
  api
    .post("/api/friend-requests/add", { userId })
    .then((response) => response.data);
