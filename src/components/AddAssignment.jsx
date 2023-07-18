import React, {useState, useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../store/authContext';

function AddAssignment() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate()

  const [assignmentName, setAssignmentName] = useState('')
  const [maxScore, setMaxScore] = useState('')
  const [dateDue, setDateDue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('/assignments', {assignmentName, maxScore, dateDue, userId}, {
        headers: {
            authorization: token
        }
    })
        .then(() => {
            navigate('/assignment')
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
          Add Assignment
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Assignment Name"
          value={assignmentName}
          onChange={e => setAssignmentName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Max Score"
          value={maxScore}
          onChange={e => setMaxScore(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Date Due"
          value={dateDue}
          onChange={e => setDateDue(e.target.value)}
        />
        <Button variant="contained" sx={{m: 1}} endIcon={<AddIcon />}>
        Add Assignment
      </Button>
      </div>
    </Box>
  )
}

export default AddAssignment