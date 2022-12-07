import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import './styles/App.css'
import "bootstrap/dist/css/bootstrap.css";
import { Navegacion } from './components/Navegacion';
import Login from './pages/login';
import { AltaTorneo } from './pages/AltaTorneo';
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
import Confirmar from './pages/Confirmar';
import { Usuarios } from './pages/Usuarios';


async function getRoles(username){
  let aux = false;
  let response;
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/ObtenerRoles?username=`+ username).then(async res => response = await res.json());
  //response = await response.json();

  for(let i = 0; i<response.length; i++){
      if(response[i] == 'ADMIN'){
          aux = true;
      }
  }
  return aux;
  //alert('dentro de funcion ' + adm);
 }





// async function fetchA(){
//   let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}WeatherForecast`)
//   console.log(response)
//   // return await response
// }

function App() {

  const [admin,setRol] = useState();
    async function funcion(){
        let response = await getRoles(sessionStorage.getItem('username'));
        setRol(response);
    }

  // const [data, setData] = useState([])
  
  // const A = async (url) => {
  //   let aux = await fetch(url + 'WeatherForecast')
  //   setData(await aux.json())
  // }
  
  // useEffect(() => {
  //   A(import.meta.env.VITE_BACKEND_SERVICE)
  // }, []);
  funcion();
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
            {admin == true && <Route path="/AltaTorneo" element={<AltaTorneo />} />}
            {admin == true && <Route path="/AltaEvento" element={<AltaEvento />} />}
            <Route path="/Registro" element={<Registro />} />
            <Route path="/AltaPenca" element={<AltaPenca />} />
            {admin == true && <Route path="/AltaPencaCompartida" element={<AltaPencaCompartida />} />}
            <Route path="/AltaPencaEmpresarial" element={<AltaPencaEmpresarial />} />
            {admin == true && <Route path="/listaTorneos" element={<ListaTorneos />} />}
            {admin == true && <Route path="/listaEventos" element={<ListaEventos />} />}
            {admin == false && <Route path="/Pronostico" element={<Pronostico />} />}
            {admin == false && <Route path="/VerPencas" element={<VerPencas />} />}
            {admin == false && <Route path="/ParticipacionPenca" element={<ParticipacionPenca />} />}
            {admin == false && <Route path="/Suscripcion" element={<Suscripcion />} />}
            {admin == false && <Route path="/MisPencas" element={<MisPencas />} />}
            <Route path="/Ranking" element={<Ranking />} />
            {admin == true && <Route path="/PencasCompartidas" element={<PencasCompartidas />} />}
            <Route path="/confirmar/:id/:email" element={<Confirmar />} />
            {admin == true && <Route path="/Usuarios" element={<Usuarios />} />}

        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
    </>
    </div>
  )
}

export default App
