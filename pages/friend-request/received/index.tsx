import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useQuery } from "@tanstack/react-query";
import { getReceivedFriendRequests } from "@/services/friendRequests";
import { FriendRequest } from "@/interfaces/Friend";
import FriendRequestCard from "@/components/FriendRequestCard";
import FriendRequestTabs from "@/components/FriendRequestTabs";

export default function ReceivedFriendRequestPage() {
  const {
    data: received,
    isLoading: isLoadingReceivedRequests,
    refetch: refetchReceivedRequests,
  } = useQuery({
    queryKey: ["receivedFriendRequests"],
    queryFn: () => getReceivedFriendRequests(),
  });

  return (
    <Container component="main" maxWidth="lg">
      <FriendRequestTabs value={1} refetch={refetchReceivedRequests} />
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
              คำขอเป็นเพื่อน
            </Typography>
            {received?.requests?.length > 0 && (
              <Typography
                component="h1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                color="text.secondary"
              >
                ({received?.requests?.length} รายการ)
              </Typography>
            )}
          </Box>

          {isLoadingReceivedRequests ? (
            <Box sx={{ display: "flex", justifyContent: "center", mx: "auto" }}>
              <CircularProgress color="primary" />
            </Box>
          ) : received?.requests?.length > 0 ? (
            <Grid container spacing={2}>
              {received?.requests?.map((friend: FriendRequest) => (
                <Grid item xs={12} md={6} key={friend.user._id}>
                  <FriendRequestCard
                    userId={friend.user._id}
                    _id={friend._id}
                    username={friend.user.username}
                    profilePictureUrl={friend.user.profilePictureUrl}
                    action="received"
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
              <PersonAddIcon sx={{ fontSize: 50, mb: 1 }} />
              ไม่มีคำขอเป็นเพื่อน
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
