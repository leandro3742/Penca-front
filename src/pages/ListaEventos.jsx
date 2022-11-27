import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';



async function UpdateEvento(credentials) {

  const settings = {
    method: 'PUT',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
      
  }
  console.log(JSON.stringify(credentials));

  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}actualizarEvento`, settings);
  if(await response.json()){

    localStorage.setItem('actualizareventosalert', '1');
    window.location.reload();
    
   

  //document.getElementById('nombre').value = "";*/
  }

}
//console.log(await response.json());



async function confirmarEvento(credentials){
  
  document.querySelectorAll("#idequipo").forEach(div => {
    //alert(div.value);
    var ideq = div.value;

    //var vareq1 = 'equipo1' + id;
    var eq1 = document.getElementById('equipo1'+ideq).textContent;
    var eq2 = document.getElementById('equipo2'+ideq).textContent;
    var f = document.getElementById('f'+ideq).textContent;
    var d = new Date(f);
    f = d.toJSON();

    var reseq1 = document.getElementById('resequipo1'+ideq).value;
    var reseq2 = document.getElementById('resequipo2'+ideq).value;
    var res = "";
    var torneoid = document.getElementById('torneos').value;

    if(reseq1 != "" && reseq2 != "" && reseq1 != null && reseq2 != null){
      if(reseq1 == reseq2){
        res = 'Empate';
      }
      if(reseq1 > reseq2){
        res = eq1;
      }

      if(reseq1 < reseq2){
        res = eq2;
      }
    }


    
    UpdateEvento({
      id:ideq,
      equipo1:eq1,
      equipo2:eq2,
      fechaHora:f,
      golesEquipo1:reseq1,
      golesEquipo2:reseq2,
      resultado:res,
      torneo:torneoid




    })

  })
}



async function getEventosTorneo(idTorneo) {
   /*var className = document.getElementsByClassName('borrar');
   for(var index=0;index < className.length;index++){
        alert(className.length + ' - ' + index);

      console.log(className[index].innerHTML);
      className[index].remove();
   }*/
    // Get all elements of class B
    //alert(document.querySelectorAll("#eventos").length);

    document.querySelectorAll("#eventos").forEach(div => {
      div.remove("borrar");
      // Swap the text as well
      //div.textContent = "Class A";
    })

  
        
    
    getEventos(idTorneo);

}



async function getTorneo(idTorneo) {

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



  

async function getEventos(idTorneo) {

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEventosTorneo?id=`+idTorneo);
  
    response = await response.json();

    //console.log(response[0]['nombre']);




    for(let i = 0; i < response.length; i++){
      /*var principal = document.getElementById('principal');
      var div = document.createElement('div');
      var fecha = document.createElement('label');
      fecha.style = "color: rgb(200,200,200); margin-bottom: 30px";
      fecha.textContent = "asd";
      t.appendChild(div); 


      div.className('resultados');
      t.appendChild(principal); */

        var div = document.createElement("div");
        div.id = "eventos";
        var fecha = document.createElement("label"); var mont = new Date(response[i]['fechaHora']).getMonth() + 1;
        fecha.innerHTML = new Date(response[i]['fechaHora']).getDate() + '/' + mont + '/' + new Date(response[i]['fechaHora']).getFullYear() + ' ' + new Date(response[i]['fechaHora']).getHours() + ':' + new Date(response[i]['fechaHora']).getMinutes();
        fecha.style.color = "rgb(200,200,200)";
        fecha.style.marginBottom = '30px';
        fecha.id = 'fecha' + response[i]['id'];
        fecha.classList = 'borrar divres';

        var f = document.createElement("label");
        f.innerHTML = new Date(response[i]['fechaHora']);
        f.style.color = "red";
        f.style.display = 'none';
        f.id = 'f' + response[i]['id'];
        //f.classList = 'borrar';


        div.classList = 'resultados center borrar';
        div.appendChild(fecha);
        div.appendChild(f);


        var div1 = document.createElement("div");
        var linea = document.createElement("label");
        div1.classList = 'borrar';
        linea.classList = 'borrar';

        linea.innerHTML = "";
        div.appendChild(div1);

        var e1 = document.createElement("label");
        e1.innerHTML = response[i]['equipo1'];
        e1.id = 'equipo1' + response[i]['id'];
        e1.classList = 'labelcuadros borrar';
        div.appendChild(e1);

        var res1 = document.createElement("input");
        res1.placeholder = '-';
        res1.id = 'resequipo1' + response[i]['id'];
        res1.classList = 'inputclass arrows borrar floatleft';
        res1.value = response[i]['golesEquipo1'];
        div.appendChild(res1);

        var idevento = document.createElement("input");
        //idevento.id = 'idequipo' + response[i]['id'];
        idevento.id = 'idequipo';
        idevento.value = response[i]['id'];
        idevento.className = "ideventos";
        idevento.style.display = 'none';
        div.appendChild(idevento);


        var vs = document.createElement("label");
        vs.innerHTML = "  VS  ";
        vs.style.color = "grey";
        vs.classList = 'borrar';

        div.appendChild(vs);


        var res2 = document.createElement("input");
        res2.placeholder = '-';
        res2.id = 'resequipo2' + response[i]['id'];
        res2.classList = 'inputclass arrows borrar';
        res2.value = response[i]['golesEquipo2'];
        div.appendChild(res2);


        var e2 = document.createElement("label");
        e2.innerHTML = response[i]['equipo2'];
        e2.id = 'equipo2' + response[i]['id'];
        e2.classList = 'labelcuadros borrar';
        div.appendChild(e2);


        var div1 = document.createElement("div");
        var linea = document.createElement("label");
        linea.innerHTML = "";
        div1.classList = 'borrar';
        linea.classList = 'borrar';

        div.appendChild(div1);



        var fin = document.createElement("label");
        fin.style.color = "grey";
        fin.style.marginTop = "30px";

        fin.innerHTML = "Finalizado";
        fin.classList = 'borrar';

        if(response[i]['resultado'] == ""){
            fin.style.visibility = 'hidden';
        }
        div.appendChild(fin);


        document.getElementById("principal").appendChild(div);
      

    }

   
  }


export const ListaEventos = () => {


    
 useEffect(()=>{
    document.getElementById('torneos').empty;
    getTorneo();
    //getEventos();

    if(localStorage.getItem("actualizareventosalert") !== null){
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: "Se han actualizado los eventos correctamente!",
        icon: "success",
        button: false,
        timer:3000
    });
  
    localStorage.removeItem('actualizareventosalert');
    }
    
    //getTorneo();
   }, [])

   const handleSubmit = async (e) => {
    //e.preventDefault();

    //var idev = document.getElementsByClassName('idequipo').length;

    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: 'Estás seguro?',
      text: "Se actualizarán los resultados de los eventos modificados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(103, 184, 209)',
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmarEvento();
      }
    })
  

   
}


  return (
        
    <div id="principal" className='grid-container-element colores' >

        
        <select id="torneos" className='form-control' onChange={e => getEventosTorneo(e.target.value)} style={{width: '50%', height: '40px', marginTop: '50px', marginLeft: '130px', color: 'white', background: 'rgb(36, 61, 73)'}} >
            <option value="">Seleccione un torneo</option>
        </select>
        
        <input type="submit" className="btn btn-login" onClick={e => handleSubmit(e.target.value)} style={{width: '180px', background: 'rgb(103, 184, 209)', marginTop: '50px', marginLeft: '-25vh'}} value="Actualizar Resultados"/>
        
        
        



    </div>
  )
}
