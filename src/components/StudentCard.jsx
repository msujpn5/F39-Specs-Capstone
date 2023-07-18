import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function StudentCard({student}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Student
        </Typography>
        <Typography variant="h5" component="div">
          {student.firstName} {student.middleName} {student.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {student.gender}
        </Typography>
        <Typography variant="body2">
          {student.age}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StudentCard