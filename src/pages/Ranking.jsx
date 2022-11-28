import React, { useState } from 'react';
import { createElement } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

async function getRanking(idPenca){
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPuntajeUsuarioPenca?id_Penca=`+idPenca+ `&esCompartida=true`);
  
    response = await response.json();

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


export const Ranking = () => {

    useEffect(()=>{
        
        getRanking(1);
    
      
       }, [])

    
  return (
    <div id="principal" className='grid-container-element1 ranking' >

   <h1 style={{marginTop: '120px', color: 'rgb(200,200,200'}}>Ranking de </h1>

    <div id="divtable" className='tablaranking center' style={{ marginTop: '-250px'}}>
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
