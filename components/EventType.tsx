import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: "center",
  color: "black",
  borderRadius: 6,
  ":hover": {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
}));

export default function EventType() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Link
            href="/event-type/กิจกรรมมหาวิทยาลัย"
            style={{ textDecoration: "none" }}
          >
            <Item>กิจกรรมมหาวิทยาลัย</Item>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Link
            href="/event-type/กิจกรรมเพื่อเสริมสร้างสมรรถนะ"
            style={{ textDecoration: "none" }}
          >
            <Item>กิจกรรมเพื่อเสริมสร้างสมรรถนะ</Item>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Link
            href="/event-type/ด้านพัฒนาคุณธรรมจริยธรรม"
            style={{ textDecoration: "none" }}
          >
            <Item>ด้านพัฒนาคุณธรรมจริยธรรม</Item>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Link
            href="/event-type/ด้านพัฒนาทักษะการคิดและการเรียนรู้"
            style={{ textDecoration: "none" }}
          >
            <Item>ด้านพัฒนาทักษะการคิดและการเรียนรู้</Item>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Link
            href="/event-type/เสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร"
            style={{ textDecoration: "none" }}
          >
            <Item>เสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร</Item>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Link
            href="/event-type/ด้านพัฒนาสุขภาพ"
            style={{ textDecoration: "none" }}
          >
            <Item>ด้านพัฒนาสุขภาพ</Item>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Link
            href="/event-type/กิจกรรมเพื่อสังคม"
            style={{ textDecoration: "none" }}
          >
            <Item>กิจกรรมเพื่อสังคม</Item>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
