import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import './styles/App.css'
import "bootstrap/dist/css/bootstrap.css";

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
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
