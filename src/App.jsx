import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import './styles/App.css'
import "bootstrap/dist/css/bootstrap.css";
import { Navegacion } from './components/Navegacion';
import Login from './pages/login';
import { AltaTorneo } from './pages/altaTorneo';
import { AltaEvento } from './pages/AltaEvento';
import { Registro } from './pages/Registro';

// async function fetchA(){
//   let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}WeatherForecast`)
//   console.log(response)
//   // return await response
// }

function App() {
  // const [data, setData] = useState([])
  
  // const A = async (url) => {
  //   let aux = await fetch(url + 'WeatherForecast')
  //   setData(await aux.json())
  // }
  
  // useEffect(() => {
  //   A(import.meta.env.VITE_BACKEND_SERVICE)
  // }, []);

  return (
    <div>
      <Navegacion>

      
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AltaTorneo" element={<AltaTorneo />} />
          <Route path="/AltaEvento" element={<AltaEvento />} />
          <Route path="/Registro" element={<Registro />} />



      </Routes>
  </BrowserRouter>
  
  
    </>
    </Navegacion>
    </div>
  )
}

export default App
