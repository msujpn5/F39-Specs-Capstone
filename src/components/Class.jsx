import React, { useEffect, useState, useCallback, useContext } from 'react';
import ClassCard from './ClassCard';
import axios from 'axios';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../store/authContext'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Class() {
  const {userId, token} = useContext(AuthContext)

  const [classes, setClasses] = useState([])

  const navigate = useNavigate()

  const getClasses = useCallback(() => {
    axios
    .get(`http://localhost:4000/classes/${userId}`, {
      headers: {
          authorization: token
      }
  })
    .then((res) => {
      setClasses(res.data)
      console.log(res.data)
    })
    .catch((err) => console.log(err))
  },[userId])

  const classDisplay = classes
    .map((teacherClass) => {
      return (
        (
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
                <Button sx={{m:1}} onClick={() => deleteClass(teacherClass.id)}>Delete</Button>
              </Box>
            </Card>
            : null
          )
      )
    })

    const handleClick = () => {
      navigate('/addClass')
  }

    useEffect(() => {
      getClasses()
    }, [getClasses])

    const deleteClass = id => {
      axios.delete(`http://localhost:4000/classes/${id}`, {
          headers: {
              authorization: token
          }
      })
          .then(() => {
              getClasses()
          })
          .catch(err => {
              console.log(err)
          })
  }

  return (
    <div>
      <Button  onClick={handleClick} variant="contained" sx={{m: 1}} endIcon={<AddIcon />}>
        Create Class
      </Button>
      <Box sx={{m:5}}>
      {classDisplay ? classDisplay : <h2>No Classes</h2>}
      </Box>
    </div>
  )
}

export default Class