import { addFriend } from "@/services/friendRequests";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { Button, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface AddFriendButtonProps {
  _id: string;
}

export default function AddFriendButton({ _id }: AddFriendButtonProps) {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleAddFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    MySwal.fire({
      title: "ยืนยันการส่งคำขอเป็นเพื่อน",
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
          await addFriend(_id);
          showSnackbar("ส่งคำขอเป็นเพื่อนแล้ว", "success");
          queryClient.refetchQueries({ queryKey: ["profileInfo", _id] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "ส่งคำขอเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "ส่งคำขอเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
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
      color="secondary"
      variant="contained"
      onClick={handleAddFriend}
      disabled={loading}
      startIcon={
        loading && <CircularProgress size={20} sx={{ color: "white" }} />
      }
    >
      เพิ่มเพื่อน
    </Button>
  );
}
