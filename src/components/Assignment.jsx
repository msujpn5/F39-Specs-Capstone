import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../store/authContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Assignment() {
    const {userId, token} = useContext(AuthContext)

    const [assignments, setAssignments] = useState([])

    const navigate = useNavigate()

    const getAssignments = useCallback(() => {
        axios
        .get(`http://localhost:4000/assignments/${userId}`, {
            headers: {
                authorization: token
            }
        })
        
        .then((res) => {
            setAssignments(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err))
    }, [userId])

    const assignmentDisplay = assignments.map((assignment, index) => {
        return (
            (
                <Card sx={{ minWidth: 275 }}>
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
                    <Button sx={{m:1}} onClick={() => deleteAssignment(assignment.id)}>Delete</Button>
                    </Box>
                </Card>
            )
        )
    })

    useEffect(() => {
        getAssignments()
    }, [getAssignments])

    const handleClick = () => {
        navigate('/addAssignment')
    }

    const deleteAssignment = id => {
        axios.delete(`http://localhost:4000/assignments/${id}`, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                getAssignments()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <Box>
            <Button onClick={handleClick} variant="contained" sx={{m: 1}} endIcon={<AddIcon />}>
                Create Assignment
            </Button>
            </Box>
            <Box>
            {assignmentDisplay ? assignmentDisplay : <Typography>No assignments</Typography>}
            </Box>
        </div>
    )
}

export default Assignment