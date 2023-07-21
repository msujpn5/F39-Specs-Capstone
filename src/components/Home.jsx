import React, {useState, useContext } from 'react';
import AuthContext from '../store/authContext';
import { styled } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TodoApp from './toDoList';

function Home() {
  const {userId} = useContext(AuthContext)

  return (
        <Grid container>
          <Grid item xs={6} md={6}>
            <TodoApp />
          </Grid>
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
          </Grid>
          <Grid item md={6}>
            {}
          </Grid>
          
        </Grid>
  )
}

export default Home