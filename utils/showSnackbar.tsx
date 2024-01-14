import { IconButton } from "@mui/material";
import { VariantType, closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

export const showSnackbar = (message: string, variant: VariantType) => {
  enqueueSnackbar(message, {
    variant,
    action: (key) => (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => closeSnackbar(key)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    ),
  });
};
