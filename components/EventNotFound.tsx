import { Box } from "@mui/material";
import React from "react";
import EventBusyIcon from "@mui/icons-material/EventBusy";

export default function EventNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      color="text.secondary"
    >
      <EventBusyIcon sx={{ fontSize: 50, mb: 1 }} />
      ไม่พบกิจกรรม
    </Box>
  );
}
