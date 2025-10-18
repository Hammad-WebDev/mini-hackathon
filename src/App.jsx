import { useEffect } from 'react'
import './App.css'
import StartupPitchGenerator from './components/StartupPitchGenerator'
import { Routes, Route } from "react-router"; 
import Login from './pages/Login';

function App() {

  return (
    <>
    {/* <StartupPitchGenerator /> */}
    <Routes>
      <Route path='/' element={<StartupPitchGenerator />} />
      <Route path='login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
