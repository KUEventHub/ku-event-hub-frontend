import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import {
  Tooltip,
  Button,
  Box,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { showSnackbar } from "@/utils/showSnackbar";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { checkQRCode, verifyParticipation } from "@/services/events";
import { useQueryClient } from "@tanstack/react-query";

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

interface ScanQRCodeProps {
  id: string;
  name: string;
}

export default function ScanQRCode({ id, name }: ScanQRCodeProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVerifyParticipation = async (encryptedString: string) => {
    try {
      await verifyParticipation(id, encryptedString);
      showSnackbar("ยืนยันการเข้าร่วมกิจกรรมแล้ว", "success");
      queryClient.refetchQueries({ queryKey: ["eventInfo", id] });
    } catch (error: any) {
      if (error && error.response) {
        const { status } = error.response;
        if (status === 401) {
          SessionExpiredPopup();
        } else {
          showSnackbar(
            "ยืนยันการเข้าร่วมกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            "error"
          );
        }
      } else {
        showSnackbar(
          "ยืนยันการเข้าร่วมกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
          "error"
        );
      }
    }
  };

  const handleScanQRCode = async (qrCode: string) => {
    try {
      const response = await checkQRCode({
        eventId: id,
        encryptedString: qrCode,
      });
      handleClose();
      if (response.results.isValid) {
        MySwal.fire({
          title: "ยืนยันการเข้าร่วมกิจกรรม",
          html: `คุณต้องการเข้าร่วมกิจกรรม <b>${name}</b> ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          animation: false,
          reverseButtons: true,
          customClass: {
            popup: "custom-popup",
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            handleVerifyParticipation(qrCode);
          }
        });
      } else {
        MySwal.fire({
          title: "QR Code ไม่ถูกต้อง",
          html: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
          animation: false,
          customClass: {
            popup: "custom-popup custom-popup-title",
          },
        });
      }
    } catch (error: any) {
      if (error && error.response) {
        const { status } = error.response;
        handleClose();
        if (status === 400) {
          MySwal.fire({
            title: "QR Code ไม่ถูกต้อง",
            html: "กรุณาลองใหม่อีกครั้ง",
            confirmButtonText: "ตกลง",
            animation: false,
            customClass: {
              popup: "custom-popup custom-popup-title",
            },
          });
        } else if (status === 401) {
          SessionExpiredPopup();
        } else {
          MySwal.fire({
            title: "สแกน QR Code ไม่สำเร็จ",
            html: "กรุณาลองใหม่อีกครั้ง",
            confirmButtonText: "ตกลง",
            animation: false,
            customClass: {
              popup: "custom-popup custom-popup-title",
            },
          });
        }
      } else {
        MySwal.fire({
          title: "สแกน QR Code ไม่สำเร็จ",
          html: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
          animation: false,
          customClass: {
            popup: "custom-popup custom-popup-title",
          },
        });
      }
    }
  };

  return (
    <>
      <Tooltip title="สแกน QR Code เพื่อเข้าร่วมกิจกรรม" placement="top" arrow>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleOpen}
          startIcon={<QrCodeScannerIcon />}
          sx={{ fontSize: 12 }}
        >
          Scan QR Code
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
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mt: 2,
            }}
          >
            สแกน QR Code เพื่อเข้าร่วมกิจกรรม
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ m: 2 }}>
            <QrScanner
              onDecode={(result) => handleScanQRCode(result)}
              videoStyle={{ borderRadius: 6 }}
              containerStyle={{ borderRadius: 6 }}
              audio={false}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
