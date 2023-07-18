import React, { useEffect, useState } from 'react';
import AssignmentCard from './AssignmentCard';
import axios from 'axios';

function Assignment() {
    const [assignments, setAssignments] = useState([])

    const getAssignments = () => {
        axios
        .get('http://localhost:3000/assignments')
        .then((res) => {
            setAssignments(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err))
    }

    const assignmentDisplay = assignments.map((assignment, index) => {
        return <AssignmentCard assignment={assignment}/>
    })

    useEffect(() => {
        getAssignments()
    }, [])

    return (
        <div>
            {assignmentDisplay ? assignmentDisplay : <h2>No assignments</h2>}
        </div>
    )
}

export default Assignment