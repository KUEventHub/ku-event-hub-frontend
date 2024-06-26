import { deactivateEvent } from "@/services/events";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface DeleteEventButtonProps {
  id: string;
  name: string;
  participantsCount: number;
}

export default function DeleteEventButton({
  id,
  name,
  participantsCount,
}: DeleteEventButtonProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDeleteEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    MySwal.fire({
      title: "ยืนยันการลบกิจกรรม",
      html: `คุณต้องการลบ <b>${name}</b> ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
      customClass: {
        popup: "custom-popup",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await deactivateEvent(id);
          showSnackbar("ลบกิจกรรมสำเร็จ", "success");
          if (router.pathname.startsWith("/events")) {
            router.push("/admin/events");
          } else {
            router.reload();
          }
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar("ลบกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
            }
          } else {
            showSnackbar("ลบกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
          }
        }
        setLoading(false);
      }
    });
  };

  return (
    <>
      {participantsCount > 0 ? (
        <Tooltip title="ลบกิจกรรมไม่ได้เนื่องจากมีผู้เข้าร่วมกิจกรรมแล้ว" arrow>
          <span>
            <Button
              size="small"
              color="error"
              variant="contained"
              disabled
              sx={{
                width: "100%",
                "&:disabled": {
                  bgcolor: "error.main",
                  color: "white",
                  opacity: 0.5,
                },
              }}
            >
              ลบกิจกรรม
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={handleDeleteEvent}
          disabled={loading}
          startIcon={
            loading && <CircularProgress size={20} sx={{ color: "white" }} />
          }
        >
          ลบกิจกรรม
        </Button>
      )}
    </>
  );
}
