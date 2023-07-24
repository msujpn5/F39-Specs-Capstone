import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";

function AddClass() {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [classroom, setClassroom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/classes",
        { subject, time, classroom, userId },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/class");
      })
      .catch((err) => console.log(err));
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
            Create Class
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Classroom"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
          />
          <Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ m: 1 }}
              endIcon={<AddIcon />}
            >
              Create Class
            </Button>
          </Box>
        </div>
      </Box>
    </form>
  );
}

export default AddClass;
