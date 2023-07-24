import React, { useState, useContext, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";

function AddGrade() {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");

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

  const getAssignments = useCallback(() => {
    axios
      .get(`http://localhost:4000/assignments/${userId}`, {
        headers: {
          authorization: token,
        },
      })

      .then((res) => {
        setAssignments(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId, token]);

  useEffect(() => {
    getClasses();
    getStudents();
    getAssignments();
  }, [getClasses, getStudents, getAssignments]);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleAssignmentChange = (event) => {
    setSelectedAssignment(event.target.value);
  };

  return (
    <div>
      <Typography variant="h4" ml="10px">
        Add Grade
      </Typography>
      <Box sx={{ minWidth: 120, m: 2 }}>
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
              <MenuItem key={index} value={teacherClass}>
                {teacherClass.subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120, m: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="student-select-label">Student</InputLabel>
          <Select
            labelId="student-label"
            id="student-select"
            value={selectedStudent}
            label="Student"
            onChange={handleStudentChange}
          >
            {students.map((student, index) => (
              <MenuItem key={index} value={student}>
                {student.firstName} {student.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120, m: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="assignment-select-label">Assignment</InputLabel>
          <Select
            labelId="assignment-label"
            id="assignment-select"
            value={selectedAssignment}
            label="Assignment"
            onChange={handleAssignmentChange}
          >
            {assignments.map((assignment, index) => (
              <MenuItem key={index} value={assignment}>
                {assignment.assignmentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default AddGrade;
