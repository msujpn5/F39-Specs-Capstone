import React from 'react'
import { Navigate, useNaviagte } from "react-router-dom"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function ClassCard({teacherClass}) {

  return (
  teacherClass ? 
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Class
        </Typography>
        <Typography variant="h5" component="div">
          {teacherClass.subject}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {teacherClass.time}
        </Typography>
        <Typography variant="body2">
          {teacherClass.classroom}
        </Typography>
      </CardContent>
      <Box>
        <Button sx={{m:1}}>Delete</Button>
      </Box>
    </Card>
    : null
  )
}

export default ClassCard