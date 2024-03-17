import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
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
import { useQuery } from "@tanstack/react-query";
import { getUserMenu } from "@/services/users";
import SearchEvents from "./SearchEvents";
import { useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface Props {
  children: React.ReactNode;
}

const drawerWidth = 275;

export default function NavBar(props: Props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserMenu(),
    enabled: !!session,
  });

  useEffect(() => {
    if (session) {
      if (data?.status === 404) {
        if (router.pathname === "/create-profile") {
          return;
        }
        router.push("/create-profile");
      }
      if (router.pathname === "/create-profile") {
        if (data && data.user) {
          router.back();
        }
      }
    }
  }, [session, data, router]);

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn("auth0");
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

  const handleCreateProfileMenu = () => {
    setAnchorElUser(null);
    router.push("/create-profile");
  };

  const handleProfileMenu = () => {
    setAnchorElUser(null);
    router.push(`/profile/${data?.user?._id}`);
  };

  const handleEditProfileMenu = () => {
    setAnchorElUser(null);
    router.push("/profile/edit");
  };

  const handleFriendRequestMenu = () => {
    setAnchorElUser(null);
    router.push("/friend-request/received");
  };

  const handleUserEventSummary = () => {
    setAnchorElUser(null);
    router.push("/event-summary");
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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: 3 }}>
          <Toolbar disableGutters>
            {session && session.user.role.includes("Admin") && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 1, display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <ButtonBase href="/" sx={{ mx: "auto" }}>
              <Box
                component="img"
                src="/images/logo.png"
                sx={{ height: { xs: 20, sm: 30, lg: 35 }, my: 2, mx: 2 }}
              />
            </ButtonBase>
            <SearchEvents />
            {session ? (
              <Box sx={{ mx: "auto" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ mx: 2 }}>
                  <Avatar
                    src={
                      data?.user?.profilePictureUrl || session.user?.image || ""
                    }
                    sx={{
                      width: { xs: 30, lg: 40 },
                      height: { xs: 30, lg: 40 },
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
                  {data && data.user ? (
                    <Box>
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
                        <Avatar src={data?.user.profilePictureUrl || ""} />
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
                            {data?.user.username}
                          </Typography>
                          <Typography
                            variant="caption"
                            noWrap
                            color="text.secondary"
                          >
                            {data?.user.email}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      {session && session.user.role.includes("User") && (
                        <Box>
                          <MenuItem onClick={handleProfileMenu}>
                            <ListItemIcon>
                              <AccountBoxIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography textAlign="center" variant="body2">
                              ดูโปรไฟล์
                            </Typography>
                          </MenuItem>
                          <MenuItem onClick={handleEditProfileMenu}>
                            <ListItemIcon>
                              <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography textAlign="center" variant="body2">
                              แก้ไขข้อมูลส่วนตัว
                            </Typography>
                          </MenuItem>
                          <MenuItem onClick={handleFriendRequestMenu}>
                            <ListItemIcon>
                              <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            <Typography textAlign="center" variant="body2">
                              คำขอเป็นเพื่อน
                            </Typography>
                          </MenuItem>
                          <MenuItem onClick={handleUserEventSummary}>
                            <ListItemIcon>
                              <CalendarMonthIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography textAlign="center" variant="body2">
                              กิจกรรมที่เข้าร่วมทั้งหมด
                            </Typography>
                          </MenuItem>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Box>
                      {data?.status === 404 && (
                        <MenuItem onClick={handleCreateProfileMenu}>
                          <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography textAlign="center" variant="body2">
                            สร้างโปรไฟล์
                          </Typography>
                        </MenuItem>
                      )}
                    </Box>
                  )}
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
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
                sx={{ mx: "auto", fontSize: { xs: 12, lg: 14 } }}
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {session && session.user.role.includes("Admin") && (
          <Box
            component="nav"
            sx={{
              width: { lg: drawerWidth },
              flexShrink: { lg: 0 },
              zIndex: 2,
            }}
            aria-label="menu items"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", lg: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
                zIndex: 2,
              }}
            >
              <Toolbar />
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", lg: "block" },
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
            width: { lg: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
