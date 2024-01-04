import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSignIn = () => {
    signIn("auth0", { callbackUrl: "/" });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        className="container"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "primary.main",
            borderRadius: "10px",
            boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2)",
            p: { xs: 5, sm: 6, md: 7 },
          }}
        >
          <Box
            component="img"
            src="/images/logo.png"
            alt=""
            sx={{ my: 2, width: "60%", minWidth: 200 }}
          ></Box>
          <Typography
            component="div"
            sx={{ my: 2, textAlign: "center", fontSize: { xs: 18, md: 20 } }}
            color="white"
          >
            กรุณาเข้าสู่ระบบก่อนใช้งาน
          </Typography>
          <Button
            onClick={handleSignIn}
            fullWidth
            variant="contained"
            className="auth0-button"
            color="secondary"
            sx={{
              my: 2,
              textTransform: "none",
              fontSize: "medium",
              width: "100%",
            }}
            id="login-button"
          >
            เข้าสู่ระบบ
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
