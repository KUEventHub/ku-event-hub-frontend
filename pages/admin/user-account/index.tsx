import * as React from "react";
import { Container, Typography } from "@mui/material";
import UserAccountTable from "@/components/UserAccountTable";

export default function UserAccount() {
  
  return (
    <Container component="main" maxWidth="lg">
      <Typography
        component="h1"
        sx={{ mb: 2, fontWeight: "bold", fontSize: "18px" }}
      >
        บัญชีผู้ใช้งานทั้งหมด
      </Typography>
      <UserAccountTable />
    </Container>
  );
}
