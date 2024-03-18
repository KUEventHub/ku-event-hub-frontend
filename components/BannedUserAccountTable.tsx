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
  TablePagination,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getBannedUserList } from "@/services/admin";
import { BannedUserList } from "@/interfaces/User";
import { formatDateTime } from "@/utils/formatDateTime";
import UnbanUserButton from "./UnbanUserButton";
import { useRouter } from "next/router";

export default function BannedUserAccountTable() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(20);
  const [sortBy, setSortBy] = React.useState<string | null>("time");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["bannedUserList", pageNumber, pageSize],
    queryFn: () => getBannedUserList(pageNumber, pageSize),
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

  const sortedUsers = data?.users?.sort(
    (a: BannedUserList, b: BannedUserList) => {
      if (sortBy === "time") {
        const dateTimeA = new Date(a.ban.time).getTime();
        const dateTimeB = new Date(b.ban.time).getTime();
        return sortOrder === "asc"
          ? dateTimeA - dateTimeB
          : dateTimeB - dateTimeA;
      } else if (sortBy === "reason") {
        const valueA = a.ban.reason;
        const valueB = b.ban.reason;
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (sortBy === "name") {
        const valueA = `${a.firstName} ${a.lastName}`;
        const valueB = `${b.firstName} ${b.lastName}`;
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === "asc"
          ? (a[sortBy as keyof BannedUserList] as string).localeCompare(
              b[sortBy as keyof BannedUserList] as string
            )
          : (b[sortBy as keyof BannedUserList] as string).localeCompare(
              a[sortBy as keyof BannedUserList] as string
            );
      }
    }
  );

  return (
    <Paper sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                    active={sortBy === "time"}
                    direction={sortBy === "time" ? sortOrder : "asc"}
                    onClick={() => handleSort("time")}
                  >
                    วันเวลาที่ถูกระงับ
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "reason"}
                    direction={sortBy === "reason" ? sortOrder : "asc"}
                    onClick={() => handleSort("reason")}
                  >
                    สาเหตุที่ถูกระงับ
                  </TableSortLabel>
                </TableCell>
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
                sortedUsers.map((row: BannedUserList) => (
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
                    <TableCell>{formatDateTime(row.ban.time)}</TableCell>
                    <TableCell sx={{ maxWidth: 175 }}>
                      <Tooltip title={row.ban.reason} placement="bottom-start">
                        <Typography fontSize={14} noWrap>
                          {row.ban.reason}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right" width={160}>
                      <UnbanUserButton
                        id={row._id}
                        username={row.username}
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
    </Paper>
  );
}
