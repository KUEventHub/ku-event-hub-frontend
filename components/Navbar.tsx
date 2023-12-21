import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { signIn, signOut, useSession } from "next-auth/react";
import { ButtonBase, CssBaseline } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 2,
  width: "75%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function Navbar(props: Props) {
  const { children } = props;
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar disableGutters>
            <ButtonBase href="/" sx={{ mx: "auto" }}>
              <Box
                component="img"
                src="/images/logo.png"
                sx={{ height: { xs: 20, sm: 30, md: 35 }, my: 2, mx: 2 }}
              />
            </ButtonBase>
            <Search sx={{ mx: "auto" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="ค้นหากิจกรรม"
                inputProps={{ "aria-label": "search" }}
                sx={{ fontSize: { xs: 14, md: 16 } }}
              />
            </Search>
            {session ? (
              <Box sx={{ mx: "auto" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ mx: 2 }}>
                  <Avatar
                    src={session.user?.image || ""}
                    sx={{
                      width: { xs: 30, md: 40 },
                      height: { xs: 30, md: 40 },
                    }}
                  />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      sx={{ fontSize: { xs: 12, md: 14 } }}
                    >
                      ดูโปรไฟล์
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      sx={{ fontSize: { xs: 12, md: 14 } }}
                    >
                      แก้ไขข้อมูลส่วนตัว
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <Typography
                      textAlign="center"
                      sx={{ fontSize: { xs: 12, md: 14 } }}
                    >
                      ออกจากระบบ
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                color="inherit"
                onClick={() => signIn("auth0")}
                sx={{ mx: "auto", fontSize: { xs: 12, md: 14 } }}
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            my: 2,
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
