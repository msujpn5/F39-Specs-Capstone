import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './store/authContext';
import './App.css';

import Header from './components/Header';
import AddClass from './components/AddClass';
import AddGrade from './components/AddGrade';
import AddStudent from './components/AddStudent';
import Home from './components/Home';
import Student from './components/Student';
import Auth from './components/Auth';


function App() {

  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
      <Route path='/' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
