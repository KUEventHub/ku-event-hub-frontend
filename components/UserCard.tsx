import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AddFriendButton from "./AddFriendButton";

export interface UserCardProps {
  _id: string;
  username: string;
  profilePictureUrl: string;
  isSelf: boolean;
}

export default function UserCard({
  _id,
  username,
  profilePictureUrl,
  isSelf,
}: UserCardProps) {
  const { data: session } = useSession();

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
      <Link href={`/profile/${_id}`}>
        <Grid container wrap="wrap" spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={profilePictureUrl} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{username}</Typography>
          </Grid>
          {session && session.user.role.includes("User") && !isSelf && (
            <Grid item>
              <AddFriendButton _id={_id} />
            </Grid>
          )}
        </Grid>
      </Link>
    </Box>
  );
}
