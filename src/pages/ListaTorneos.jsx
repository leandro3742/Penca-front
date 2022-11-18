import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';





async function getTorneos() {

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarTorneos`);
  
    response = await response.json();

    //console.log(response[0]['nombre']);


    

 
    
    for(let i = response.length - 1; i >= 0; i = i - 1){
        var tbodyRef = document.getElementById('torneos').getElementsByTagName('tbody')[0];

        var newRow = tbodyRef.insertRow();
        
        var newCell = newRow.insertCell();
        
        var newText = document.createTextNode(response[i]['id']);
        newCell.appendChild(newText);

        var newCell = newRow.insertCell();
        
        var newText = document.createTextNode(response[i]['nombre']);
        newCell.appendChild(newText);

        var newCell = newRow.insertCell();
        
        var newText = document.createTextNode(new Date(response[i]['fechaInicio']).getDate() + '/' + new Date(response[i]['fechaInicio']).getMonth() + '/' + new Date(response[i]['fechaInicio']).getFullYear());
        newCell.appendChild(newText);

        var newCell = newRow.insertCell();
        
        var newText = document.createTextNode(new Date(response[i]['fechaFin']).getDate() + '/' + new Date(response[i]['fechaFin']).getMonth() + '/' + new Date(response[i]['fechaFin']).getFullYear());
        newCell.appendChild(newText);

        var newCell = newRow.insertCell();


        const btn = document.createElement("button");
        btn.className = "btnver";
        

        btn.innerHTML = "Ver Eventos";
        
        newCell.appendChild(btn);
        
    }

   
  }
  


export const ListaTorneos = () => {


    
 useEffect(()=>{
  
  getTorneos();
  
    //getTorneo();
   }, [])


  return (
    
    <div className="grid-container-element1" style={{}}>
    <div className=''>
         <table id="torneos" className="table table-striped table-dark tabla">
        
        <thead>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha Inicio</th>
            <th scope="col">Fecha Fin</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
           
        </tbody>
        </table>
            

            
            </div>
    </div>
  )
}
