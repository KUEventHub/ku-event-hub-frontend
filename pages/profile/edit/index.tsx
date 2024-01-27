import InterestedEventTypes from "@/components/InterestedEventTypes";
import ProfileInput from "@/components/ProfileInput";
import {
  editUserInfo,
  getUserInfoForEdit,
  getUserMenu,
} from "@/services/users";
import { SessionExpiredPopup } from "@/utils/sessionExpiredPopup";
import { showSnackbar } from "@/utils/showSnackbar";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function EditProfilePage() {
  const [id, setID] = useState("");
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
  const [originalData, setOriginalData] = useState({
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
    duplicateUsername: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const me = await getUserMenu();
      if (me && me.user) {
        setID(me.user._id);
        const data = await getUserInfoForEdit(me.user._id);
        return data;
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (data) {
      const userData = data.user;

      setFormData({
        ...userData,
        profilePicture: userData.profilePictureUrl,
      });

      setOriginalData({
        ...userData,
        profilePicture: userData.profilePictureUrl,
      });
    }
  }, [data]);

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
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
        firstName:
          formData.firstName !== originalData.firstName
            ? formData.firstName
            : undefined,
        lastName:
          formData.lastName !== originalData.lastName
            ? formData.lastName
            : undefined,
        username:
          formData.username !== originalData.username
            ? formData.username
            : undefined,
        email:
          formData.email !== originalData.email ? formData.email : undefined,
        idCode:
          formData.idCode !== originalData.idCode ? formData.idCode : undefined,
        faculty:
          formData.faculty !== originalData.faculty
            ? formData.faculty
            : undefined,
        phoneNumber:
          formData.phoneNumber !== originalData.phoneNumber
            ? formData.phoneNumber
            : undefined,
        gender:
          formData.gender !== originalData.gender ? formData.gender : undefined,
        description:
          formData.description !== originalData.description
            ? formData.description
            : undefined,
        profilePicture: {
          url: editImage
            ? undefined
            : formData.profilePicture !== originalData.profilePicture
            ? formData.profilePicture
            : undefined,
          base64Image: editImage ? formData.profilePicture : undefined,
        },
        interestedEventTypes:
          formData.interestedEventTypes !== originalData.interestedEventTypes
            ? formData.interestedEventTypes
            : undefined,
      },
    };

    const newErrors = {
      username: formData.username.length < 4 ? true : false,
      idCode: formData.idCode.length !== 10 ? true : false,
      phoneNumber: formData.phoneNumber.length !== 10 ? true : false,
    };

    setErrors({});

    if (newErrors.username || newErrors.idCode || newErrors.phoneNumber) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await editUserInfo(id, userData);
      showSnackbar("แก้ไขข้อมูลส่วนตัวสำเร็จ", "success");
      queryClient.refetchQueries({ queryKey: ["user"] });
      router.push("/");
    } catch (error: any) {
      if (error && error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          SessionExpiredPopup();
        } else if (status === 400) {
          if (data.keyValue) {
            const newErrors = {
              duplicateUsername: data.keyValue.username ? true : false,
            };
            setErrors({});
            if (newErrors.duplicateUsername) {
              setErrors(newErrors);
              setLoading(false);
              return;
            }
          }
        } else {
          showSnackbar(
            "แก้ไขข้อมูลส่วนตัวไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            "error"
          );
        }
      } else {
        showSnackbar(
          "แก้ไขข้อมูลส่วนตัวไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
          "error"
        );
      }
    }

    setLoading(false);
  };

  const isFormDataUnchanged =
    JSON.stringify({
      ...formData,
      interestedEventTypes: formData.interestedEventTypes.slice().sort(),
    }) ===
    JSON.stringify({
      ...originalData,
      interestedEventTypes: originalData.interestedEventTypes.slice().sort(),
    });

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
          แก้ไขข้อมูลส่วนตัว
        </Typography>
        <ProfileInput
          formData={formData}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          editImage={editImage}
          errors={errors}
        />

        <InputLabel
          shrink
          htmlFor="firstName"
          sx={{ mt: 2, fontSize: "18px", fontWeight: "bold" }}
        >
          ประเภทกิจกรรมที่สนใจ
        </InputLabel>
        <InterestedEventTypes
          interestedEventTypes={formData.interestedEventTypes}
          onInputChange={handleCheckboxChange}
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
            color="secondary"
            onClick={handleSubmit}
            startIcon={
              loading && <CircularProgress size={20} sx={{ color: "white" }} />
            }
            disabled={isFormDataUnchanged || loading}
          >
            บันทึกข้อมูล
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
