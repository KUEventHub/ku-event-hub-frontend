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
import {
  ButtonBase,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BlockIcon from "@mui/icons-material/Block";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EventIcon from "@mui/icons-material/Event";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const drawerWidth = 275;

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

export default function NavBar(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleSignIn = () => {
    signIn("auth0", { callbackUrl: "/" });
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    if (mobileOpen) {
      setMobileOpen(!mobileOpen);
    } else {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    {
      href: "/admin/user-account",
      icon: <ManageAccountsIcon />,
      primary: "บัญชีผู้ใช้งานทั้งหมด",
    },
    {
      href: "/admin/user-account/banned",
      icon: <BlockIcon />,
      primary: "บัญชีผู้ใช้งานที่ถูกระงับ",
    },
    {
      href: "/admin/create-event",
      icon: <AddBoxIcon />,
      primary: "สร้างกิจกรรม",
    },
    {
      href: "/admin/events",
      icon: <EventIcon />,
      primary: "กิจกรรมทั้งหมด",
    },
  ];

  const drawer = (
    <List>
      {menuItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <ListItem
            disablePadding
            sx={{
              backgroundColor:
                router.pathname === item.href ? "#B2BB1C" : "initial",
              color: router.pathname === item.href ? "white" : "initial",
              width: "100%",
              ":hover": {
                backgroundColor:
                  router.pathname === item.href ? "secondary" : "inherit",
              },
            }}
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon
                sx={{
                  pl: 1.5,
                  color: router.pathname === item.href ? "white" : "initial",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.primary} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar disableGutters>
            {session && session.user.role.includes("Admin") && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 1, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            )}
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
                  sx={{ mt: "45px", width: 300 }}
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
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mx: 2,
                      mt: 1,
                      mb: 2,
                    }}
                  >
                    <Avatar src={session.user?.image || ""} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: 1,
                        minWidth: 100,
                        maxWidth: 150,
                      }}
                    >
                      <Typography variant="body2" noWrap>
                        {session.user?.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        noWrap
                        color="text.secondary"
                      >
                        {session.user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  {session && session.user.role.includes("User") && (
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" variant="body2">
                          ดูโปรไฟล์
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" variant="body2">
                          แก้ไขข้อมูลส่วนตัว
                        </Typography>
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={handleSignOut}>
                    <Typography textAlign="center" variant="body2">
                      ออกจากระบบ
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                color="inherit"
                onClick={handleSignIn}
                sx={{ mx: "auto", fontSize: { xs: 12, md: 14 } }}
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {session && session.user.role.includes("Admin") && (
          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="menu items"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <Toolbar />
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              <Toolbar />
              {drawer}
            </Drawer>
          </Box>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            my: 2,
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
