import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 2,
  width: "75%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function SearchEvents() {
  const router = useRouter();
  const { keyword } = router.query;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (keyword) {
      setSearchTerm(keyword as string);
    } else {
      setSearchTerm("");
    }
  }, [keyword]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?keyword=${searchTerm}`);
    }
  };

  return (
    <Search sx={{ mx: "auto" }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="ค้นหากิจกรรม"
        inputProps={{ "aria-label": "search" }}
        sx={{ fontSize: { xs: 14, md: 16 } }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    </Search>
  );
}
