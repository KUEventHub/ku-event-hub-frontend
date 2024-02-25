import { unbanUser } from "@/services/users";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { Button, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface UnbanUserButtonProps {
  id: string;
  username: string;
}

export default function UnbanUserButton({
  id,
  username,
}: UnbanUserButtonProps) {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleUnbanUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    MySwal.fire({
      title: "ยืนยันการยกเลิกการระงับบัญชีผู้ใช้งาน",
      html: `คุณต้องการยกเลิกการระงับบัญชีผู้ใช้งานของ <b>${username}</b> ?`,
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
          await unbanUser(id);
          showSnackbar("ยกเลิกการระงับบัญชีผู้ใช้งานแล้ว", "success");
          queryClient.refetchQueries({ queryKey: ["bannedUserList"] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "ยกเลิกการระงับบัญชีผู้ใช้งานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "ยกเลิกการระงับบัญชีผู้ใช้งานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
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
      onClick={handleUnbanUser}
      disabled={loading}
      startIcon={
        loading && <CircularProgress size={20} sx={{ color: "white" }} />
      }
    >
      ยกเลิกการระงับ
    </Button>
  );
}
