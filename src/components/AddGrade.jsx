import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

function AddGrade() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <Typography variant="h4" ml="10px">
          Add Grade
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Student First Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Student Last Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Score"
        />
        <TextField
          required
          id="outlined-required"
          label="Date Submitted"
        />
        <Button variant="contained" sx={{m: 1}} endIcon={<AddIcon />}>
        Add Grade
      </Button>
      </div>
    </Box>
  )
}

export default AddGrade