import { eventTypes } from "@/utils/eventTypes";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";

export default function InterestedEventType({ formData, onInputChange }: any) {
  return (
    <Box>
      <Typography sx={{ mb: 2, fontWeight: "bold" }} color="text.secondary">
        ประเภทกิจกรรมที่สนใจ
      </Typography>

      <Box
        sx={{
          width: "100%",
          bgcolor: "#F1F1F1",
          borderRadius: "10px",
          p: 1.5,
        }}
      >
        {eventTypes.map((item, index) => (
          <FormControlLabel
            key={index}
            label={
              <Typography sx={{ fontSize: { xs: 12, md: 14 } }}>
                {item.name}
              </Typography>
            }
            control={
              <Checkbox
                checked={formData.interestedEventTypes.includes(item.name)}
                onChange={() => onInputChange(item.name)}
                size="small"
              />
            }
            sx={{
              bgcolor: "white",
              ml: 0.5,
              pr: 1.5,
              borderRadius: "10px",
              my: 0.75,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
