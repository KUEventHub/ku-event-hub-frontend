import api from "./api";

export const addFriend = (userId: string) =>
  api
    .post("/api/friend-requests/add", { userId })
    .then((response) => response.data);

export const getReceivedFriendRequests = () =>
  api
    .get("/api/friend-requests/received")
    .then((response) => response.data)
    .catch(() => {
      return null;
    });

export const getSentFriendRequests = () =>
  api
    .get("/api/friend-requests/sent")
    .then((response) => response.data)
    .catch(() => {
      return null;
    });

export const acceptFriendRequest = (id: string) =>
  api
    .post(`/api/friend-requests/${id}/accept`)
    .then((response) => response.data);

export const rejectFriendRequest = (id: string) =>
  api
    .post(`/api/friend-requests/${id}/reject`)
    .then((response) => response.data);
