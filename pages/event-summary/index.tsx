import { getUserEventSummary } from "@/services/users";
import ParticipatingEventCard from "@/components/ParticipatingEventCard";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  Box,
  AccordionDetails,
  Grid,
  Button,
  Skeleton,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EventSummary } from "@/interfaces/Event";
import CheckIcon from "@mui/icons-material/Check";

export default function EventSummary() {
  const [filterConfirmed, setFilterConfirmed] = useState(true);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["userEventSummary", !filterConfirmed],
    queryFn: () => getUserEventSummary(!filterConfirmed),
  });

  const eventItems = [
    { name: "กิจกรรมมหาวิทยาลัย" },
    { name: "กิจกรรมเพื่อเสริมสร้างสมรรถนะ" },
    { name: "กิจกรรมเพื่อสังคม" },
  ];

  const handleFilterConfirmed = () => {
    queryClient.resetQueries({ queryKey: ["userEventSummary"] });
    setFilterConfirmed(!filterConfirmed);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        gap={1}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            mr: 1,
          }}
        >
          กิจกรรมที่เข้าร่วมทั้งหมด
        </Typography>
        <Button
          sx={{
            color: filterConfirmed ? "#B2BB1C" : "gray",
            border: filterConfirmed ? "1px solid #B2BB1C" : "1px solid gray",
          }}
          startIcon={filterConfirmed && <CheckIcon />}
          size="small"
          onClick={handleFilterConfirmed}
        >
          รวมกิจกรรมที่ลงทะเบียน
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        {isLoading ? (
          <Box>
            {eventItems?.map((event, index) => (
              <Accordion sx={{ p: 1 }} key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Skeleton sx={{ width: { xs: "70%", sm: 300 } }} />
                </AccordionSummary>
              </Accordion>
            ))}
          </Box>
        ) : data?.summary?.length > 0 ? (
          data?.summary?.map((summary: EventSummary, index: number) => (
            <Accordion
              sx={{ p: 1 }}
              key={index}
              defaultExpanded={summary.count > 0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Box
                  sx={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      mr: 1,
                    }}
                  >
                    {index + 1}. {summary.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                    }}
                    color="text.secondary"
                  >
                    ({summary.count} กิจกรรม {summary.hours} ชั่วโมง)
                  </Typography>
                </Box>
              </AccordionSummary>
              {summary.count > 0 && summary.children.events ? (
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {summary.children.events.map((item) => (
                      <Grid item xs={12} key={item.id}>
                        <ParticipatingEventCard
                          _id={item.id}
                          name={item.name}
                          eventTypes={item.eventTypes[0].name}
                          imageUrl={item.imageUrl}
                          activityHours={item.activityHours}
                          totalSeats={item.totalSeats}
                          startTime={item.startTime}
                          endTime={item.endTime}
                          location={item.location}
                          participantsCount={item.participantsCount}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              ) : (
                <>
                  {summary.children.subtype && (
                    <AccordionDetails>
                      {summary.children.subtype.map(
                        (subtype, index: number) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "end",
                                flexWrap: "wrap",
                                mb: 2,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  mr: 1,
                                }}
                              >
                                {subtype.name}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "15px",
                                }}
                                color="text.secondary"
                              >
                                ({subtype.count} กิจกรรม {subtype.hours}{" "}
                                ชั่วโมง)
                              </Typography>
                            </Box>
                            <Grid container spacing={3}>
                              {subtype.events.map((item) => (
                                <Grid item xs={12} key={item.id}>
                                  <ParticipatingEventCard
                                    _id={item.id}
                                    name={item.name}
                                    eventTypes={item.eventTypes[0].name}
                                    imageUrl={item.imageUrl}
                                    activityHours={item.activityHours}
                                    totalSeats={item.totalSeats}
                                    startTime={item.startTime}
                                    endTime={item.endTime}
                                    location={item.location}
                                    participantsCount={item.participantsCount}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )
                      )}
                    </AccordionDetails>
                  )}
                </>
              )}
            </Accordion>
          ))
        ) : (
          <>
            {eventItems?.map((event, index) => (
              <Accordion sx={{ p: 1 }} key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "end",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        mr: 1,
                      }}
                    >
                      {index + 1}. {event.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                      }}
                      color="text.secondary"
                    >
                      (0 กิจกรรม 0 ชั่วโมง)
                    </Typography>
                  </Box>
                </AccordionSummary>
              </Accordion>
            ))}
          </>
        )}
      </Box>
    </Container>
  );
}
