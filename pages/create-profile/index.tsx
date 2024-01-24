import CreateProfile from "@/components/CreateProfile";
import InterestedEventType from "@/components/InterestedEventTypes";
import { UserMenu } from "@/interfaces/User";
import { createUser } from "@/services/users";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  SelectChangeEvent,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function CreateProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "",
    username: "",
    email: "",
    idCode: "",
    faculty: "",
    phoneNumber: "",
    gender: "",
    description: "",
    interestedEventTypes: [] as string[],
  });
  const [editImage, setEditImage] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: boolean;
  }>({
    username: false,
    idCode: false,
    phoneNumber: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: session.user.email,
        profilePicture: session.user.image,
      }));
    }
  }, [session]);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<UserMenu>(["user"]);

  useEffect(() => {
    if (data && data.user) {
      router.back();
    }
  }, [data, router]);

  const handleNext = () => {
    const newErrors = {
      username: formData.username.length < 4 ? true : false,
      idCode: formData.idCode.length !== 10 ? true : false,
      phoneNumber: formData.phoneNumber.length !== 10 ? true : false,
    };

    setErrors({});

    if (step === 1) {
      if (newErrors.username || newErrors.idCode || newErrors.phoneNumber) {
        setErrors(newErrors);
        return;
      }
    }

    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    if (
      (name === "idCode" || name === "phoneNumber") &&
      !/^[0-9]*$/.test(value)
    ) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prevFormData) => {
      const updatedEventType = prevFormData.interestedEventTypes.includes(value)
        ? prevFormData.interestedEventTypes.filter((type) => type !== value)
        : [...prevFormData.interestedEventTypes, value];

      return {
        ...prevFormData,
        interestedEventTypes: updatedEventType,
      };
    });
  };

  const handleImageChange = (image: string) => {
    setFormData({ ...formData, profilePicture: image });
    setEditImage(true);
  };

  const handleSubmit = async () => {
    const userData = {
      user: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        idCode: formData.idCode,
        faculty: formData.faculty,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        description:
          formData.description === "" ? undefined : formData.description,
        profilePicture: {
          url: editImage ? undefined : formData.profilePicture,
          base64Image: editImage ? formData.profilePicture : undefined,
        },
        interestedEventTypes: formData.interestedEventTypes,
      },
    };

    setLoading(true);

    try {
      await createUser(userData);
      showSnackbar("สร้างโปรไฟล์สำเร็จ", "success");
      window.location.href = "/";
    } catch (error: any) {
      if (error && error.response) {
        const { status } = error.response;
        if (status === 401) {
          SessionExpiredPopup();
        } else {
          showSnackbar("สร้างโปรไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
        }
      } else {
        showSnackbar("สร้างโปรไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
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
        {step === 1 && (
          <CreateProfile
            formData={formData}
            onInputChange={handleInputChange}
            onImageChange={handleImageChange}
            editImage={editImage}
            errors={errors}
          />
        )}
        {step === 2 && (
          <InterestedEventType
            formData={formData}
            onInputChange={handleCheckboxChange}
          />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            mt: 2,
          }}
        >
          {step > 1 && (
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
              onClick={handlePrevious}
            >
              ย้อนกลับ
            </Button>
          )}
          {step < 2 ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNext}
              disabled={
                step === 1 &&
                (!formData.firstName ||
                  !formData.lastName ||
                  !formData.username ||
                  !formData.idCode ||
                  !formData.faculty ||
                  !formData.phoneNumber ||
                  !formData.gender)
              }
            >
              ถัดไป
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              startIcon={
                loading && (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                )
              }
            >
              เสร็จสิ้น
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
