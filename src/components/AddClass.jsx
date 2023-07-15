import React, {useState, useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../store/authContext';

function AddClass() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [subject, setSubject] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('/classes', {fullName, subject, userId}, {
        headers: {
            authorization: token
        }
    })
        .then(() => {
            navigate('/classes')
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
          Create Class
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Teacher Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
        <Button variant="contained" sx={{m: 1}} endIcon={<AddIcon />}>
        Create Class
      </Button>
      </div>
    </Box>
  )
}

export default AddClass