import React, { useState } from 'react';
import { createElement } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


async function getPencas(){
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEmpresarial`);
    response = await response.json();
    var tiene = 0;

    for(let i = 0; i < response.length; i++){
        if(sessionStorage.getItem('username') == response[i]['usuario_creador']){
            tiene = 1;
            let p = document.getElementById('pencas');
            var opt = document.createElement('option');
            opt.value = response[i]['id'];
            opt.innerHTML = response[i]['nombre'];
            p.appendChild(opt); 
        }
        
      }

      if(tiene == 0){
        
        document.getElementById('pencas').style = 'display: none';
        document.getElementById('participar').style = 'display: none';
        document.getElementById('label').style = 'display: none';

        Swal.fire({
            background: 'rgb(40,40,40)',
            color: 'rgb(200,200,200)',
            title: 'No tienes ninguna penca creada',
            text: "Deseas crear una?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(103, 184, 209)',
            cancelButtonColor: 'rgb(70,0,0)',
            cancelButtonText: 'Volver',
            confirmButtonText: 'Si, crear penca!'
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/suscripcion';
            }else{
                window.location.href = '/';

            }
          })


      }

    

}

export const MisPencas = () => {
    getPencas();
  return (
    <div id="principal" className='grid-container-element colores' >

        <div >
          <h5 id="label" style={{float: 'left', marginLeft: '15vh', color: 'rgb(200,200,200)', marginTop: '50px', lineHeight: '40px'}}>Mis pencas:     </h5>
          <div className='divselect'>
                <select id="pencas" className='form-control '  style={{width: '50%', height: '40px', marginLeft: '130px', color: 'white', background: 'rgb(36, 61, 73)'}} >
                    <option value="">Seleccione una penca</option>
                </select>
        </div>

        <h1 id="tit" style={{color: 'white', display: 'none'}}>No tienes ninguna penca creada!</h1>
        </div>

        <div>
        <input type="submit" hidden='hidden' id="participar" className="btn btn-login" onClick={e => handleSubmit(e.target.value)} style={{width: '180px', background: 'rgb(103, 184, 209)', marginTop: '50px', marginLeft: '-25vh'}} value="Participar"/>
        </div>
        




    </div>
  )
}
