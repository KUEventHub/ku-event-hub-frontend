import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { signOut } from "next-auth/react";

const MySwal = withReactContent(Swal);

export function BannedUserPopup(reason: string) {
  MySwal.fire({
    title: "บัญชีผู้ใช้งานถูกระงับ",
    html: "บัญชีผู้ใช้งานของคุณถูกระงับ เนื่องจาก" + reason,
    confirmButtonText: "ตกลง",
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: "custom-popup custom-popup-title",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      signOut();
    }
  });
}
