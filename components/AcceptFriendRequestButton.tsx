import { acceptFriendRequest } from "@/services/friendRequests";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { Button, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface AcceptFriendRequestButtonProps {
  _id: string;
}

export default function AcceptFriendRequestButton({
  _id,
}: AcceptFriendRequestButtonProps) {
  const [loading, setLoading] = useState(false);
  
  const queryClient = useQueryClient();

  const handleAcceptFriendRequest = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    MySwal.fire({
      title: "ยืนยันการยอมรับคำขอเป็นเพื่อน",
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
          await acceptFriendRequest(_id);
          showSnackbar("ยอมรับคำขอเป็นเพื่อนแล้ว", "success");
          queryClient.refetchQueries({ queryKey: ["receivedFriendRequests"] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar("ยอมรับคำขอเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
            }
          } else {
            showSnackbar("ยอมรับคำขอเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
          }
        }
        setLoading(false);
      }
    });
  };

  return (
    <Button
      size="small"
      color="secondary"
      variant="contained"
      onClick={handleAcceptFriendRequest}
      disabled={loading}
      startIcon={
        loading && <CircularProgress size={20} sx={{ color: "white" }} />
      }
    >
      ยอมรับ
    </Button>
  );
}
