import React, { ChangeEvent, useState } from "react";
import EventCard from "@/components/EventCard";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchEvents } from "@/services/events";
import { eventTypes } from "@/utils/eventTypes";
import SearchIcon from "@mui/icons-material/Search";
import InfiniteScroll from "react-infinite-scroller";
import { sortTypes } from "@/utils/sortTypes";
import EventNotFound from "@/components/EventNotFound";

export default function Events() {
  const pageSize = 20;
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [sortType, setSortType] = useState("0");

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["searchEvents", pageSize, eventName, eventType, sortType],
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

  const handleEventNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  const handleEventTypeChange = (event: SelectChangeEvent) => {
    setEventType(event.target.value);
  };

  const handleSortTypeChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value);
  };

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Typography
          component="h1"
          sx={{ mb: 2, fontWeight: "bold", fontSize: "18px" }}
        >
          กิจกรรมทั้งหมด
        </Typography>

        <Box
          sx={{ flexGrow: 1, bgcolor: "#EAEAEA", p: 2, mb: 3, borderRadius: 1 }}
        >
          <Grid container rowSpacing={3} columnSpacing={4}>
            <Grid item xs={12} lg={3}>
              <TextField
                type="search"
                placeholder="ค้นหาด้วยชื่อกิจกรรม"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
                }}
                color="secondary"
                size="small"
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  borderRadius: 1,
                }}
                onChange={handleEventNameChange}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: 14, md: 16 },
                    fontWeight: "bold",
                    width: 150,
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
                    <MenuItem value="">ทั้งหมด</MenuItem>
                    {eventTypes.map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: 14, md: 16 },
                    fontWeight: "bold",
                    width: 85,
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
                    {sortTypes.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
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
        ) : data?.pages[0] === null ||
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
            <EventNotFound />
          </Box>
        ) : (
          <InfiniteScroll
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
          >
            {data &&
              data.pages.map((page, index) => (
                <Box key={index} sx={{ mt: { xs: 2, md: 3 } }}>
                  <EventCard events={page?.events} />
                </Box>
              ))}
          </InfiniteScroll>
        )}
      </Container>
    </>
  );
}
