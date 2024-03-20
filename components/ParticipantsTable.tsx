import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, TableSortLabel } from "@mui/material";
import { useRouter } from "next/router";

export interface Participant {
  _id: string;
  idCode: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl: string;
  isConfirmed: boolean;
}

export interface ParticipantsTableProps {
  participants: Participant[];
}

export default function ParticipantsTable({
  participants,
}: ParticipantsTableProps) {
  const [sortBy, setSortBy] = React.useState<string | null>("idCode");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const router = useRouter();

  const handleSort = (property: string) => {
    const isAsc = sortBy === property && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  const sortedParticipants = participants?.sort(
    (a: Participant, b: Participant) => {
      if (sortBy === "name") {
        const valueA = `${a.firstName} ${a.lastName}`;
        const valueB = `${b.firstName} ${b.lastName}`;
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (sortBy === "status") {
        const valueA = a.isConfirmed
          ? "ยืนยันการเข้าร่วมแล้ว"
          : "ลงทะเบียนแล้ว";
        const valueB = b.isConfirmed
          ? "ยืนยันการเข้าร่วมแล้ว"
          : "ลงทะเบียนแล้ว";
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === "asc"
          ? (a[sortBy as keyof Participant] as string).localeCompare(
              b[sortBy as keyof Participant] as string
            )
          : (b[sortBy as keyof Participant] as string).localeCompare(
              a[sortBy as keyof Participant] as string
            );
      }
    }
  );

  return (
    <Paper sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#D9D9D9" }}>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "idCode"}
                    direction={sortBy === "idCode" ? sortOrder : "asc"}
                    onClick={() => handleSort("idCode")}
                  >
                    รหัสนิสิต
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "name"}
                    direction={sortBy === "name" ? sortOrder : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    ชื่อ-นามสกุล
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "username"}
                    direction={sortBy === "username" ? sortOrder : "asc"}
                    onClick={() => handleSort("username")}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: 175 }}>
                  <TableSortLabel
                    active={sortBy === "status"}
                    direction={sortBy === "status" ? sortOrder : "asc"}
                    onClick={() => handleSort("status")}
                  >
                    สถานะการเข้าร่วม
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants?.length > 0 ? (
                sortedParticipants.map((row) => (
                  <TableRow
                    hover
                    key={row._id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => router.push(`/profile/${row._id}`)}
                  >
                    <TableCell>{row.idCode}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={row.profilePictureUrl}
                          sx={{
                            width: { xs: 30, md: 40 },
                            height: { xs: 30, md: 40 },
                            mr: 2,
                          }}
                        />
                        {row.firstName} {row.lastName}
                      </Box>
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell
                      sx={{
                        color: row.isConfirmed ? "primary.main" : "gray",
                      }}
                    >
                      {row.isConfirmed
                        ? "ยืนยันการเข้าร่วมแล้ว"
                        : "ลงทะเบียนแล้ว"}
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
      </Box>
    </Paper>
  );
}
