import { cancelFriendRequest } from "@/services/friendRequests";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { Button, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface CancelFriendRequestButtonProps {
  _id: string;
}

export default function CancelFriendRequestButton({
  _id,
}: CancelFriendRequestButtonProps) {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleCancelFriendRequest = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    MySwal.fire({
      title: "ยืนยันการยกเลิกคำขอเป็นเพื่อน",
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
          await cancelFriendRequest(_id);
          showSnackbar("ยกเลิกคำขอเป็นเพื่อนแล้ว", "success");
          queryClient.refetchQueries({ queryKey: ["sentFriendRequests"] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "ยกเลิกคำขอเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "ยกเลิกคำขอเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
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
      onClick={handleCancelFriendRequest}
      disabled={loading}
      startIcon={
        loading && <CircularProgress size={20} sx={{ color: "white" }} />
      }
    >
      ยกเลิกคำขอ
    </Button>
  );
}
