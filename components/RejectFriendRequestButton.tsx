import { rejectFriendRequest } from "@/services/friendRequests";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { Button, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface RejectFriendRequestButtonProps {
  _id: string;
}

export default function RejectFriendRequestButton({
  _id,
}: RejectFriendRequestButtonProps) {
  const [loading, setLoading] = useState(false);
  
  const queryClient = useQueryClient();

  const handleRejectFriendRequest = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    MySwal.fire({
      title: "ยืนยันการปฏิเสธคำขอเป็นเพื่อน",
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
          await rejectFriendRequest(_id);
          showSnackbar("ปฏิเสธคำขอเป็นเพื่อนแล้ว", "success");
          queryClient.refetchQueries({ queryKey: ["receivedFriendRequests"] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "ปฏิเสธคำขอเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "ปฏิเสธคำขอเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
              "error"
            );
          }
        }
        setLoading(false);
      }
    });
  };

  return (
    <Button
      size="small"
      variant="contained"
      sx={{
        backgroundColor: "#F1F1F1",
        color: "black",
        ":hover": {
          backgroundColor: "#dadada",
        },
      }}
      onClick={handleRejectFriendRequest}
      disabled={loading}
      startIcon={
        loading && <CircularProgress size={20} sx={{ color: "white" }} />
      }
    >
      ปฏิเสธ
    </Button>
  );
}
