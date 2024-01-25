import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface EditEventProps {
  id: string;
}

export default function EditEvent({ id }: EditEventProps) {
  const router = useRouter();

  return (
    <Button
      size="small"
      color="secondary"
      variant="contained"
      sx={{ ml: 2, mb: 2, mr: { md: 3 }, mt: { md: 3 } }}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/admin/edit-event/${id}`);
      }}
    >
      แก้ไขกิจกรรม
    </Button>
  );
}
