import { Tooltip, IconButton, Menu, MenuItem, Box } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { editUserPrivacy } from "@/services/users";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { useQueryClient } from "@tanstack/react-query";

const MySwal = withReactContent(Swal);

interface ShowFriendsSettingProps {
  _id: string;
  showFriends: boolean;
}

export default function ShowFriendsSetting({
  _id,
  showFriends,
}: ShowFriendsSettingProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowFriends = () => {
    const setting = showFriends ? "ส่วนตัว" : "สาธารณะ";
    setAnchorEl(null);
    MySwal.fire({
      title: "ตั้งค่าการแสดงรายชื่อเพื่อน",
      html: `คุณต้องการแสดงรายชื่อเพื่อนเป็น <b>${setting}</b> ?`,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
      customClass: {
        popup: "custom-popup custom-popup-title",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          user: {
            showFriends: showFriends ? false : true,
          },
        };
        try {
          await editUserPrivacy(_id, data);
          showSnackbar("ตั้งค่าการแสดงรายชื่อเพื่อนสำเร็จ", "success");
          queryClient.refetchQueries({ queryKey: ["profileInfo", _id] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "ตั้งค่าการแสดงรายชื่อเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "ตั้งค่าการแสดงรายชื่อเพื่อนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
              "error"
            );
          }
        }
      }
    });
  };

  return (
    <Box>
      <Tooltip title="ตั้งค่ารายชื่อเพื่อน" placement="bottom-end">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleShowFriends} sx={{ fontSize: 14 }}>
          ตั้งค่าการแสดงรายชื่อเพื่อน
        </MenuItem>
      </Menu>
    </Box>
  );
}
