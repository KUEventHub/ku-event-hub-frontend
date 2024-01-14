import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { signOut } from "next-auth/react";

const MySwal = withReactContent(Swal);

export function SessionExpiredPopup() {
  MySwal.fire({
    title: "เซสชันหมดอายุ",
    html: "เซสชันของคุณหมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
    confirmButtonText: "ตกลง",
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: "custom-popup session-expired-popup",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      signOut();
    }
  });
}
