import React, { useState } from 'react';
import Swal from 'sweetalert2';


async function NuevoEvento(credentials) {

  
        Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: 'Estás seguro?',
        text: "Se creará un nuevo evento!",
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
    
    
    //console.log(await response.json());
  
  }
  

  async function confirmarEvento(credentials){
    const settings = {
      method: 'POST',
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify(credentials)
        
    }
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Evento`, settings);
    if(await response.json()){
  
      localStorage.setItem('nuevoeventoalert', '1');
      window.location.reload();
      
     
    }
  }




export const AltaEvento = () => {
    const [EquipoLocal, setEquipoLocal] = useState();
    const [EquipoVisitante, setEquipoVisitante] = useState();
    const [FechaHora, setFechaHora] = useState();
    const [Torneo, setTorneo] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        NuevoEvento({
            EquipoLocal,
            EquipoVisitante,
            FechaHora,
            Torneo


        })
    }


    return (
        <div className="grid-container-element eventos">
            <div className='portadaEvento'>


            <a href="/home"><button className='btn-back' style={{fontSize: '20px', float: 'left', cursor:'pointer'}} >🡄 Back</button></a>

            </div>
            <div>

                <form onSubmit={handleSubmit}>

                    <div className='contenedor1 center'>
                        <h1 style={{ color: 'rgb(200,200,200)' }}>Nuevo Evento</h1>
                        <label htmlFor="" style={{ marginTop: '45px', float: 'left', color: 'rgb(200,200,200)' }}>Equipo Local</label>
                        <input type="text" className='form-control' onChange={e => setEquipoLocal(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Equipo Visitante</label>
                        <input type="text" className='form-control' onChange={e => setEquipoVisitante(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Fecha y Hora</label>
                        <input type="datetime-local" className='form-control' onChange={e => setFechaHora(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Torneo</label>
                        <select type="text" className='form-control' onChange={e => setTorneo(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }}>
                            <option value="1">Mundial</option>
                        </select>



                        <input type="submit" value="Crear Evento" style={{ marginTop: '65px' }} className='btn-confirmar' />
                    
                    </div>
                    </form>

            </div>
            
        </div>
    )
}
