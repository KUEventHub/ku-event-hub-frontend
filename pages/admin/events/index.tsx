import React from 'react'
import EventCard from "@/components/EventCard";
import { Container, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/services/events';

export default function Events() {
  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents()
  });
  
  return (
    <>
      <Container component="main" maxWidth="lg">
        <Typography
          component="h1"
          sx={{ mb: 2, fontWeight: "bold", fontSize: "18px" }}
        >
          กิจกรรมทั้งหมด
        </Typography>
        <EventCard events={data?.events} />
      </Container>
    </>
  );
}
