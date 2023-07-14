import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

function AddClass() {
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
          Create Class
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Teacher Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Subject"
        />
        <Button variant="contained" sx={{m: 1}} endIcon={<AddIcon />}>
        Create Class
      </Button>
      </div>
    </Box>
  )
}

export default AddClass