import React, { useState, useContext, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function AddAssignment() {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [assignmentName, setAssignmentName] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [dateDue, setDateDue] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

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
        "http://localhost:4000/assignments",
        { assignmentName, maxScore, dateDue, classId: selectedClass, userId },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/assignment");
      })
      .catch((err) => console.log(err));
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        // component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Typography variant="h4" ml="10px">
            Add Assignment
          </Typography>
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
            label="Assignment Name"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Max Score"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Date Due"
            value={dateDue}
            onChange={(e) => setDateDue(e.target.value)}
          />
          <Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ m: 1 }}
              endIcon={<AddIcon />}
            >
              Add Assignment
            </Button>
          </Box>
        </div>
      </Box>
    </form>
  );
}

export default AddAssignment;
