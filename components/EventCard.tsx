import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import EditEventButton from "./EditEventButton";
import DeleteEventButton from "./DeleteEventButton";
import { formatDate, formatTime } from "@/utils/formatDateTime";

interface EventTypes {
  _id: string;
  name: string;
}

export interface Event {
  _id: string;
  name: string;
  eventTypes: EventTypes[];
  imageUrl: string;
  activityHours: number;
  totalSeats: number;
  startTime: Date;
  endTime: Date;
  location: string;
  participantsCount: number;
  isActive: boolean;
}

interface EventCardProps {
  events: Event[];
}

export default function EventCard({ events }: EventCardProps) {
  const { data: session } = useSession();

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {events?.map((item) => (
        <Grid item xs={12} sm={4} md={12} key={item._id}>
          <Link href={`/events/${item._id}`}>
            <Card
              sx={{
                maxWidth: "100%",
                ":hover": {
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                },
              }}
            >
              <Box sx={{ display: { md: "flex" }, width: { md: "100%" } }}>
                <Box
                  sx={{
                    position: "relative",
                    opacity: item.isActive ? "initial" : 0.7,
                    my: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="225"
                    image={item.imageUrl}
                    sx={{
                      width: { md: 350 },
                      flexShrink: 0,
                      mr: 1,
                      my: "auto",
                    }}
                  />
                  {!item.isActive && (
                    <Typography
                      variant="caption"
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
                <CardContent
                  sx={{
                    flex: 1,
                    my: "auto",
                    opacity: item.isActive ? "initial" : 0.7,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                    }}
                  >
                    {item.name}
                  </Typography>

                  {item.eventTypes.map((eventType) => (
                    <Typography
                      key={eventType._id}
                      gutterBottom
                      variant="caption"
                      sx={{
                        p: 1,
                        bgcolor: "#EAEAEA",
                        borderRadius: 2,
                        fontWeight: "bold",
                        mr: 2,
                        display: "inline-block",
                        mb: 1,
                      }}
                    >
                      {eventType.name}
                    </Typography>
                  ))}

                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    color="text.secondary"
                  >
                    <CalendarMonthIcon sx={{ mr: 1 }} />
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="text.secondary"
                      sx={{
                        display: "inline-block",
                        fontSize: { xs: 12, md: 14 },
                      }}
                    >
                      วันที่
                      <span style={{ marginLeft: 6 }}>
                        {formatDate(new Date(item.startTime))}
                      </span>
                      {formatDate(new Date(item.startTime)) !==
                        formatDate(new Date(item.endTime)) && (
                        <>
                          <span style={{ margin: 3 }}> - </span>
                          <span>{formatDate(new Date(item.endTime))}</span>
                        </>
                      )}
                    </Typography>
                  </Box>

                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
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
                        fontSize: { xs: 12, md: 14 },
                      }}
                    >
                      เวลา
                      <span style={{ margin: 6 }}>
                        {formatTime(new Date(item.startTime))}
                        <span style={{ margin: 3 }}> - </span>
                        {formatTime(new Date(item.endTime))}
                      </span>
                      <span style={{ marginLeft: 6 }}>ชั่วโมงกิจกรรม</span>
                      <span style={{ margin: 6 }}>{item.activityHours}</span>
                      ชั่วโมง
                    </Typography>
                  </Box>

                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    color="text.secondary"
                  >
                    <PlaceIcon sx={{ mr: 1 }} />

                    <Typography
                      variant="body2"
                      gutterBottom
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        fontSize: { xs: 12, md: 14 },
                      }}
                    >
                      {item.location}
                    </Typography>
                  </Box>

                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    color="text.secondary"
                  >
                    <PeopleIcon sx={{ mr: 1 }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "inline-block",
                        fontSize: { xs: 12, md: 14 },
                      }}
                    >
                      จำนวนที่รับ
                      <span style={{ margin: 6 }}>{item.totalSeats}</span>
                      คน
                      <span style={{ margin: 6 }}>
                        (ลงทะเบียนแล้ว
                        <span style={{ margin: 6 }}>
                          {item.participantsCount}
                        </span>
                        คน)
                      </span>
                    </Typography>
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    display:
                      session?.user.role.includes("Admin") || !item.isActive
                        ? "flex"
                        : "none",
                    flexDirection: { xs: "row", md: "column" },
                    flexWrap: "wrap",
                    m: {
                      xs: session?.user.role.includes("Admin") ? 2 : 0,
                      md: 3,
                    },
                    mt: { xs: 0, md: 3 },
                  }}
                  gap={2}
                >
                  {!item.isActive && (
                    <Button
                      disabled
                      variant="contained"
                      size="small"
                      sx={{ display: { xs: "none", md: "initial" } }}
                    >
                      กิจกรรมสิ้นสุดแล้ว
                    </Button>
                  )}
                  {session && session.user.role.includes("Admin") && (
                    <>
                      <EditEventButton id={item._id} />
                      <DeleteEventButton
                        id={item._id}
                        name={item.name}
                        participantsCount={item.participantsCount}
                      />
                    </>
                  )}
                </Box>
              </Box>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
