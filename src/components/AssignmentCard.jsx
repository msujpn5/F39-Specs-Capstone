import React from 'react'
import { Navigate, useNaviagte } from "react-router-dom"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function AssignmentCard({assignment}) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Class
                </Typography>
                <Typography variant="h5" component="div">
                    {assignment.assignmentName}  
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {assignment.maxScore}
                </Typography>
                <Typography variant="body2">
                    {assignment.dateDue}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default AssignmentCard