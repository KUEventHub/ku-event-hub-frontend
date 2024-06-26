import { joinEvent } from "@/services/events";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface JoinEventButtonProps {
  _id: string;
}

export default function JoinEventButton({ _id }: JoinEventButtonProps) {
  const queryClient = useQueryClient();

  const handleJoinEvent = () => {
    MySwal.fire({
      title: "ยืนยันการเข้าร่วมกิจกรรม",
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
          await joinEvent(_id);
          showSnackbar("เข้าร่วมกิจกรรมสำเร็จ", "success");
          queryClient.refetchQueries({ queryKey: ["eventInfo", _id] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "เข้าร่วมกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "เข้าร่วมกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
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
      color="secondary"
      variant="contained"
      onClick={handleJoinEvent}
    >
      เข้าร่วมกิจกรรม
    </Button>
  );
}
