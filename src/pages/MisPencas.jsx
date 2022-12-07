import React, { useState } from 'react';
import { createElement } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
  }
  

async function getRanking(idPenca){
  if(idPenca != ''){
    document.getElementById('divtable').hidden = false;
  }else{
    document.getElementById('divtable').hidden = true;
  }
  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPuntajeUsuarioPenca?id_Penca=`+idPenca+`&esCompartida=false`);
  
  response = await response.json();

  console.log(response);

  response = sortByKey(response, 'puntos');


  for(let i = 0; i < response.length; i++){
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');

      td1.innerHTML = i + 1;
      td2.innerHTML = response[i]['userna'];
      td3.innerHTML = response[i]['puntos'];


      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);


      document.getElementById('tablebody').appendChild(tr);
  }

}


async function getPencas(){
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEmpresarial`);

    if(response.status == 204){
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
    }else{
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

    

}

export const MisPencas = () => {
    getPencas();
  return (
    <div id="principal" className='grid-container-element11 colores' >

        <div >
          <h5 id="label" style={{float: 'left', marginLeft: '15vh', color: 'rgb(200,200,200)', marginTop: '50px', lineHeight: '40px'}}>Mis pencas:     </h5>
          <div className='divselect'>
                <select id="pencas" className='form-control ' onChange={e => getRanking(e.target.value)} style={{width: '50%', height: '40px', marginLeft: '130px', color: 'white', background: 'rgb(36, 61, 73)'}} >
                    <option value="">Seleccione una penca</option>
                </select>
        </div>

        <h1 id="tit" style={{color: 'white', display: 'none'}}>No tienes ninguna penca creada!</h1>
        </div>

        

        <div>
        <input type="submit" hidden='hidden' id="participar" className="btn btn-login" onClick={e => handleSubmit(e.target.value)} style={{width: '180px', background: 'rgb(103, 184, 209)', marginLeft: '-25vh'}} value="Participar"/>
        </div>


            <div id="divtable" hidden="hidden" className='tablaranking center tablemargin' >

            <table className="table table-striped table-dark  " >
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Usuario</th>
              <th scope="col">Puntaje</th>
            </tr>
            </thead>
            <tbody id="tablebody">

            </tbody>
            </table>
            </div>





            
        




    </div>
  )
}
