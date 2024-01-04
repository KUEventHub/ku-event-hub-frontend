import { Button } from "@mui/material";
import React from "react";

export default function EditEvent() {
  return (
    <Button
      size="small"
      color="secondary"
      variant="contained"
      sx={{ ml: 2, mb: 2, mr: { md: 3 }, mt: { md: 3 } }}
    >
      แก้ไขกิจกรรม
    </Button>
  );
}
