import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function Student() {
  const { userId, token } = useContext(AuthContext);

  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  const getStudents = useCallback(() => {
    axios
      .get(`http://localhost:4000/students/${userId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId, token]);

  const studentDisplay = students.map((student, index) => {
    return (
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Class: {}
          </Typography>
          <Typography variant="h5" component="div">
            {student.firstName} {student.middleName} {student.lastName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {student.gender}
          </Typography>
          <Typography variant="body2">Age: {student.age}</Typography>
        </CardContent>
        <Box>
          <Button sx={{ m: 1 }} onClick={() => deleteStudent(student.id)}>
            Delete
          </Button>
        </Box>
      </Card>
    );
  });

  const handleClick = () => {
    navigate("/addStudent");
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:4000/students/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(() => {
        getStudents();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{ mb: 5, ml: 2 }}
        endIcon={<AddIcon />}
      >
        Create Student
      </Button>
      <Box sx={{ m: 1 }}>
        {studentDisplay ? studentDisplay : <Typography>No Students</Typography>}
      </Box>
    </div>
  );
}

export default Student;
