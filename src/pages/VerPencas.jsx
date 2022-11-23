import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';





async function Participar(credentials){
  
  localStorage.setItem('idpenca', document.getElementById(document.getElementById('pencas').value).value);
  localStorage.setItem('nombrepenca', document.getElementById('pencas').textContent);
  window.location.href = "/participacionpenca";
    
    

}



async function getEventosTorneo(idPenca) {
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

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarCompartida`);
  
    response = await response.json();

    //console.log(response[0]['nombre']);


     var idTorneo = -1;
    for(let i = 0; i < response.length; i++){

      if(response[i]['id'] == idPenca){
        idTorneo = response[i]['torneo'];
      }
    }

        
    
    getEventos(idTorneo);



}



async function getPencas(idTorneo) {

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarCompartida`);
  
    response = await response.json();

    //console.log(response[0]['nombre']);



    for(let i = 0; i < response.length; i++){
      let t = document.getElementById('pencas');
      var opt = document.createElement('option');
      opt.value = response[i]['id'];
      opt.id = response[i]['id'];
      opt.innerHTML = response[i]['nombre'];

      
      var idp = document.createElement("input");
      idp.id = response[i]['nombre'];
      idp.style.display = 'none';
      idp.value = response[i]['id'];
      document.getElementById('principal').appendChild(idp);




      t.appendChild(opt); 
    }

   
  }



  

async function getEventos(idTorneo) {

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEventosTorneo?id=`+idTorneo);
  
    response = await response.json();

    localStorage.setItem('torneo', idTorneo);


    //console.log(response[0]['nombre']);




    for(let i = 0; i < response.length; i++){
      

        var div = document.createElement("div");
        div.id = "eventos";
        var fecha = document.createElement("label");
        fecha.innerHTML = new Date(response[i]['fechaHora']).getDate() + '/' + new Date(response[i]['fechaHora']).getMonth() + '/' + new Date(response[i]['fechaHora']).getFullYear() + ' ' + new Date(response[i]['fechaHora']).getHours() + ':' + new Date(response[i]['fechaHora']).getMinutes();
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
        res1.disabled = true;
        res1.style = 'background: rgb(30,30,30)';
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
        res2.disabled = true;
        res2.style = 'background: rgb(30,30,30);'
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


export const VerPencas = () => {


    
 useEffect(()=>{
    document.getElementById('pencas').empty;
    getPencas(0);
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
      title: 'Solicitud de confirmación',
      text: "Seguro que deseas participar en esta penca? por favor confirma para continuar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(103, 184, 209)',
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Participar();
      }
    })
  

   
}


  return (
        
    <div id="principal" className='grid-container-element colores' >

        <div>
        <select id="pencas" className='form-control' onChange={e => getEventosTorneo(e.target.value)} style={{width: '50%', height: '40px', marginTop: '50px', marginLeft: '130px', color: 'white', background: 'rgb(36, 61, 73)'}} >
            <option value="">Seleccione una penca</option>
        </select>
        </div>

        <div>
        <input type="submit" className="btn btn-login" onClick={e => handleSubmit(e.target.value)} style={{width: '180px', background: 'rgb(103, 184, 209)', marginTop: '50px', marginLeft: '-25vh'}} value="Participar"/>
        </div>
        




    </div>
  )
}
