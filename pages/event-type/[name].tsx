import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import EventCard from "@/components/EventCard";
import { searchEvents } from "@/services/events";
import { useInfiniteQuery } from "@tanstack/react-query";
import { eventTypes } from "@/utils/eventTypes";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

export default function EventTypePage() {
  const router = useRouter();
  const { name } = router.query;
  const pageSize = 20;
  const eventName = "";
  const [eventType, setEventType] = useState("");
  const [sortType, setSortType] = useState("0");

  useEffect(() => {
    const isTypeNameValid = eventTypes.some(
      (eventType) => eventType.name === name
    );
    if (name) {
      if (!isTypeNameValid) {
        router.push("/");
      }
      setEventType(name as string);
    }
  }, [name, router]);

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["eventType", pageSize, eventName, eventType, sortType],
    queryFn: ({ pageParam }) =>
      searchEvents(pageParam, pageSize, eventName, eventType, sortType),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage =
        lastPage && lastPage.events.length > 0
          ? lastPage.pageNumber + 1
          : undefined;
      return nextPage;
    },
  });

  const handleEventTypeChange = (event: SelectChangeEvent) => {
    router.push(`/event-type/${event.target.value}`);
  };

  const handleSortTypeChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h1" sx={{ mb: 2, fontSize: "18px" }}>
        <span style={{ fontWeight: "bold", marginRight: 10 }}>
          ประเภทกิจกรรม:
        </span>
        <span>{name}</span>
      </Typography>

      <Box
        sx={{ flexGrow: 1, bgcolor: "#EAEAEA", p: 2, mb: 3, borderRadius: 1 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: "bold",
                }}
              >
                ประเภทกิจกรรม
              </Typography>
              <FormControl
                sx={{
                  display: "flex",
                  width: { xs: "100%", lg: 375 },
                  ml: { xs: 1, lg: 2 },
                }}
                size="small"
              >
                <Select
                  id="type"
                  value={eventType}
                  onChange={handleEventTypeChange}
                  sx={{
                    bgcolor: "white",
                  }}
                  color="secondary"
                  displayEmpty
                >
                  {eventTypes.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: "bold",
                }}
              >
                เรียงโดย
              </Typography>
              <FormControl
                sx={{
                  display: "flex",
                  width: { xs: "100%", lg: 300 },
                  ml: { xs: 1, lg: 2 },
                }}
                size="small"
              >
                <Select
                  id="type"
                  value={sortType}
                  onChange={handleSortTypeChange}
                  sx={{
                    bgcolor: "white",
                  }}
                  color="secondary"
                >
                  <MenuItem value="0">วันที่สร้างกิจกรรมล่าสุด</MenuItem>
                  <MenuItem value="1">วันที่เริ่มต้นกิจกรรมเร็วที่สุด</MenuItem>
                  <MenuItem value="2">จำนวนผู้เข้าร่วมมากที่สุด</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {isLoading ? (
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mx: "auto" }}>
            <CircularProgress color="primary" />
          </Box>
        </Box>
      ) : !name ||
        data?.pages[0] === null ||
        data?.pages?.every((page) => page?.events?.length < 1) ? (
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mx: "auto" }}>
            ไม่พบกิจกรรม
          </Box>
        </Box>
      ) : (
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
          {data &&
            data.pages.map((page, index) => (
              <Box key={index} sx={{ mt: { xs: 2, md: 3 } }}>
                <EventCard events={page?.events} />
              </Box>
            ))}
        </InfiniteScroll>
      )}
    </Container>
  );
}
