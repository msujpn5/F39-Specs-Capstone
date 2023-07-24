import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ClassScreen() {
  const { classId } = useParams();

  const { userId, token } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([])

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
  }, [userId, token, classId]);

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
  }, [userId, token, classId]);

  let filteredAssignments = assignments.filter(
    (assignment) => assignment.classId === +classId
  )

  const assignmentDisplay = filteredAssignments.map((assignment, index) => {
    return (
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Class
          </Typography>
          <Typography variant="h5" component="div">
            {assignment.assignmentName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Max Score: {assignment.maxScore}
          </Typography>
          <Typography variant="body2">
            Due Date: {assignment.dateDue}
          </Typography>
        </CardContent>
        <Box>
          <Button sx={{ m: 1 }} onClick={() => deleteAssignment(assignment.id)}>
            Delete
          </Button>
        </Box>
      </Card>
    );
  });

  let filteredStudents = students.filter(
    (student) => student.classId === +classId
  )

  const studentDisplay = filteredStudents.map((student, index) => {
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

  useEffect(() => {
    getAssignments();
    getStudents()
  }, [getAssignments, getStudents]);

  const deleteAssignment = (id) => {
    axios
      .delete(`http://localhost:4000/assignments/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(() => {
        getAssignments();
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <div>
      <Typography variant="h4" ml="10px">
        Assignments
      </Typography>
      <Box sx={{ m: 1 }}>
        {assignmentDisplay ? (
          assignmentDisplay
        ) : (
          <Typography>No assignments</Typography>
        )}
      </Box>
      <Typography sx={{ mt: 2 }} variant="h4" ml="10px">
        Students
      </Typography>
      <Box sx={{ m: 1 }}>
        {studentDisplay ? studentDisplay : <Typography>No Students</Typography>}
      </Box>
    </div>
  );
}

export default ClassScreen;
