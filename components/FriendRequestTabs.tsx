import { Tabs, Tab } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface FriendRequestTabsProps {
  value: number;
  refetch: () => void;
}

export default function FriendRequestTabs({
  value,
  refetch,
}: FriendRequestTabsProps) {
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 1) {
      router.push("/friend-request/received");
    } else if (newValue === 2) {
      router.push("/friend-request/sent");
    }
  };

  return (
    <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
      <Tab value={1} label="คำขอเป็นเพื่อน" onClick={refetch} />
      <Tab value={2} label="คำขอที่ส่งแล้ว" onClick={refetch} />
    </Tabs>
  );
}
