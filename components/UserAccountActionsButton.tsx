import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useQueryClient } from "@tanstack/react-query";
import { showSnackbar } from "@/utils/showSnackbar";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { banUser, unbanUser } from "@/services/users";
import { updateAuth0User } from "@/services/auth0";

const MySwal = withReactContent(Swal);

interface UserAccountActionsButtonProps {
  id: string;
  username: string;
  isBanned: boolean;
  auth0UserId: string;
}

export default function UserAccountActionsButton({
  id,
  username,
  isBanned,
  auth0UserId,
}: UserAccountActionsButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleBanUser = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
    MySwal.fire({
      title: "ยืนยันการระงับบัญชีผู้ใช้งาน",
      html: `คุณต้องการระงับบัญชีผู้ใช้งานของ <b>${username}</b> ?`,
      icon: "warning",
      input: "text",
      inputPlaceholder: "สาเหตุที่ถูกระงับ",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
      customClass: {
        popup: "custom-popup",
      },
      preConfirm: async (value) => {
        if (!value) {
          Swal.showValidationMessage("กรุณากรอกสาเหตุที่ถูกระงับ");
        } else {
          setLoading(true);
          try {
            await updateAuth0User(auth0UserId, { blocked: true });
            await banUser(id, value);
            showSnackbar("ระงับบัญชีผู้ใช้งานสำเร็จ", "success");
            queryClient.refetchQueries({ queryKey: ["userList"] });
          } catch (error: any) {
            await updateAuth0User(auth0UserId, { blocked: false }).catch(() => {
              return null;
            });
            if (error && error.response) {
              const { status } = error.response;
              if (status === 401) {
                SessionExpiredPopup();
              } else {
                showSnackbar(
                  "ระงับบัญชีผู้ใช้งานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                  "error"
                );
              }
            } else {
              showSnackbar(
                "ระงับบัญชีผู้ใช้งานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          }
          setLoading(false);
        }
      },
    });
  };

  const handleUnbanUser = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
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
          await updateAuth0User(auth0UserId, { blocked: false });
          await unbanUser(id);
          showSnackbar("ยกเลิกการระงับบัญชีผู้ใช้งานแล้ว", "success");
          queryClient.refetchQueries({ queryKey: ["userList"] });
        } catch (error: any) {
          await updateAuth0User(auth0UserId, { blocked: true }).catch(() => {
            return null;
          });
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
    <Box>
      <Tooltip title="Actions">
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
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        {isBanned ? (
          <MenuItem
            onClick={handleUnbanUser}
            sx={{ fontSize: 14 }}
            disabled={loading}
          >
            <ListItemIcon>
              <LockOpenIcon fontSize="small" />
            </ListItemIcon>
            ยกเลิกการระงับ
          </MenuItem>
        ) : (
          <MenuItem
            onClick={handleBanUser}
            sx={{ fontSize: 14 }}
            disabled={loading}
          >
            <ListItemIcon>
              <BlockIcon fontSize="small" />
            </ListItemIcon>
            ระงับผู้ใช้
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
