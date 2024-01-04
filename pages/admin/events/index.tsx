import React from 'react'
import EventCard from "@/components/EventCard";
import { Container, Typography } from "@mui/material";
import { data } from '@/pages';

export default function Events() {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <Typography
          component="h1"
          sx={{ mb: 2, fontWeight: "bold", fontSize: "18px" }}
        >
          กิจกรรมทั้งหมด
        </Typography>
        <EventCard events={data} />
      </Container>
    </>
  );
}
