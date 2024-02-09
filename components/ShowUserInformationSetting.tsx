import { Tooltip, IconButton, Menu, MenuItem, Box } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import { editUserPrivacy } from "@/services/users";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import { useQueryClient } from "@tanstack/react-query";

const MySwal = withReactContent(Swal);

interface ShowUserInformationSettingProps {
  _id: string;
  showUserInformation: boolean;
}

export default function ShowUserInformationSetting({
  _id,
  showUserInformation,
}: ShowUserInformationSettingProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfileMenu = () => {
    router.push("/profile/edit");
  };

  const handleShowUserInformation = () => {
    const setting = showUserInformation ? "ส่วนตัว" : "สาธารณะ";
    setAnchorEl(null);
    MySwal.fire({
      title: "ตั้งค่าการแสดงข้อมูลส่วนตัว",
      html: `คุณต้องการแสดงข้อมูลส่วนตัวเป็น <b>${setting}</b> ?`,
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
            showUserInformation: showUserInformation ? false : true,
          },
        };
        try {
          await editUserPrivacy(_id, data);
          showSnackbar("ตั้งค่าการแสดงข้อมูลส่วนตัวสำเร็จ", "success");
          queryClient.refetchQueries({ queryKey: ["profileInfo", _id] });
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "ตั้งค่าการแสดงข้อมูลส่วนตัวไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "ตั้งค่าการแสดงข้อมูลส่วนตัวไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
              "error"
            );
          }
        }
      }
    });
  };

  return (
    <Box>
      <Tooltip title="ตั้งค่าโปรไฟล์" placement="bottom-end">
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
        <MenuItem onClick={handleEditProfileMenu} sx={{ fontSize: 14 }}>
          แก้ไขข้อมูลส่วนตัว
        </MenuItem>
        <MenuItem onClick={handleShowUserInformation} sx={{ fontSize: 14 }}>
          ตั้งค่าการแสดงข้อมูลส่วนตัว
        </MenuItem>
      </Menu>
    </Box>
  );
}
