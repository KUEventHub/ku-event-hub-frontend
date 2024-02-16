import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";
import AcceptFriendRequestButton from "./AcceptFriendRequestButton";
import RejectFriendRequestButton from "./RejectFriendRequestButton";

export interface FriendRequestCardProps {
  userId: string;
  _id: string;
  username: string;
  profilePictureUrl: string;
  action: string;
}

export default function FriendRequestCard({
  userId,
  _id,
  username,
  profilePictureUrl,
  action,
}: FriendRequestCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        boxShadow: 1,
        borderRadius: 1,
        ":hover": {
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
      }}
    >
      <Link href={`/profile/${userId}`}>
        <Grid container wrap="wrap" spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={profilePictureUrl} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{username}</Typography>
          </Grid>
          <Grid item>
            {action === "received" && (
              <Box sx={{ display: "flex" }}>
                <Box>
                  <RejectFriendRequestButton _id={_id} />
                </Box>
                <Box sx={{ ml: 2 }}>
                  <AcceptFriendRequestButton _id={_id} />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Link>
    </Box>
  );
}
