import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { getEventInfo } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import DeleteEventButton from "@/components/DeleteEventButton";
import EditEventButton from "@/components/EditEventButton";
import JoinEventButton from "@/components/JoinEventButton";
import { formatDate, formatTime } from "@/utils/formatDateTime";
import { useSession } from "next-auth/react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import UserCard, { UserCardProps } from "@/components/UserCard";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import EventNotFound from "@/components/EventNotFound";
import LeaveEventButton from "@/components/LeaveEventButton";
import ScanQRCode from "@/components/ScanQRCode";
import QRCodeButton from "@/components/QRCodeButton";

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

export default function EventInfoPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useQuery({
    queryKey: ["eventInfo", id],
    queryFn: async () => {
      if (id !== undefined) {
        const data = await getEventInfo(id as string);
        return data;
      } else {
        return null;
      }
    },
  });

  return (
    <Container component="main" maxWidth="lg">
      {isLoading ? (
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
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    p: 2,
                    bgcolor: "#dadada",
                  }}
                >
                  <Skeleton sx={{ width: "80%" }} />
                </Typography>

                <Box sx={{ display: { md: "flex" }, width: { md: "100%" } }}>
                  <Skeleton
                    sx={{
                      width: { md: 400 },
                      m: { md: 2 },
                      borderRadius: { md: 1 },
                    }}
                    height={250}
                    variant="rectangular"
                  />
                  <CardContent sx={{ flex: 1, my: "auto" }}>
                    <Skeleton sx={{ width: 150, height: 40 }} />
                    <Skeleton
                      sx={{ width: { xs: "70%", md: "50%" }, height: 40 }}
                    />
                    <Skeleton
                      sx={{ width: { xs: "80%", md: "60%" }, height: 40 }}
                    />
                    <Skeleton
                      sx={{ width: { xs: "60%", md: "40%" }, height: 40 }}
                    />
                    <Skeleton
                      sx={{ width: { xs: "65%", md: "45%" }, height: 40 }}
                    />
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Box
            sx={{
              bgcolor: "white",
              p: 3,
              my: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Skeleton sx={{ width: 100, height: 40 }} />
            <Skeleton sx={{ width: "100%", height: 40 }} />
            <Skeleton sx={{ width: "90%", height: 40 }} />
          </Box>

          <Box
            sx={{
              bgcolor: "white",
              p: 3,
              my: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Skeleton sx={{ width: 200, height: 40 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "white",
                    boxShadow: 1,
                    borderRadius: 1,
                    mt: 1,
                  }}
                >
                  <Grid container wrap="wrap" spacing={2} alignItems="center">
                    <Grid item>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                      />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Skeleton sx={{ width: "70%", height: 40 }} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : data && data.event ? (
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
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    p: 2,
                    bgcolor: "#dadada",
                  }}
                >
                  {data.event.name}
                </Typography>

                <Box sx={{ display: { md: "flex" }, width: { md: "100%" } }}>
                  <Box
                    sx={{
                      position: "relative",
                      my: "auto",
                    }}
                  >
                    <CardMedia
                      onClick={handleOpen}
                      component="img"
                      height="250"
                      image={data.event.imageUrl}
                      sx={{
                        width: { md: 400 },
                        flexShrink: 0,
                        m: { md: 2 },
                        borderRadius: { md: 1 },
                        cursor: "pointer",
                      }}
                    />
                    {!data.event.isActive && (
                      <Typography
                        variant="body2"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bgcolor: "#EAEAEA",
                          fontWeight: "bold",
                          borderRadius: 2,
                          p: 1,
                          m: 2,
                          display: { xs: "initial", md: "none" },
                        }}
                      >
                        กิจกรรมสิ้นสุดแล้ว
                      </Typography>
                    )}
                  </Box>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <IconButton
                        onClick={handleClose}
                        sx={{ position: "absolute", top: 0, right: 0 }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <CardMedia
                        component="img"
                        image={data.event.imageUrl}
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  </Modal>
                  <CardContent sx={{ flex: 1, my: "auto" }}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{
                        p: 1,
                        bgcolor: "#EAEAEA",
                        borderRadius: 2,
                        fontWeight: "bold",
                        mr: 2,
                        display: "inline-block",
                      }}
                    >
                      {data.event.eventTypes}
                    </Typography>

                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        my: 1,
                      }}
                      color="text.secondary"
                    >
                      <CalendarMonthIcon sx={{ mr: 1, mb: 0.5 }} />
                      <Typography
                        variant="body2"
                        gutterBottom
                        color="text.secondary"
                        sx={{
                          display: "inline-block",
                          fontSize: { xs: 14, sm: 15, md: 16 },
                        }}
                      >
                        วันที่
                        <span style={{ marginLeft: 6 }}>
                          {formatDate(new Date(data.event.startTime))}
                        </span>
                        {formatDate(new Date(data.event.startTime)) !==
                          formatDate(new Date(data.event.endTime)) && (
                          <>
                            <span style={{ margin: 3 }}> - </span>
                            <span>
                              {formatDate(new Date(data.event.endTime))}
                            </span>
                          </>
                        )}
                      </Typography>
                    </Box>

                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        my: 1,
                      }}
                      color="text.secondary"
                    >
                      <AccessTimeIcon sx={{ mr: 1, mb: 0.5 }} />
                      <Typography
                        variant="body2"
                        gutterBottom
                        color="text.secondary"
                        sx={{
                          display: "inline-block",
                          fontSize: { xs: 14, sm: 15, md: 16 },
                        }}
                      >
                        เวลา
                        <span style={{ margin: 6 }}>
                          {formatTime(new Date(data.event.startTime))}
                          <span style={{ margin: 3 }}> - </span>
                          {formatTime(new Date(data.event.endTime))}
                        </span>
                        <span style={{ marginLeft: 6 }}>ชั่วโมงกิจกรรม</span>
                        <span style={{ margin: 6 }}>
                          {data.event.activityHours}
                        </span>
                        ชั่วโมง
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      gutterBottom
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: { xs: 14, sm: 15, md: 16 },
                        mb: 1.5,
                      }}
                    >
                      <PlaceIcon sx={{ mr: 1 }} />
                      {data.event.location}
                    </Typography>

                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                      color="text.secondary"
                    >
                      <PeopleIcon sx={{ mr: 1 }} />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "inline-block",
                          fontSize: { xs: 14, sm: 15, md: 16 },
                        }}
                      >
                        จำนวนที่รับ
                        <span style={{ margin: 6 }}>
                          {data.event.totalSeats}
                        </span>
                        คน
                        <span style={{ margin: 6 }}>
                          (ลงทะเบียนแล้ว
                          <span style={{ margin: 6 }}>
                            {data.event.participantsCount}
                          </span>
                          คน)
                        </span>
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", md: "column" },
                      flexWrap: "wrap",
                    }}
                  >
                    {!data.event.isActive && (
                      <Button
                        disabled
                        variant="contained"
                        size="small"
                        sx={{
                          display: { xs: "none", md: "initial" },
                          m: 2,
                          mb: 0,
                        }}
                      >
                        กิจกรรมสิ้นสุดแล้ว
                      </Button>
                    )}
                    {session && session.user.role.includes("User") && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "row", md: "column" },
                          flexWrap: "wrap",
                          m: 2,
                          mt: { xs: 0, md: 2 },
                        }}
                        gap={2}
                      >
                        {data.event.userHasConfirmedParticipation ? (
                          <Typography
                            variant="caption"
                            sx={{
                              p: 1,
                              py: 0.5,
                              bgcolor: "gray",
                              borderRadius: 1,
                              color: "white",
                              fontSize: 13,
                              textAlign: "center",
                            }}
                          >
                            เข้าร่วมกิจกรรมแล้ว
                          </Typography>
                        ) : (
                          data.event.hasQrCode &&
                          data.event.userHasJoinedEvent && (
                            <ScanQRCode
                              id={id as string}
                              name={data.event.name}
                            />
                          )
                        )}
                        {data.event.isActive ? (
                          <>
                            {data.event.userHasJoinedEvent &&
                            !data.event.userHasConfirmedParticipation ? (
                              <LeaveEventButton _id={id as string} />
                            ) : (
                              !data.event.userHasJoinedEvent &&
                              !data.event.userHasConfirmedParticipation && (
                                <JoinEventButton _id={id as string} />
                              )
                            )}
                          </>
                        ) : (
                          data.event.userHasJoinedEvent &&
                          !data.event.userHasConfirmedParticipation && (
                            <Typography
                              variant="caption"
                              sx={{
                                p: 1,
                                py: 0.5,
                                bgcolor: "gray",
                                borderRadius: 1,
                                color: "white",
                                fontSize: 13,
                                textAlign: "center",
                              }}
                            >
                              ลงทะเบียนแล้ว
                            </Typography>
                          )
                        )}
                      </Box>
                    )}
                    {session && session.user.role.includes("Admin") && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "row", md: "column" },
                          flexWrap: "wrap",
                          m: 2,
                          mt: { xs: 0, md: 2 },
                        }}
                        gap={2}
                      >
                        <QRCodeButton id={id as string} />
                        <EditEventButton id={id as string} />
                        <DeleteEventButton
                          id={id as string}
                          name={data.event.name}
                          participantsCount={data.event.participantsCount}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Box
            sx={{
              bgcolor: "white",
              p: 3,
              my: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Typography
              component="h1"
              sx={{ mb: 1, fontSize: "16px", fontWeight: "bold" }}
            >
              รายละเอียด
            </Typography>

            <Typography
              sx={{ fontSize: "16px" }}
              color="text.secondary"
              whiteSpace="pre-line"
            >
              {data.event.description}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "white",
              p: 3,
              my: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Typography
              component="h1"
              sx={{ mb: 1.5, fontSize: "16px", fontWeight: "bold" }}
            >
              ผู้เข้าร่วมกิจกรรมทั้งหมด
            </Typography>

            {data.event.participants.length > 0 ? (
              <Grid container spacing={2}>
                {data.event.participants.map((participant: UserCardProps) => (
                  <Grid item xs={12} md={6} key={participant._id}>
                    <UserCard
                      _id={participant._id}
                      name={participant.name}
                      profilePictureUrl={participant.profilePictureUrl}
                      isSelf={true}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mx: "auto",
                  my: 2,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                color="text.secondary"
              >
                <PeopleIcon sx={{ fontSize: 50, mb: 1 }} />
                ไม่มีผู้เข้าร่วมกิจกรรม
              </Box>
            )}
          </Box>

          {session && session.user.role.includes("Admin") && (
            <Box
              sx={{
                bgcolor: "white",
                p: 3,
                my: 2,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Typography
                component="h1"
                sx={{ mb: 1.5, fontSize: "16px", fontWeight: "bold" }}
              >
                ผู้เข้าร่วมกิจกรรมที่ยืนยันแล้ว
              </Typography>

              {data.event.confirmedParticipants.length > 0 ? (
                <Grid container spacing={2}>
                  {data.event.confirmedParticipants.map(
                    (participant: UserCardProps) => (
                      <Grid item xs={12} md={6} key={participant._id}>
                        <UserCard
                          _id={participant._id}
                          name={participant.name}
                          profilePictureUrl={participant.profilePictureUrl}
                          isSelf={true}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mx: "auto",
                    my: 2,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  color="text.secondary"
                >
                  <PeopleIcon sx={{ fontSize: 50, mb: 1 }} />
                  ไม่มีผู้เข้าร่วมกิจกรรมที่ยืนยันแล้ว
                </Box>
              )}
            </Box>
          )}
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
          <EventNotFound />
        </Box>
      )}
    </Container>
  );
}
