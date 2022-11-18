import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';



async function NuevoEvento(credentials) {

  

    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: 'Estás seguro?',
      text: "Se creará el nuevo evento!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(103, 184, 209)',
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmarEvento(credentials);
      }
    })
  
  }
  //console.log(await response.json());


  async function getTorneo() {

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarTorneos`);
  
    response = await response.json();

    //console.log(response[0]['nombre']);




    for(let i = 0; i < response.length; i++){
      let t = document.getElementById('torneos');
      var opt = document.createElement('option');
      opt.value = response[i]['id'];
      opt.innerHTML = response[i]['nombre'];
      t.appendChild(opt); 
    }

   
  }
  




async function confirmarEvento(credentials){
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
      
  }
  console.log(JSON.stringify(credentials));

  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}agregarEvento`, settings);
  if(await response.json()){

    localStorage.setItem('nuevoeventoalert', '1');
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






export const AltaEvento = () => {


  const [EquipoLocal, setEquipoLocal] = useState();
  const [EquipoVisitante, setEquipoVisitante] = useState();
  const [FechaHora, setFechaHora] = useState();
  const [Torneo, setTorneo] = useState();




 useEffect(()=>{
  document.getElementById('torneos').empty;

  

getTorneo();






  if(localStorage.getItem("nuevoeventoalert") !== null){
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: "Has agregado un nuevo evento!",
      icon: "success",
      button: false,
      timer:3000
  });

  localStorage.removeItem('nuevoeventoalert');
  }
  
  //getTorneo();
 }, [])

  const handleSubmit = async (e) => {
      e.preventDefault();
      NuevoEvento({
        id:0,
        equipo1:EquipoLocal,
        equipo2:EquipoVisitante,
        fechaHora:FechaHora,
        golesEquipo1:"",
        golesEquipo2:"",
        resultado:"",
        torneo:Torneo




      })
  }
    return (
        <div className="grid-container-element eventos">
            <div className='portadaEvento'>



            </div>
            <div>

                <form onSubmit={handleSubmit}>

                    <div className='contenedor1 center'>
                        <h1 style={{ color: 'rgb(200,200,200)' }}>Nuevo Evento</h1>
                        <label htmlFor="" style={{ marginTop: '45px', float: 'left', color: 'rgb(200,200,200)' }}>Equipo Local</label>
                        <input type="text" required="required" id="el" className='form-control' onChange={e => setEquipoLocal(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Equipo Visitante</label>
                        <input type="text" required="required" className='form-control' onChange={e => setEquipoVisitante(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Fecha y Hora</label>
                        <input type="datetime-local" required="required" className='form-control' onChange={e => setFechaHora(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Torneo</label>
                        <select type="text" id="torneos" required="required" name="torneos" className='form-control' onChange={e => setTorneo(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }}>
                              <option value="">Seleccione un torneo</option>

                        </select>

                            
                        <input type="submit" value="Crear Evento" style={{ marginTop: '65px' }} className='btn-confirmar' />
                    
                    </div>
                    </form>

            </div>
            
        </div>
    )
}
