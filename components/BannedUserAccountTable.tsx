import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Button} from "@mui/material";

function createData(image: string, name: string, time: string, reason: string) {
  return { image, name, time, reason };
}

const rows = [
  createData("", "User 03", "11/12/2566 11:11:11", "สาเหตุที่ถูกระงับ"),
];

export default function BannedUserAccountTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#D9D9D9" }}>
            <TableCell>Name</TableCell>
            <TableCell>วันเวลาที่ถูกระงับ</TableCell>
            <TableCell>สาเหตุ</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Box
                  component="div"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    src={row.image}
                    sx={{
                      width: { xs: 30, md: 40 },
                      height: { xs: 30, md: 40 },
                      mr: 2,
                    }}
                  />
                  {row.name}
                </Box>
              </TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell align="right" width={150}>
                <Button size="small" color="secondary" variant="contained">
                  ถอนการระงับ
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
