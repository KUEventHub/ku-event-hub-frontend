import { Button } from "@mui/material";
import React from "react";

export default function DeleteEvent() {
  return (
    <Button
      size="small"
      color="error"
      variant="contained"
      sx={{ ml: 2, mb: 2, mr: { md: 3 } }}
    >
      ลบกิจกรรม
    </Button>
  );
}
