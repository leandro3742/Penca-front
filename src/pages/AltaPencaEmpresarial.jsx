import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';




async function NuevaPenca(credentials) {

  

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
        confirmarPenca(credentials);
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






async function confirmarPenca(credentials){
    const settings = {
      method: 'POST',
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify(credentials)
        
    }
    console.log(JSON.stringify(credentials));
  
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}agregarEmpresarial`, settings);
    console.log(response.status);
    if(await response.json()){
  
      localStorage.setItem('nuevapencaalert', '1');
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
  
  
  




export const AltaPencaEmpresarial = () => {

  const Link = "";
  const [Nombre, setNombre] = useState();
  const Usuario = sessionStorage.getItem('username');
  const [Torneo, setTorneo] = useState();
    
useEffect(()=>{
    document.getElementById('torneos').empty;
    getTorneo();


  if(localStorage.getItem("nuevapencaalert") !== null){
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: "Has agregado una nueva penca empresarial!",
      icon: "success",
      button: false,
      timer:3000
  });

  localStorage.removeItem('nuevapencaalert');
  }
    
  
   }, [])


   const handleSubmit = async (e) => {
    e.preventDefault();
    NuevaPenca({
      id:0,
      link:Link,
      nombre:Nombre,
      usuario_creador:Usuario,
      torneo:Torneo
     




    })
}

  return (
    <div className="grid-container-element pencasFondo">
            <div className='portadaPenca'>



            </div>
            <div>

            <form onSubmit={handleSubmit}>

                    <div className='contenedor1 center'>
                        <h1 style={{ color: 'rgb(200,200,200)' }}>Nueva Penca Empresarial</h1>
                        <label htmlFor="" style={{ marginTop: '45px', float: 'left', color: 'rgb(200,200,200)' }}>Nombre</label>
                        <input type="text" required="required" id="nombre" className='form-control' onChange={e => setNombre(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

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
