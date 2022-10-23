import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './styles/App.css'

async function fetchA(){
  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}WeatherForecast`)
  console.log(response)
  // return await response
}

function App() {
  const [data, setData] = useState([])
  
  const A = async (url) => {
    let aux = await fetch(url + 'WeatherForecast')
    setData(await aux.json())
  }
  
  useEffect(() => {
    A(import.meta.env.VITE_BACKEND_SERVICE)
  }, []);

  return (
    <div className="App">
      {data.map(elem => {
        return <div>
          {elem.date}
        </div>
      })}
    </div>
  )
}

export default App
