import api from "./api";

export const getUserList = (
  pageNumber: number,
  pageSize: number,
  includeAdmins: boolean
) =>
  api
    .get("/api/admin/user-list", {
      params: {
        pageNumber: pageNumber + 1 || undefined,
        pageSize: pageSize || undefined,
        includeAdmins: includeAdmins || undefined,
      },
    })
    .then((response) => response.data)
    .catch(() => {
      return null;
    });

export const getBannedUserList = (pageNumber: number, pageSize: number) =>
  api
    .get("/api/admin/banned-list", {
      params: {
        pageNumber: pageNumber + 1 || undefined,
        pageSize: pageSize || undefined,
      },
    })
    .then((response) => response.data)
    .catch(() => {
      return null;
    });
