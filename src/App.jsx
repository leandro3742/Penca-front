import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import './styles/App.css'
import "bootstrap/dist/css/bootstrap.css";
import { Navegacion } from './components/Navegacion';
import Login from './pages/login';
import { AltaTorneo } from './pages/altaTorneo';
import { AltaEvento } from './pages/AltaEvento';
import { AltaPenca } from './pages/AltaPenca';

import { Registro } from './pages/Registro';
import { AltaPencaCompartida } from './pages/AltaPencaCompartida';
import { AltaPencaEmpresarial } from './pages/AltaPencaEmpresarial';
import { ListaTorneos } from './pages/ListaTorneos';
import { ListaEventos } from './pages/ListaEventos';
import { Pronostico } from './pages/Pronostico';
import { VerPencas } from './pages/VerPencas';
import { ParticipacionPenca } from './pages/ParticipacionPenca';
import { Suscripcion } from './pages/Suscripcion';
import { MisPencas } from './pages/MisPencas';
import { Ranking } from './pages/Ranking';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PencasCompartidas } from './pages/PencasCompartidas';







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
    <div style={{}}>
      <Navegacion>    </Navegacion>


      
    <>
    <PayPalScriptProvider
                options={{
                    "client-id": import.meta.env.VITE_CLIENT_ID,
                    components: "buttons",
                    currency: "USD"
                }}
            >
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/AltaTorneo" element={<AltaTorneo />} />
            <Route path="/AltaEvento" element={<AltaEvento />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/AltaPenca" element={<AltaPenca />} />
            <Route path="/AltaPencaCompartida" element={<AltaPencaCompartida />} />
            <Route path="/AltaPencaEmpresarial" element={<AltaPencaEmpresarial />} />
            <Route path="/listaTorneos" element={<ListaTorneos />} />
            <Route path="/listaEventos" element={<ListaEventos />} />
            <Route path="/Pronostico" element={<Pronostico />} />
            <Route path="/VerPencas" element={<VerPencas />} />
            <Route path="/ParticipacionPenca" element={<ParticipacionPenca />} />
            <Route path="/Suscripcion" element={<Suscripcion />} />
            <Route path="/MisPencas" element={<MisPencas />} />
            <Route path="/Ranking" element={<Ranking />} />
            <Route path="/PencasCompartidas" element={<PencasCompartidas />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
    </>
    </div>
  )
}

export default App
