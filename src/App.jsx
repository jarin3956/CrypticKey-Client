import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import PassGen from './Pages/PassGen';
import Navbar from './Components/Navbar';
import Saved from './Pages/Saved';
import Save from './Pages/Save';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/generate' element={<PassGen />} />
          <Route path='/save' element={<Save/>} />
          <Route path='/saved' element={<Saved/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
