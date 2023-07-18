import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard'
import axios from 'axios'

function Student() {

  const [students, setStudents] = useState([])

  const getStudents = () => {
    axios
      .get('http://localhost:3000/students')
      .then((res) => {
        setStudents(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }

  const studentDisplay = students.map((student, index) => {
    return <StudentCard student={student}/>
  })

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div>
      {studentDisplay ? studentDisplay : <h2>No students</h2>}
    </div>
  )
}

export default Student