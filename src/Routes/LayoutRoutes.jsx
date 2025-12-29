

import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from '../pages/Login'
import Createuser from '../pages/Createuser'

function Layoutroutes() {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/createuser' element={<Createuser/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default Layoutroutes

