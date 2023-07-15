import React, {useState, useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../store/authContext';

function AddStudent() {
  const {token, userId} = useContext(AuthContext)
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('female')


  const handleSubmit = e => {
    e.preventDefault()

    axios.post('/students', {firstName, middleName, lastName, gender, userId}, {
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
      <Typography variant="h4" ml="10px">
          Create Student
        </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Middle Name"
          value={middleName}
          onChange={e => setMiddleName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value={"female"} control={<Radio />} label="Female" onChange={e => setGender(e.target.value)}/>
          <FormControlLabel value={"male"} control={<Radio />} label="Male" onChange={e => setGender(e.target.value)}/>
          <FormControlLabel value={"other"} control={<Radio />} label="Other" onChange={e => setGender(e.target.value)}/>
        </RadioGroup>
      </FormControl>
      </div>
      <Button variant="contained" sx={{m: 1}} endIcon={<AddIcon />}>
        Create
      </Button>
    </Box>
  )
}

export default AddStudent