import api from "./api";

export const getUserList = (pageNumber: number, pageSize: number) =>
  api
    .get("/api/admin/user-list", {
      params: {
        pageNumber: pageNumber + 1 || undefined,
        pageSize: pageSize || undefined,
      },
    })
    .then((response) => response.data)
    .catch(() => {
      return null;
    });
