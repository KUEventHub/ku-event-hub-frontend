import {
  Box,
  Typography,
  InputLabel,
  TextField,
  Button,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useRef } from "react";
import { facultyList } from "@/utils/facultyList";

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

export default function CreateProfile({
  formData,
  onInputChange,
  onImageChange,
  editImage,
  errors,
}: any) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const convertImageToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result?.toString().split(",")[1];
      onImageChange(base64);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      convertImageToBase64(event.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
        สร้างโปรไฟล์
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mb: 2,
        }}
      >
        <Box sx={{ mx: "auto" }}>
          <Avatar
            src={
              editImage
                ? `data:image/png;base64,${formData.profilePicture}`
                : formData.profilePicture
            }
            sx={{ width: 150, height: 150, m: 3 }}
          />
        </Box>
        <Button component="label" variant="contained" color="secondary">
          แก้ไขรูปภาพ
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef}
          />
        </Button>
      </Box>

      <Grid container columnSpacing={{ xs: 1, md: 3 }} columns={16}>
        <Grid item xs={16} lg={8}>
          <InputLabel
            shrink
            htmlFor="firstName"
            sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            ชื่อ<span style={{ color: "red", marginLeft: 6 }}>*</span>
          </InputLabel>
          <TextField
            value={formData.firstName}
            onChange={onInputChange}
            type="text"
            name="firstName"
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
        <Grid item xs={16} lg={8}>
          <InputLabel
            shrink
            htmlFor="lastName"
            sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            นามสกุล<span style={{ color: "red", marginLeft: 6 }}>*</span>
          </InputLabel>
          <TextField
            value={formData.lastName}
            onChange={onInputChange}
            type="text"
            name="lastName"
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
        <Grid item xs={16} lg={8}>
          <InputLabel
            shrink
            htmlFor="username"
            sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            Username<span style={{ color: "red", marginLeft: 6 }}>*</span>
          </InputLabel>
          <TextField
            value={formData.username}
            onChange={onInputChange}
            type="text"
            name="username"
            hiddenLabel
            variant="outlined"
            color="secondary"
            size="small"
            sx={{
              mb: 1,
              bgcolor: "#F1F1F1",
              width: "100%",
            }}
            InputProps={{ inputProps: { maxLength: 20 } }}
            error={errors.username}
          />
          {errors.username && (
            <Typography variant="caption" color="error">
              กรุณากรอก Username อย่างน้อย 4 ตัว และไม่เกิน 20 ตัว
            </Typography>
          )}
        </Grid>
        <Grid item xs={16} lg={8}>
          <InputLabel
            shrink
            htmlFor="email"
            sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            Email<span style={{ color: "red", marginLeft: 6 }}>*</span>
          </InputLabel>
          <TextField
            value={formData.email}
            type="text"
            name="email"
            hiddenLabel
            variant="outlined"
            color="secondary"
            size="small"
            sx={{
              mb: 1,
              bgcolor: "#F1F1F1",
              width: "100%",
            }}
            disabled
          />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, md: 3 }} columns={16}>
        <Grid item xs={16} lg={8}>
          <InputLabel
            shrink
            htmlFor="idCode"
            sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            รหัสนิสิต<span style={{ color: "red", marginLeft: 6 }}>*</span>
          </InputLabel>
          <TextField
            value={formData.idCode}
            onChange={onInputChange}
            type="text"
            name="idCode"
            hiddenLabel
            variant="outlined"
            color="secondary"
            size="small"
            sx={{
              mb: 1,
              bgcolor: "#F1F1F1",
              width: "100%",
            }}
            InputProps={{ inputProps: { maxLength: 10 } }}
            error={errors.idCode}
          />
          {errors.idCode && (
            <Typography variant="caption" color="error">
              กรุณากรอกรหัสนิสิตให้ครบ 10 ตัว
            </Typography>
          )}
        </Grid>
        <Grid item xs={16} lg={8}>
          <InputLabel
            shrink
            htmlFor="faculty"
            sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            คณะ<span style={{ color: "red", marginLeft: 6 }}>*</span>
          </InputLabel>
          <FormControl sx={{ width: "100%" }} size="small">
            <Select
              name="faculty"
              value={formData.faculty}
              onChange={onInputChange}
              sx={{
                mb: 1,
                bgcolor: "#F1F1F1",
                width: "100%",
              }}
              color="secondary"
            >
              {facultyList.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
              <MenuItem value="other">อื่น ๆ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, md: 3 }} columns={16}>
        <Grid item xs={16} lg={8}>
          <InputLabel
            shrink
            htmlFor="phoneNumber"
            sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            เบอร์โทรศัพท์
            <span style={{ color: "red", marginLeft: 6 }}>*</span>
          </InputLabel>
          <TextField
            value={formData.phoneNumber}
            onChange={onInputChange}
            type="text"
            name="phoneNumber"
            hiddenLabel
            variant="outlined"
            color="secondary"
            size="small"
            sx={{
              mb: 1,
              bgcolor: "#F1F1F1",
              width: "100%",
            }}
            InputProps={{ inputProps: { maxLength: 10 } }}
            error={errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <Typography variant="caption" color="error">
              กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 ตัว
            </Typography>
          )}
        </Grid>
        <Grid item xs={16} lg={8}>
          <InputLabel
            shrink
            htmlFor="gender"
            sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            เพศ<span style={{ color: "red", marginLeft: 6 }}>*</span>
          </InputLabel>
          <FormControl sx={{ width: "100%" }} size="small">
            <Select
              name="gender"
              value={formData.gender}
              onChange={onInputChange}
              sx={{
                mb: 1,
                bgcolor: "#F1F1F1",
                width: "100%",
              }}
              color="secondary"
            >
              <MenuItem value="male">ชาย</MenuItem>
              <MenuItem value="female">หญิง</MenuItem>
              <MenuItem value="other">ไม่ระบุ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <InputLabel
        shrink
        htmlFor="description"
        sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
      >
        คำอธิบายตัวเอง
      </InputLabel>
      <TextField
        value={formData.description}
        onChange={onInputChange}
        type="text"
        name="description"
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
    </Box>
  );
}
