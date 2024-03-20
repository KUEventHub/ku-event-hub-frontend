import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUserInfo } from "@/services/users";
import AddFriendButton from "@/components/AddFriendButton";
import PeopleIcon from "@mui/icons-material/People";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import UserCard from "@/components/UserCard";
import ShowUserInformationSetting from "@/components/ShowUserInformationSetting";
import ShowEventsSetting from "@/components/ShowEventsSetting";
import ShowFriendsSetting from "@/components/ShowFriendsSetting";
import ParticipatingEventCard, {
  ParticipatingEventCardProps,
} from "@/components/ParticipatingEventCard";
import Carousel from "react-material-ui-carousel";
import { FriendCard } from "@/interfaces/Friend";
import MyFriendButton from "@/components/MyFriendButton";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  const { data, isLoading } = useQuery({
    queryKey: ["profileInfo", id],
    queryFn: async () => {
      if (id !== undefined) {
        const data = await getUserInfo(id as string);
        return data;
      } else {
        return null;
      }
    },
  });

  const user = data?.user;

  return (
    <Container component="main" maxWidth="lg">
      {isLoading ? (
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mx: "auto" }}>
            <CircularProgress color="primary" />
          </Box>
        </Box>
      ) : user ? (
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12}>
              <Card
                sx={{
                  maxWidth: "100%",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: { sm: "flex" },
                    width: { sm: "100%" },
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ my: "auto" }}>
                      <Avatar
                        src={user.profilePictureUrl}
                        sx={{
                          width: 175,
                          height: 175,
                          m: 1,
                          mr: 2,
                          boxShadow: 1,
                        }}
                      />
                    </Box>
                    {user.isSameUser && user.role === "User" && (
                      <Box
                        sx={{
                          ml: "auto",
                          display: { xs: "initial", sm: "none" },
                        }}
                      >
                        <ShowUserInformationSetting
                          _id={user._id}
                          showUserInformation={
                            user.privacySettings.showUserInformation
                          }
                        />
                      </Box>
                    )}
                  </Box>
                  <CardContent sx={{ flex: 1, my: "auto" }}>
                    <Typography gutterBottom variant="h4">
                      {user.username}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      component="pre"
                      sx={{
                        mb: 2,
                      }}
                    >
                      {user.description}
                    </Typography>

                    {(user.information.show || user.isSameUser) && (
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ minWidth: 75 }}
                            >
                              ชื่อ-นามสกุล
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mx: 0.75,
                                wordBreak: "break-all",
                              }}
                            >
                              {user.information.firstName}{" "}
                              {user.information.lastName}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ minWidth: 30 }}
                            >
                              อีเมล
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mx: 1,
                                wordBreak: "break-all",
                              }}
                            >
                              {user.information.email}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ minWidth: 55 }}
                            >
                              รหัสนิสิต
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mx: 0.5,
                                wordBreak: "break-all",
                              }}
                            >
                              {user.information.idCode}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ minWidth: 30 }}
                            >
                              คณะ
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mx: 0.5,
                                wordBreak: "break-all",
                              }}
                            >
                              {user.information.faculty === "other"
                                ? "อื่น ๆ"
                                : user.information.faculty}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ minWidth: 30 }}
                            >
                              เพศ
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mx: 0.5,
                                wordBreak: "break-all",
                              }}
                            >
                              {user.information.gender === "male"
                                ? "ชาย"
                                : user.information.gender === "female"
                                ? "หญิง"
                                : "ไม่ระบุ"}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ minWidth: 80 }}
                            >
                              เบอร์โทรศัพท์
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mx: 0.5,
                                wordBreak: "break-all",
                              }}
                            >
                              {user.information.phoneNumber}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </CardContent>
                  <Box>
                    {session &&
                      session.user.role.includes("User") &&
                      user.role === "User" && (
                        <>
                          {user.isSameUser ? (
                            <Box
                              sx={{ display: { xs: "none", sm: "initial" } }}
                            >
                              <ShowUserInformationSetting
                                _id={user._id}
                                showUserInformation={
                                  user.privacySettings.showUserInformation
                                }
                              />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                m: { xs: 2, sm: 1 },
                                mt: { xs: 0, sm: 1 },
                              }}
                            >
                              {user.friendsInformation &&
                              user.friendsInformation.isFriend ? (
                                <MyFriendButton
                                  _id={user._id}
                                  username={user.username}
                                />
                              ) : user.friendsInformation &&
                                !user.friendsInformation.isFriend &&
                                !user.friendsInformation
                                  .hasOutgoingFriendRequest &&
                                !user.friendsInformation
                                  .hasReceivedFriendRequest ? (
                                <AddFriendButton _id={user._id} />
                              ) : user.friendsInformation &&
                                user.friendsInformation
                                  .hasOutgoingFriendRequest ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "gray",
                                    color: "white",
                                    ":hover": {
                                      backgroundColor: "text.secondary",
                                    },
                                  }}
                                  onClick={() => {
                                    router.push("/friend-request/sent");
                                  }}
                                >
                                  ส่งคำขอแล้ว
                                </Button>
                              ) : (
                                user.friendsInformation &&
                                user.friendsInformation
                                  .hasReceivedFriendRequest && (
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                      router.push("/friend-request/received");
                                    }}
                                  >
                                    ตอบรับคำขอ
                                  </Button>
                                )
                              )}
                            </Box>
                          )}
                        </>
                      )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              my: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  ml: 1.5,
                  mr: "auto",
                  mt: 1,
                }}
              >
                กิจกรรมที่เข้าร่วม
              </Typography>
              {session &&
                session.user.role.includes("User") &&
                user.isSameUser && (
                  <ShowEventsSetting
                    _id={user._id}
                    showEvents={user.privacySettings.showEvents}
                  />
                )}
            </Box>

            {user.events?.events?.length > 0 ? (
              <Carousel
                autoPlay={false}
                indicators={false}
                cycleNavigation={false}
                sx={{
                  p: 1.5,
                  height: { xs: 500, sm: 475, md: 250 },
                }}
              >
                {user.events.events.map((item: ParticipatingEventCardProps) => (
                  <Box key={item._id}>
                    <ParticipatingEventCard
                      _id={item._id}
                      name={item.name}
                      eventTypes={item.eventTypes}
                      imageUrl={item.imageUrl}
                      activityHours={item.activityHours}
                      totalSeats={item.totalSeats}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      location={item.location}
                      participantsCount={item.participantsCount}
                    />
                  </Box>
                ))}
              </Carousel>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  mx: "auto",
                  my: 2,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                color="text.secondary"
              >
                {user.events.show || user.isSameUser ? (
                  <Box>
                    <EventBusyIcon sx={{ fontSize: 50 }} />
                    <Typography sx={{ mb: 1 }}>ไม่มีกิจกรรมให้แสดง</Typography>
                  </Box>
                ) : (
                  <Box>
                    <Avatar
                      sx={{
                        bgcolor: "text.secondary",
                        mx: "auto",
                        mb: 1.5,
                        width: 50,
                        height: 50,
                      }}
                    >
                      <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography sx={{ mb: 1 }}>
                      ไม่มีกิจกรรมให้แสดง
                      <br />
                      เนื่องจากตั้งค่าไว้เป็นส่วนตัว
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              my: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  ml: 1.5,
                  mr: "auto",
                  mt: 1,
                }}
              >
                เพื่อนทั้งหมด
              </Typography>
              {session &&
                session.user.role.includes("User") &&
                user.isSameUser && (
                  <ShowFriendsSetting
                    _id={user._id}
                    showFriends={user.privacySettings.showFriends}
                  />
                )}
            </Box>

            {user.friends?.friends?.length > 0 ? (
              <Grid container spacing={2} sx={{ p: 1.5 }}>
                {user.friends.friends.map((friend: FriendCard) => (
                  <Grid item xs={12} md={6} key={friend._id}>
                    <UserCard
                      _id={friend._id}
                      username={friend.username}
                      profilePictureUrl={friend.profilePictureUrl}
                      isSelf={true}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  mx: "auto",
                  my: 2,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                color="text.secondary"
              >
                {user.friends.show || user.isSameUser ? (
                  <Box>
                    <PeopleIcon sx={{ fontSize: 50 }} />
                    <Typography sx={{ mb: 1 }}>ไม่มีเพื่อนให้แสดง</Typography>
                  </Box>
                ) : (
                  <Box>
                    <Avatar
                      sx={{
                        bgcolor: "text.secondary",
                        mx: "auto",
                        mb: 1.5,
                        width: 50,
                        height: 50,
                      }}
                    >
                      <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography sx={{ mb: 1 }}>
                      ไม่มีเพื่อนให้แสดง
                      <br />
                      เนื่องจากตั้งค่าไว้เป็นส่วนตัว
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mx: "auto",
              flexDirection: "column",
              alignItems: "center",
            }}
            color="text.secondary"
          >
            <PersonIcon sx={{ fontSize: 50, mb: 1 }} />
            ไม่พบผู้ใช้
          </Box>
        </Box>
      )}
    </Container>
  );
}
