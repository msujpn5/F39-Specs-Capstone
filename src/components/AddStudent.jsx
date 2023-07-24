import React, { useState, useContext, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";

function AddStudent() {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState("");

  const getClasses = useCallback(() => {
    axios
      .get(`http://localhost:4000/classes/${userId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setClasses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId, token]);

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/students",
        {
          firstName,
          middleName,
          lastName,
          gender,
          age,
          classId: selectedClass,
          userId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/student");
      })
      .catch((err) => console.log(err));
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" ml="10px">
          Create Student
        </Typography>
        <div>
          <Box sx={{ width: "50ch", m: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select
                labelId="class-label"
                id="class-select"
                value={selectedClass}
                label="Class"
                onChange={handleClassChange}
              >
                {classes.map((teacherClass, index) => (
                  <MenuItem key={index} value={teacherClass.id}>
                    {teacherClass.subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Box>
            <FormControl sx={{ m: 1 }}>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={gender}
              >
                <FormControlLabel
                  value={"Female"}
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value={"Male"}
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value={"Other"}
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </div>
        <Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 1 }}
            endIcon={<AddIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default AddStudent;
