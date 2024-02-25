import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useQuery } from "@tanstack/react-query";
import { getSentFriendRequests } from "@/services/friendRequests";
import { FriendRequest } from "@/interfaces/Friend";
import FriendRequestCard from "@/components/FriendRequestCard";
import FriendRequestTabs from "@/components/FriendRequestTabs";

export default function SentFriendRequestPage() {
  const {
    data: sent,
    isLoading: isLoadingSentRequests,
    refetch: refetchSentRequests,
  } = useQuery({
    queryKey: ["sentFriendRequests"],
    queryFn: () => getSentFriendRequests(),
  });

  return (
    <Container component="main" maxWidth="lg">
      <FriendRequestTabs value={2} refetch={refetchSentRequests} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2)",
          p: 4,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              flexWrap: "wrap",
              mb: 1.5,
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                mr: 1,
              }}
            >
              คำขอที่ส่งแล้ว
            </Typography>
            {sent?.requests?.length > 0 && (
              <Typography
                component="h1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                color="text.secondary"
              >
                ({sent?.requests?.length} รายการ)
              </Typography>
            )}
          </Box>

          {isLoadingSentRequests ? (
            <Box sx={{ display: "flex", justifyContent: "center", mx: "auto" }}>
              <CircularProgress color="primary" />
            </Box>
          ) : sent?.requests?.length > 0 ? (
            <Grid container spacing={2}>
              {sent?.requests?.map((friend: FriendRequest) => (
                <Grid item xs={12} md={6} key={friend.user._id}>
                  <FriendRequestCard
                    userId={friend.user._id}
                    _id={friend._id}
                    username={friend.user.username}
                    profilePictureUrl={friend.user.profilePictureUrl}
                    action="sent"
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
                my: 1,
                flexDirection: "column",
                alignItems: "center",
              }}
              color="text.secondary"
            >
              <PersonAddAlt1Icon sx={{ fontSize: 50, mb: 1 }} />
              ไม่มีคำขอที่ส่ง
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
