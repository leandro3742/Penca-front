import React, { useState } from 'react';
import { createElement } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

import Datatable from 'react-data-table-component';


function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
  }
  
  async function getUsuarios(){
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarUsuarios`);
    response = await response.json();

    sortByKey(response, 'username');

    for(let i = 0; i < response.length; i++){
        getRoles(response[i]['username'], response[i]['nombre'], response[i]['apellido']);
    }


}

async function getRoles(us, nom, ape){
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarSubscripcionesUsuario?username=`+us);
  
    response = await response.json();


    let roles = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/ObtenerRoles?username=`+us);
    roles = await roles.json();
        var esadmin = 'User';
        for(let i = 0; i<roles.length; i++){
            if(roles[i] == 'ADMIN'){
                esadmin = 'Admin';
            }
        }

    

        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');


        td1.innerHTML = us;
        td2.innerHTML = nom + ' ' + ape;
        td3.innerHTML = response.length + ' Suscripciones';
        if(esadmin == 'Admin'){td3.innerHTML = ' - ';}
        td4.innerHTML = esadmin;

        if(response.length > 0){
            td3.style.color = 'green';
        }


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td4);
        tr.appendChild(td3);




        document.getElementById('tablebody').appendChild(tr);
    }




export const Usuarios = () => {

 /* const ejemplo = [
    {pos: 1, username: 'asdasd', pts: 55},
    {pos: 2, username: 'asdasd', pts: 45},
    {pos: 3, username: 'asdasd', pts: 35},
    {pos: 4, username: 'asdasd', pts: 25}

  ];

  const columnas = [
    {
      name: 'pos',
      selector: 'pos',
      sortable: true
    },
    {
      name: 'username',
      selector: 'name',
      sortable: true
    },
    {
      name: 'pts',
      selector: 'pts',
      sortable: true
    },
  ]
  
  
  <Datatable
      columns={columnas}
      data={ejemplo}
    
    />
  */

    useEffect(()=>{
        
        getUsuarios();
    
      
       }, [])

    
  return (
    <div id="principal" className='grid-container-element11 ranking' >

   <h1 style={{marginTop: '120px', color: 'rgb(200,200,200'}}>Lista de Usuarios </h1>

    <div id="divtable" className='tablaranking center' >
    
    <table style={{maxHeight: '120px'}} className="table table-striped table-dark  " >
  <thead>
    <tr>
      <th scope="col">Username</th>
      <th scope="col">Nombre y Apellido</th>
      <th scope="col">Tipo</th>
      <th scope="col">Subscripciones</th>
    </tr>
  </thead>
  <tbody id="tablebody">
    
  </tbody>
</table>
    </div>
    




</div>
  )
}
