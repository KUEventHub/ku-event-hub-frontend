import { leaveEvent } from "@/services/events";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface LeaveEventButtonProps {
  _id: string;
}

export default function LeaveEventButton({ _id }: LeaveEventButtonProps) {
  const queryClient = useQueryClient();

  const handleLeaveEvent = () => {
    MySwal.fire({
      title: "ยืนยันการออกจากกิจกรรม",
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
        try {
          await leaveEvent(_id);
          showSnackbar("ออกจากกิจกรรมสำเร็จ", "success");
          queryClient.refetchQueries({ queryKey: ["eventInfo", _id] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "ออกจากกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "ออกจากกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
              "error"
            );
          }
        }
      }
    });
  };

  return (
    <Button
      size="small"
      color="error"
      variant="contained"
      onClick={handleLeaveEvent}
    >
      ออกจากกิจกรรม
    </Button>
  );
}
