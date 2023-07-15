import React, {useState, useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../store/authContext';

function AddGrade() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate()

  const [studentFirstName, setStudentFirstName] = useState('')
  const [studentLastName, setStudentLastName] = useState('')
  const [score, setScore] = useState('')
  const [dateSubmitted, setDateSubmitted] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('/students', {studentFirstName, studentLastName, score, dateSubmitted, userId}, {
        headers: {
            authorization: token
        }
    })
        .then(() => {
            navigate('/students')
        })
        .catch(err => console.log(err))
}
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
      <Typography variant="h4" ml="10px">
          Add Grade
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Student First Name"
          value={studentFirstName}
          onChange={e => setStudentFirstName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Student Last Name"
          value={studentLastName}
          onChange={e => setStudentLastName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Score"
          value={score}
          onChange={e => setScore(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Date Submitted"
          value={dateSubmitted}
          onChange={e => setDateSubmitted(e.target.value)}
        />
        <Button variant="contained" sx={{m: 1}} endIcon={<AddIcon />}>
        Add Grade
      </Button>
      </div>
    </Box>
  )
}

export default AddGrade