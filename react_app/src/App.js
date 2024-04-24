import React from 'react'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Myprofile from './Component/Myprofile'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}> </Route>
      <Route path='/signup' element={<Signup/>}> </Route>
      <Route path='/myprofile' element={<Myprofile/>}> </Route>

    </Routes>
    </BrowserRouter>
    
  )
}

export default App;
