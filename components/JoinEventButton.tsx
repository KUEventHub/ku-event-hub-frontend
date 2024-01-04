import { Button } from "@mui/material";
import React from "react";

export default function JoinEvent() {
  return (
    <Button
      size="small"
      color="secondary"
      variant="contained"
      sx={{ m: { xs: 2, md: 3 }, mt: { xs: 0, md: 3 } }}
    >
      เข้าร่วมกิจกรรม
    </Button>
  );
}
