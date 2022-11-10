import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';



async function NuevoTorneo(credentials) {

  
  if(credentials.FechaFin < credentials.FechaInicio){
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: "Error!",
      text:"La fecha de finalización del torneo no puede ser menor a la de su inicio",
      confirmButtonColor: 'rgb(103, 184, 209)',
      confirmButtonText: 'Aceptar',
      icon: "error",
      button: false
  });
  }else{
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: 'Estás seguro?',
      text: "Se creará un nuevo torneo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(103, 184, 209)',
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmarTorneo(credentials);
      }
    })
  
  }
  //console.log(await response.json());

}


async function confirmarTorneo(credentials){
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
      
  }
  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Torneo`, settings);
  if(await response.json()){

    localStorage.setItem('nuevotorneoalert', '1');
    window.location.reload();
    
   /* Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: "Has agregado una nuevo torneo!",
      icon: "success",
      button: false,
      timer:3000
  });

  //document.getElementById('nombre').value = "";*/
  }
}


async function getTorneo() {
  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Torneo`);

  console.log(await response.json());

 
}



export const AltaTorneo = () => {


  const [Nombre, setNombre] = useState();
  const [FechaInicio, setFechaInicio] = useState();
  const [FechaFin, setFechaFin] = useState();

 useEffect(()=>{

  if(localStorage.getItem("nuevotorneoalert") !== null){
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: "Has agregado una nuevo torneo!",
      icon: "success",
      button: false,
      timer:3000
  });

  localStorage.removeItem('nuevotorneoalert');
  }
  
  //getTorneo();
 }, [])

  const handleSubmit = async (e) => {
      e.preventDefault();
      NuevoTorneo({
        Nombre:Nombre,
        FechaInicio:FechaInicio,
        FechaFin:FechaFin


      })
  }
  return (
  <div className="grid-container-element">
        <div className='grid-child-element responsive'>

        </div>
        <div>
          <div className='contenedor center'>
          <form onSubmit={handleSubmit}>

          <h1 style={{color: 'rgb(200,200,200)'}}>Nuevo Torneo</h1>
          <label htmlFor="" id='nombre' style={{marginTop: '55px', float: 'left', color: 'rgb(200,200,200)'}}>Nombre</label>
          <input type="text" required="required" className='form-control' onChange={e => setNombre(e.target.value)} style={{background: 'none', color: 'rgb(200,200,200)'}}/>

          <label htmlFor="" style={{marginTop: '45px', float: 'left', color: 'rgb(200,200,200)'}}>Fecha de Inicio</label>
          <input type="date" required="required" className='form-control' onChange={e => setFechaInicio(e.target.value)} style={{background: 'none',color: 'rgb(200,200,200)'}}/>

          <label htmlFor="" style={{marginTop: '45px', float: 'left', color: 'rgb(200,200,200)'}}>Fecha de Finalización</label>
          <input type="date" required="required" className='form-control' onChange={e => setFechaFin(e.target.value)} style={{background: 'none',color: 'rgb(200,200,200)'}}/>
          
          
          
          <input type="submit" value="Crear Torneo" style={{marginTop: '65px'}} className='btn-confirmar'/>
          </form>
          </div>
        </div>
  </div>  
  )
}
