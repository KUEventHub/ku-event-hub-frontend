import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import { formatDate, formatTime } from "@/utils/formatDateTime";

export interface ParticipatingEventCardProps {
  _id: string;
  name: string;
  eventTypes: string;
  imageUrl: string;
  activityHours: number;
  totalSeats: number;
  startTime: Date;
  endTime: Date;
  location: string;
  participantsCount: number;
}

export default function ParticipatingEventCard({
  _id,
  name,
  eventTypes,
  imageUrl,
  activityHours,
  totalSeats,
  startTime,
  endTime,
  location,
  participantsCount,
}: ParticipatingEventCardProps) {
  return (
    <Link href={`/events/${_id}`}>
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
            image={imageUrl}
            sx={{ width: { md: 350 }, flexShrink: 0, mr: 1, my: "auto" }}
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
              {name}
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
                mb: 1,
              }}
            >
              {eventTypes}
            </Typography>

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
                  {formatDate(new Date(startTime))}
                </span>
                {formatDate(new Date(startTime)) !==
                  formatDate(new Date(endTime)) && (
                  <>
                    <span style={{ margin: 3 }}> - </span>
                    <span>{formatDate(new Date(endTime))}</span>
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
                  {formatTime(new Date(startTime))}
                  <span style={{ margin: 3 }}> - </span>
                  {formatTime(new Date(endTime))}
                </span>
                <span style={{ marginLeft: 6 }}>ชั่วโมงกิจกรรม</span>
                <span style={{ margin: 6 }}>{activityHours}</span>
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
                {location}
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
                <span style={{ margin: 6 }}>{totalSeats}</span>
                คน
                <span style={{ margin: 6 }}>
                  (ลงทะเบียนแล้ว
                  <span style={{ margin: 6 }}>{participantsCount}</span>
                  คน)
                </span>
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}
