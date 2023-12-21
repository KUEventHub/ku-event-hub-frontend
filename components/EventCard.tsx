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

interface Event {
  id: number;
  name: string;
  type: string;
  image: string;
  activity_hours: number;
  total_seat: number;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
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
      {events.map((item) => (
        <Grid item xs={12} sm={4} md={12} key={item.id}>
          <Link href="/">
            <Card
              sx={{
                maxWidth: "100%",
                ":hover": {
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                },
              }}
            >
              <Box sx={{ display: { md: "flex" }, width: { md: "100%" } }}>
                <CardMedia
                  component="img"
                  height="225"
                  image={item.image}
                  sx={{ width: { md: 350 }, flexShrink: 0, mr: 1 }}
                />
                <CardContent sx={{ flex: 1, my: "auto" }}>
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
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{
                      p: 1,
                      bgcolor: "#EAEAEA",
                      borderRadius: 2,
                      fontWeight: "bold",
                      mr: 2,
                      display: "inline-block",
                    }}
                  >
                    {item.type}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mr: 2,
                      fontSize: { xs: 12, md: 14 },
                    }}
                  >
                    <CalendarMonthIcon sx={{ mr: 1 }} />
                    วันที่
                    <span style={{ margin: 6 }}>{item.date}</span>
                  </Typography>
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
                        {item.start_time} น.- {item.end_time} น.
                      </span>
                      <span style={{ marginLeft: 6 }}>ชั่วโมงกิจกรรม</span>
                      <span style={{ margin: 6 }}>{item.activity_hours}</span>
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
                      fontSize: { xs: 12, md: 14 },
                    }}
                  >
                    <PlaceIcon sx={{ mr: 1 }} />
                    {item.location}
                  </Typography>

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
                      <span style={{ margin: 6 }}>{item.total_seat}</span>
                      คน
                      <span style={{ margin: 6 }}>
                        (ลงทะเบียนแล้ว<span style={{ margin: 6 }}>0</span>คน)
                      </span>
                    </Typography>
                  </Box>
                </CardContent>
                <Box>
                  {session && (
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      sx={{ m: { xs: 2, md: 3 }, mt: { xs: 0, md: 3 } }}
                    >
                      เข้าร่วมกิจกรรม
                    </Button>
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
