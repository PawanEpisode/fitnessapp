import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchdata } from "../utility/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({ bodyPart, setBodyPart, setExercises}) => {
  const [bodyParts, setbodyParts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchBodyPartsData = async () => {
      const bodyPartsData = await fetchdata(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPartList`,
        exerciseOptions
      );
      if (bodyPartsData?.length) {
        setbodyParts(["all", ...bodyPartsData]);
      }
    };

    fetchBodyPartsData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisedata = await fetchdata(
        `https://exercisedb.p.rapidapi.com/exercises`,
        exerciseOptions
      );
      const searchedExercises = (exercisedata ?? [])?.filter((eachExercise) => {
        return (
          eachExercise?.name.toLowerCase().includes(search) ||
          eachExercise?.target.toLowerCase().includes(search) ||
          eachExercise?.equipment.toLowerCase().includes(search) ||
          eachExercise?.bodyPart.toLowerCase().includes(search)
        );
      });
      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" mt="37px" p="20px">
      <Typography
        fontWeight={700}
        mb="50px"
        textAlign="center"
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="36px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", sm: "450px", xs: "300px" },
            backgroundColor: "#fff",
            margin: '10px'
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search names related to exercise & fitness..."
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", sm: "100px", xs: "80px" },
            fontSize: { lg: "20px", sm: "17px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "1",
            top: '10px'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{position: 'relative', width: '100%'}}>
          <HorizontalScrollBar data={[...bodyParts]} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts/>
      </Box>
    </Stack>
  );
};

export default SearchExercises;
