import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { unfriend } from "@/services/users";
import { useQueryClient } from "@tanstack/react-query";

const MySwal = withReactContent(Swal);

interface MyFriendButtonProps {
  _id: string;
  username: string;
}

export default function MyFriendButton({ _id, username }: MyFriendButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUnfriend = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnchorEl(null);
    MySwal.fire({
      title: `ยืนยันการเลิกเป็นเพื่อนกับ ${username}`,
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
          await unfriend(_id);
          showSnackbar("เลิกเป็นเพื่อนสำเร็จ", "success");
          queryClient.refetchQueries({ queryKey: ["profileInfo", _id] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "เลิกเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "เลิกเป็นเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
              "error"
            );
          }
        }
        setLoading(false);
      }
    });
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#dadada",
          color: "black",
          ":hover": {
            backgroundColor: "#dadada",
          },
          fontSize: 13,
        }}
        startIcon={<HowToRegIcon />}
        onClick={handleClick}
      >
        เพื่อน
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: {
            py: 0.5,
          },
        }}
        sx={{ mt: 1 }}
      >
        <MenuItem
          onClick={handleUnfriend}
          sx={{ fontSize: 13 }}
          disabled={loading}
        >
          เลิกเป็นเพื่อน
        </MenuItem>
      </Menu>
    </Box>
  );
}
