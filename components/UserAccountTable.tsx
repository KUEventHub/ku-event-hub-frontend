import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
  TablePagination,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "@/services/admin";
import { UserList } from "@/interfaces/User";
import { useRouter } from "next/router";
import { formatDateTime } from "@/utils/formatDateTime";
import UserAccountActionsButton from "./UserAccountActionsButton";

export default function UserAccountTable() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(20);
  const [includeAdmins, setIncludeAdmins] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<string | null>("loginTime");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["userList", pageNumber, pageSize, includeAdmins],
    queryFn: () => getUserList(pageNumber, pageSize, includeAdmins),
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleSort = (property: string) => {
    const isAsc = sortBy === property && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  const sortedUsers = data?.users?.sort((a: UserList, b: UserList) => {
    if (sortBy === "loginTime") {
      const dateTimeA = new Date(a.loginTime).getTime();
      const dateTimeB = new Date(b.loginTime).getTime();
      return sortOrder === "asc"
        ? dateTimeA - dateTimeB
        : dateTimeB - dateTimeA;
    } else if (sortBy === "name") {
      const valueA = `${a.firstName} ${a.lastName}`;
      const valueB = `${b.firstName} ${b.lastName}`;
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOrder === "asc"
        ? (a[sortBy as keyof UserList] as string).localeCompare(
            b[sortBy as keyof UserList] as string
          )
        : (b[sortBy as keyof UserList] as string).localeCompare(
            a[sortBy as keyof UserList] as string
          );
    }
  });

  return (
    <Paper sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#D9D9D9" }}>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "username"}
                    direction={sortBy === "username" ? sortOrder : "asc"}
                    onClick={() => handleSort("username")}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "name"}
                    direction={sortBy === "name" ? sortOrder : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "email"}
                    direction={sortBy === "email" ? sortOrder : "asc"}
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "loginTime"}
                    direction={sortBy === "loginTime" ? sortOrder : "asc"}
                    onClick={() => handleSort("loginTime")}
                  >
                    Last Login
                  </TableSortLabel>
                </TableCell>
                {includeAdmins && (
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "role"}
                      direction={sortBy === "role" ? sortOrder : "asc"}
                      onClick={() => handleSort("role")}
                    >
                      Role
                    </TableSortLabel>
                  </TableCell>
                )}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow style={{ height: 53 }}>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress sx={{ color: "gray" }} />
                  </TableCell>
                </TableRow>
              ) : data?.users?.length > 0 ? (
                sortedUsers.map((row: UserList) => (
                  <TableRow
                    hover
                    key={row._id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => router.push(`/profile/${row._id}`)}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        component="div"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Avatar
                          src={row.profilePictureUrl}
                          sx={{
                            width: { xs: 30, md: 40 },
                            height: { xs: 30, md: 40 },
                            mr: 2,
                          }}
                        />
                        {row.username}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {row.firstName} {row.lastName}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {formatDateTime(new Date(row.loginTime))}
                    </TableCell>
                    {includeAdmins && <TableCell>{row.role}</TableCell>}
                    <TableCell align="right" width={75}>
                      <UserAccountActionsButton
                        id={row._id}
                        username={row.username}
                        isBanned={row.isBanned}
                        auth0UserId={row.auth0UserId}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: 53 }}>
                  <TableCell colSpan={5} align="center">
                    ไม่พบข้อมูล
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormGroup sx={{ ml: 3, mr: "auto" }}>
            <Tooltip
              title={includeAdmins ? "ซ่อนรายชื่อ Admin" : "แสดงรายชื่อ Admin"}
              placement="bottom-start"
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={includeAdmins}
                    onChange={() => setIncludeAdmins(!includeAdmins)}
                    size="small"
                    color="default"
                  />
                }
                label={
                  <Typography variant="body2" color="gray" sx={{ ml: 1 }}>
                    Admin
                  </Typography>
                }
              />
            </Tooltip>
          </FormGroup>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={data?.totalUsers ? data.totalUsers : 0}
            rowsPerPage={pageSize}
            page={data?.totalUsers ? pageNumber : 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Paper>
  );
}
