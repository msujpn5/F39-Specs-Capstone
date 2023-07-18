import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './store/authContext';
import './App.css';

import Header from './components/Header';
import AddClass from './components/AddClass';
import AddAssignment from './components/AddAssignment';
import AddStudent from './components/AddStudent';
import Home from './components/Home';
import Student from './components/Student';
import Class from './components/Class';
import Auth from './components/Auth';
import Assignment from './components/Assignment';


function App() {

  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
        <Route path='/class' element={!authCtx.token ? <Class/> : <Navigate to='/auth'/>}/>
        <Route path='/student' element={!authCtx.token ? <Student/> : <Navigate to='/auth'/>}/>
        <Route path='/assignment' element={!authCtx.token ? <Assignment/> : <Navigate to='/auth'/>}/>
        <Route path='/addClass' element={!authCtx.token ? <AddClass/> : <Navigate to='/auth'/>}/>
        <Route path='/addStudent' element={!authCtx.token ? <AddStudent/> : <Navigate to='/auth'/>}/>
        <Route path='/addAssignment' element={!authCtx.token ? <AddAssignment/> : <Navigate to='/auth'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
