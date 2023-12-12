import { useState } from 'react'
import './App.css'
import Home from "./Pages/Home"
import { Routes, Route } from 'react-router-dom';
import CreateRecord from './Pages/CreateRecord';
import ViewRecord from './Pages/ViewRecord';

function App() {

  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateRecord" element={<CreateRecord/>} />
          <Route path="/ViewRecord" element={<ViewRecord/>} />
      </Routes>
  )
}

export default App
