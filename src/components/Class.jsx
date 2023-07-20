import React, { useEffect, useState } from 'react';
import ClassCard from './ClassCard';
import axios from 'axios';


function Class() {
  const [classes, setClasses] = useState([])

  const getClasses = () => {
    axios
    .get('http://localhost:4000/classes')
    .then((res) => {
      setClasses(res.data)
      console.log(res.data)
    })
    .catch((err) => console.log(err))
  }

  // const classDisplay = classes
  //   .map((class) => {
  //     return <ClassCard class={class}/>
  //   })
  // return (
  //   <div>
      
  //   </div>
  // )
}

export default Class