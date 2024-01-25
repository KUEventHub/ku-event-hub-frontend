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
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { editEventInfo, getEventInfoForEdit } from "@/services/events";
import { showSnackbar } from "@/utils/showSnackbar";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { eventTypes } from "@/utils/eventTypes";
import { useQuery } from "@tanstack/react-query";
import { formatDateInput, formatTimeInput } from "@/utils/formatDateTime";

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

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery({
    queryKey: ["eventInfoForEdit", id],
    queryFn: async () => {
      if (id !== undefined) {
        const data = await getEventInfoForEdit(id as string);
        return data;
      } else {
        return null;
      }
    },
  });

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [base64Image, setBase64Image] = useState<string | undefined>("");
  const [activity_hours, setActivityHours] = useState("");
  const [total_seat, setTotalSeat] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    [key: string]: boolean;
  }>({
    name: false,
    activity_hours: false,
    total_seat: false,
    start_date: false,
    end_date: false,
    start_time: false,
    end_time: false,
    location: false,
    description: false,
    type: false,
    base64Image: false,
  });
  const [loading, setLoading] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    if (data) {
      const startDate = formatDateInput(new Date(data.event.startTime));
      const endDate = formatDateInput(new Date(data.event.endTime));
      const startTime = formatTimeInput(new Date(data.event.startTime));
      const endTime = formatTimeInput(new Date(data.event.endTime));

      setName(data.event.name);
      setType(data.event.eventTypes);
      setBase64Image(data.event.imageUrl);
      setActivityHours(data.event.activityHours);
      setTotalSeat(data.event.totalSeats);
      setStartDate(startDate);
      setEndDate(endDate);
      setStartTime(startTime);
      setEndTime(endTime);
      setLocation(data.event.location);
      setDescription(data.event.description);
    } else if (id && data === null) {
      router.push("/admin/events");
    }
  }, [data, id, router]);

  const convertImageToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result?.toString().split(",")[1];
      setEditImage(true);
      setBase64Image(base64);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      if (file.size > MAX_FILE_SIZE) {
        showSnackbar("รูปภาพต้องมีขนาดไม่เกิน 5 MB", "error");
        return;
      }
      convertImageToBase64(file);
    }
  };

  const handleActivityHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActivityHours(event.target.value);
  };

  const handleTotalSeatChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (parseInt(value) > 0 || isNaN(parseInt(value))) {
      setTotalSeat(value);
    }
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

  const handleEditEvent = async () => {
    const startTime = new Date(`${start_date}T${start_time}`).getTime();
    const endTime = new Date(`${end_date}T${end_time}`).getTime();

    const eventData = {
      event: {
        name: name,
        activityHours: activity_hours,
        totalSeats: total_seat,
        startTime: startTime,
        endTime: endTime,
        location: location,
        description: description,
        eventTypes: [type],
        image: {
          url: editImage ? undefined : base64Image,
          base64Image: editImage ? base64Image : undefined,
        },
      },
    };

    setErrors({});

    const newErrors: {
      [key: string]: boolean;
    } = {
      name: !name,
      activity_hours: !activity_hours,
      total_seat: !total_seat,
      start_date: !start_date,
      end_date: !end_date,
      start_time: !start_time,
      end_time: !end_time,
      location: !location,
      description: !description,
      type: !type,
      base64Image: !base64Image,
    };

    if (
      newErrors.name ||
      newErrors.activity_hours ||
      newErrors.total_seat ||
      newErrors.start_date ||
      newErrors.start_time ||
      newErrors.end_date ||
      newErrors.end_time ||
      newErrors.location ||
      newErrors.description ||
      newErrors.type ||
      newErrors.base64Image
    ) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await editEventInfo(id as string, eventData);
      showSnackbar("แก้ไขกิจกรรมสำเร็จ", "success");
      router.push(`/events/${id}`);
    } catch (error: any) {
      if (error && error.response) {
        const { status } = error.response;
        if (status === 401) {
          SessionExpiredPopup();
        } else {
          showSnackbar("แก้ไขกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
        }
      } else {
        showSnackbar("แก้ไขกิจกรรมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
      }
    }

    setLoading(false);
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
          แก้ไขกิจกรรม
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
            src={
              editImage ? `data:image/png;base64,${base64Image}` : base64Image
            }
            sx={{ maxWidth: "100%", height: 250, m: 3 }}
          />
          <Button component="label" variant="contained" color="secondary">
            แก้ไขรูปภาพ
            <VisuallyHiddenInput
              type="file"
              accept=".png, .jpeg, .jpg"
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
          ชื่อกิจกรรม<span style={{ color: "red", marginLeft: 6 }}>*</span>
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
          error={errors.name}
        />
        {errors.name && (
          <Typography color="error" variant="caption">
            กรุณากรอกชื่อกิจกรรม
          </Typography>
        )}
        <Grid container columnSpacing={{ xs: 1, md: 3 }} columns={16}>
          <Grid item xs={16} lg={8}>
            <InputLabel
              shrink
              htmlFor="type"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              ประเภทกิจกรรม
              <span style={{ color: "red", marginLeft: 6 }}>*</span>
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
                error={errors.type}
              >
                {eventTypes.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.type && (
                <Typography color="error" variant="caption">
                  กรุณาเลือกประเภทกิจกรรม
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="activity_hours"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              จำนวนชั่วโมงกิจกรรม
              <span style={{ color: "red", marginLeft: 6 }}>*</span>
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
              inputProps={{
                min: 0,
                onKeyPress: (event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                },
              }}
              error={errors.activity_hours}
            />
            {errors.activity_hours && (
              <Typography color="error" variant="caption">
                กรุณากรอกจำนวนชั่วโมงกิจกรรม
              </Typography>
            )}
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="total_seat"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              จำนวนที่รับ (คน)
              <span style={{ color: "red", marginLeft: 6 }}>*</span>
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
              inputProps={{
                min: 1,
                onKeyPress: (event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "."
                  ) {
                    event.preventDefault();
                  }
                },
              }}
              error={errors.total_seat}
            />
            {errors.total_seat && (
              <Typography color="error" variant="caption">
                กรุณากรอกจำนวนที่รับ (คน)
              </Typography>
            )}
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
              <span style={{ color: "red", marginLeft: 6 }}>*</span>
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
              error={errors.start_date}
            />
            {errors.start_date && (
              <Typography color="error" variant="caption">
                กรุณาเลือกวันที่เริ่มต้นกิจกรรม
              </Typography>
            )}
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="end_date"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              วันที่สิ้นสุดกิจกรรม
              <span style={{ color: "red", marginLeft: 6 }}>*</span>
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
              error={errors.end_date}
            />
            {errors.end_date && (
              <Typography color="error" variant="caption">
                กรุณาเลือกวันที่สิ้นสุดกิจกรรม
              </Typography>
            )}
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="start_time"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              เวลาเริ่มต้นกิจกรรม
              <span style={{ color: "red", marginLeft: 6 }}>*</span>
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
              error={errors.start_time}
            />
            {errors.start_time && (
              <Typography color="error" variant="caption">
                กรุณาเลือกเวลาเริ่มต้นกิจกรรม
              </Typography>
            )}
          </Grid>
          <Grid item xs={16} lg={4}>
            <InputLabel
              shrink
              htmlFor="end_time"
              sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
            >
              เวลาสิ้นสุดกิจกรรม
              <span style={{ color: "red", marginLeft: 6 }}>*</span>
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
              error={errors.start_time}
            />
            {errors.start_time && (
              <Typography color="error" variant="caption">
                กรุณาเลือกเวลาสิ้นสุดกิจกรรม
              </Typography>
            )}
          </Grid>
        </Grid>

        <InputLabel
          shrink
          htmlFor="location"
          sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
        >
          สถานที่<span style={{ color: "red", marginLeft: 6 }}>*</span>
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
          error={errors.location}
        />
        {errors.location && (
          <Typography color="error" variant="caption">
            กรุณากรอกสถานที่
          </Typography>
        )}

        <InputLabel
          shrink
          htmlFor="description"
          sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
        >
          รายละเอียด<span style={{ color: "red", marginLeft: 6 }}>*</span>
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
          error={errors.description}
        />
        {errors.description && (
          <Typography color="error" variant="caption">
            กรุณากรอกรายละเอียด
          </Typography>
        )}

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
            color="secondary"
            onClick={handleEditEvent}
            startIcon={
              loading && <CircularProgress size={20} sx={{ color: "white" }} />
            }
            disabled={loading}
          >
            บันทึกข้อมูล
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
