import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { createQRCode, getQRCode } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { showSnackbar } from "@/utils/showSnackbar";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";

const MySwal = withReactContent(Swal);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "100%",
  maxHeight: "100%",
  bgcolor: "white",
  borderRadius: 1,
  boxShadow: 2,
  p: 1,
  overflow: "scroll",
};

interface QRCodeButtonProps {
  id: string;
}

export default function QRCodeButton({ id }: QRCodeButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, refetch } = useQuery({
    queryKey: ["qrCode", id],
    queryFn: () => getQRCode(id),
  });

  const handleCreateQRCode = () => {
    MySwal.fire({
      title: "ยืนยันการสร้าง QR Code สำหรับเข้าร่วมกิจกรรม",
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
          await createQRCode(id);
          refetch();
          showSnackbar("สร้าง QR Code แล้ว", "success");
        } catch (error: any) {
          if (error && error.response) {
            const { status } = error.response;
            if (status === 401) {
              SessionExpiredPopup();
            } else {
              showSnackbar(
                "สร้าง QR Code ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
                "error"
              );
            }
          } else {
            showSnackbar(
              "สร้าง QR Code ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
              "error"
            );
          }
        }
        setLoading(false);
      }
    });
  };

  return (
    <>
      {data ? (
        <>
          <Tooltip title="QR Code สำหรับเข้าร่วมกิจกรรม" placement="top" arrow>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={handleOpen}
              startIcon={<QrCode2Icon />}
            >
              QR Code
            </Button>
          </Tooltip>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  mt: 2,
                }}
              >
                QR Code สำหรับเข้าร่วมกิจกรรม
              </Typography>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                component="img"
                src={data?.qrCodeString}
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Modal>
        </>
      ) : (
        <Tooltip
          title="สร้าง QR Code สำหรับเข้าร่วมกิจกรรม"
          placement="top"
          arrow
        >
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleCreateQRCode}
            disabled={loading}
          >
            สร้าง QR Code
          </Button>
        </Tooltip>
      )}
    </>
  );
}
