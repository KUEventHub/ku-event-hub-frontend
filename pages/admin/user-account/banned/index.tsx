import * as React from "react";
import BannedUserAccountTable from "@/components/BannedUserAccountTable";
import { Container, Typography } from "@mui/material";

export default function BannedUserAccount() {
  return (
    <Container component="main" maxWidth="lg">
      <Typography
        component="h1"
        sx={{ mb: 2, fontWeight: "bold", fontSize: "18px" }}
      >
        บัญชีผู้ใช้งานที่ถูกระงับ
      </Typography>
      <BannedUserAccountTable />
    </Container>
  );
}
