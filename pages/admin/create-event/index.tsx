import {
  Container,
  Box,
  Typography,
  InputLabel,
  TextField,
  Button,
  Grid,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useRef, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
  );
  const [activity_hours, setActivityHours] = useState("");
  const [total_seat, setTotalSeat] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleActivityHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActivityHours(event.target.value);
  };

  const handleTotalSeatChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTotalSeat(event.target.value);
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleCancel = () => {
    setName("");
    setType("");
    setImage(
      "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    );
    setActivityHours("");
    setTotalSeat("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setDescription("");
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const createEvent = () => {
    console.log(
      "Submit",
      name,
      type,
      image,
      activity_hours,
      total_seat,
      start_date,
      end_date,
      start_time,
      end_time,
      location,
      description
    );
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2)",
          p: { xs: 3, md: 6 },
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          สร้างกิจกรรม
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            component="img"
            src={image}
            sx={{ maxWidth: "100%", height: 250, m: 3 }}
          />
          <Button
            component="label"
            variant="contained"
            color="secondary"
          >
            เลือกไฟล์
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputRef}
            />
          </Button>
        </Box>
        <InputLabel
          shrink
          htmlFor="name"
          sx={{ mt: 4, fontSize: "18px", fontWeight: "bold" }}
        >
          ชื่อกิจกรรม
        </InputLabel>
        <TextField
          value={name}
          onChange={handleNameChange}
          type="text"
          id="name"
          hiddenLabel
          variant="outlined"
          color="secondary"
          size="small"
          sx={{
            mb: 1,
            bgcolor: "#F1F1F1",
          }}
        />

        <Grid container columnSpacing={{ xs: 1, md: 3 }} columns={16}>
          <Grid item xs={16} lg={8}>
            <InputLabel
              shrink
              htmlFor="type"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              ประเภทกิจกรรม
            </InputLabel>
            <FormControl sx={{ width: "100%" }} size="small">
              <Select
                id="type"
                value={type}
                onChange={handleTypeChange}
                sx={{
                  mb: 1,
                  bgcolor: "#F1F1F1",
                  width: "100%",
                }}
                color="secondary"
              >
                <MenuItem value="กิจกรรมมหาวิทยาลัย">
                  กิจกรรมมหาวิทยาลัย
                </MenuItem>
                <MenuItem value="กิจกรรมเพื่อเสริมสร้างสมรรถนะ">
                  กิจกรรมเพื่อเสริมสร้างสมรรถนะ
                </MenuItem>
                <MenuItem value="ด้านพัฒนาคุณธรรมจริยธรรม">
                  ด้านพัฒนาคุณธรรมจริยธรรม
                </MenuItem>
                <MenuItem value="ด้านพัฒนาทักษะการคิดและการเรียนรู้">
                  ด้านพัฒนาทักษะการคิดและการเรียนรู้
                </MenuItem>
                <MenuItem value="เสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร">
                  เสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร
                </MenuItem>
                <MenuItem value="ด้านพัฒนาสุขภาพ">ด้านพัฒนาสุขภาพ</MenuItem>
                <MenuItem value="กิจกรรมเพื่อสังคม">กิจกรรมเพื่อสังคม</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="activity_hours"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              จำนวนชั่วโมงกิจกรรม
            </InputLabel>
            <TextField
              value={activity_hours}
              onChange={handleActivityHoursChange}
              type="number"
              id="activity_hours"
              hiddenLabel
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                mb: 1,
                bgcolor: "#F1F1F1",
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="total_seat"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              จำนวนที่รับ
            </InputLabel>
            <TextField
              value={total_seat}
              onChange={handleTotalSeatChange}
              type="number"
              id="total_seat"
              hiddenLabel
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                mb: 1,
                bgcolor: "#F1F1F1",
                width: "100%",
              }}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ xs: 1, md: 3 }} columns={16}>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="start_date"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              วันที่เริ่มต้นกิจกรรม
            </InputLabel>
            <TextField
              value={start_date}
              onChange={handleStartDateChange}
              type="date"
              id="start_date"
              hiddenLabel
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                mb: 1,
                bgcolor: "#F1F1F1",
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="end_date"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              วันที่สิ้นสุดกิจกรรม
            </InputLabel>
            <TextField
              value={end_date}
              onChange={handleEndDateChange}
              type="date"
              id="end_date"
              hiddenLabel
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                mb: 1,
                bgcolor: "#F1F1F1",
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="start_time"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              เวลาเริ่มต้นกิจกรรม
            </InputLabel>
            <TextField
              value={start_time}
              onChange={handleStartTimeChange}
              type="time"
              id="start_time"
              hiddenLabel
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                mb: 1,
                bgcolor: "#F1F1F1",
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="end_time"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              เวลาสิ้นสุดกิจกรรม
            </InputLabel>
            <TextField
              value={end_time}
              onChange={handleEndTimeChange}
              type="time"
              id="end_time"
              hiddenLabel
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                mb: 1,
                bgcolor: "#F1F1F1",
                width: "100%",
              }}
            />
          </Grid>
        </Grid>

        <InputLabel
          shrink
          htmlFor="location"
          sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
        >
          สถานที่
        </InputLabel>
        <TextField
          value={location}
          onChange={handleLocationChange}
          type="text"
          id="location"
          hiddenLabel
          variant="outlined"
          color="secondary"
          size="small"
          sx={{
            mb: 1,
            bgcolor: "#F1F1F1",
          }}
        />

        <InputLabel
          shrink
          htmlFor="description"
          sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
        >
          รายละเอียด
        </InputLabel>
        <TextField
          value={description}
          onChange={handleDescriptionChange}
          type="text"
          id="description"
          hiddenLabel
          variant="outlined"
          color="secondary"
          size="small"
          sx={{
            mb: 1,
            bgcolor: "#F1F1F1",
          }}
          multiline
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              mr: 2,
              bgcolor: "#F1F1F1",
              color: "black",
              ":hover": {
                backgroundColor: "#dadada",
              },
            }}
            onClick={handleCancel}
          >
            ยกเลิก
          </Button>
          <Button variant="contained" color="secondary" onClick={createEvent}>
            สร้างกิจกรรม
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
