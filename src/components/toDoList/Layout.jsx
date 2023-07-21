import React, { memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
const Layout = memo(props => (
  <Paper
    elevation={0}
    style={{ padding: 5, margin: 15, backgroundColor: '#fafafa' }}
  >
    <AppBar color="secondary" position="static" style={{ height: 64 }}>
      <Toolbar style={{ height: 64 }}>
        <Typography color="inherit">To-Do List</Typography>
      </Toolbar>
    </AppBar>
    {props.children}
  </Paper>
));
export default Layout;
