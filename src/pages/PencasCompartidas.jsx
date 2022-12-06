import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';





async function calcularPremios(){

  

  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEventosTorneo?id=`+localStorage.getItem('torneo'));
  response = await response.json();
  var pencacompleta = true;

  for(let i = 0; i < response.length; i++){
    if(response[i]['resultado'] == '' || response[i]['resultado'] == null){
        pencacompleta = false;
    }
  }

  if(pencacompleta){
    confirmarCalculo(document.getElementById('pencas').value);
  }else{
    Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: "Error!",
        text: 'Para hacer el cálculo de premios, todos los eventos deben haber finalizado',
        icon: "error",
        button: false
    });
  }




    


}
  
 
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
    }
    

async function confirmarCalculo(idP){

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPuntajeUsuarioPenca?id_Penca=`+idP+ `&esCompartida=true`);
    response = await response.json();
    response = sortByKey(response, 'puntos');


    let pencas = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarCompartida`);
    pencas = await pencas.json();

    var idcp = null;
    var pozo = null;

    for(let i = 0; i < pencas.length; i++){
      if(pencas[i]['id'] == idP){
        idcp = pencas[i]['criterioPremio'];
        pozo = pencas[i]['pozo'];
      }
    }


    if(idcp != null && pozo != null){
      let percent = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPorcentajes?id_Criterio=`+idcp);
      percent = await percent.json();

      var usuarios = [];
      var porcentajes = [];

      for(let i = 0; i < percent.length; i++){
        if(response[i]['userna'] != '' && response[i]['userna'] != null){
          usuarios.push(response[i]['userna']);
        }
        porcentajes.push(percent[i]);
      }

      //alert(JSON.stringify(porcentajes));

      //efectuarPago(usuarios, porcentajes, pozo, idP);


      

    }
  
    
     


    for(let i = 0; i < usuarios.length; i++ ){
      var valor = pozo * (porcentajes[i] / 100);
        agregarPremioUsuario({
            username:usuarios[i],
            idPenca:idP,
            valorPremio:valor,
            pago: false
        });
    }

    if(localStorage.getItem("alertpremios") !== null){
      window.location.reload();
    }

    


}

async function agregarPremioUsuario(credentials){

    const settings = {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(credentials)
          
      }
      console.log(JSON.stringify(credentials));
    
      let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}agregarPremio`, settings);
      if(await response.json()){
        localStorage.setItem('alertpremios', '1');
      }
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


function contains(a, obj) {
  for (var i = 0; i < a.length; i++) {
      if (a[i] === obj) {
          return true;
      }
  }
  return false;
}


async function getPencas(idTorneo) {

  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarCompartida`);
  
  response = await response.json();
  var pencas = []; 

    for(let i = 0; i < response.length; i++){

      let userpenca = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarUsuarioPenca?id_Penca=`+response[i]['id']+`&esCompartida=true`);
      userpenca = await userpenca.json();

      for(let x = 0; x < userpenca.length; x++){
        if(userpenca[x]['username'] == sessionStorage.getItem('username')){
          pencas.push(response[i]['id']);
        }
      }

      
    }

    //console.log(response[0]['nombre']);



    for(let i = 0; i < response.length; i++){
      if(!contains(pencas,response[i]['id'])){
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



    /*for(let i = 0; i < response.length; i++){
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
    }*/

   
  }



  

async function getEventos(idTorneo) {

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEventosTorneo?id=`+idTorneo);
  
    response = await response.json();

    localStorage.setItem('torneo', idTorneo);


    //console.log(response[0]['nombre']);




    for(let i = 0; i < response.length; i++){
      

        var div = document.createElement("div");
        div.id = "eventos";
        var fecha = document.createElement("label"); var me = new Date(response[i]['fechaHora']).getMonth() + 1;
        fecha.innerHTML = new Date(response[i]['fechaHora']).getDate() + '/' + me + '/' + new Date(response[i]['fechaHora']).getFullYear() + ' ' + new Date(response[i]['fechaHora']).getHours() + ':' + new Date(response[i]['fechaHora']).getMinutes();
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


export const PencasCompartidas = () => {


    
 useEffect(()=>{

  if(localStorage.getItem("alertpremios") !== null){
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: "Se han otorgado los premios correspondientes!",
      icon: "success",
      button: false,
      timer:3000
  });
  localStorage.removeItem("alertpremios");

  }
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

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPremios`);
  
    response = await response.json();
    var existepremio = false;

    for(let i = 0; i < response.length; i++){
      if(response[i]['idPenca'] == document.getElementById('pencas').value){
        existepremio = true;
      }
    }

    if(existepremio){
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: "Ya se ha hecho el cálculo de premios para esta penca!",
        icon: "error",
        button: false
    });
    }else{


    //var idev = document.getElementsByClassName('idequipo').length;
    if(document.getElementById('pencas').value != ""){

    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: 'Solicitud de confirmación',
      text: "Seguro que deseas dar por finalizada esta penca y calcular los premios para sus participantes?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(103, 184, 209)',
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        calcularPremios();
      }
    })
  

  }
  }
}


  return (
        
    <div id="principal" className='grid-container-element colores' >

        <div>
          <h5 style={{float: 'left', marginLeft: '2vh', color: 'rgb(200,200,200)', marginTop: '50px', lineHeight: '40px'}}>Todas las pencas: </h5>
          <div className='divselect'>
            <select id="pencas" className='form-control' onChange={e => getEventosTorneo(e.target.value)} style={{display: 'inline-block', marginLeft: '15px', width: '450px', float: 'left', height: '40px', color: 'white', background: 'rgb(36, 61, 73)'}} >
                <option value="">Seleccione una penca</option>
            </select>
            <input type="submit"  className="btn btn-login" onClick={e => handleSubmit(e.target.value)} style={{display: 'inline-block', width: '150px', marginTop: '0px', marginLeft: '0px', background: 'rgb(85, 0, 0)', color: 'white'}} id="submit" value="Calcular Premios"/>

        </div>
        </div>

        <div>
        <input type="submit" hidden className="btn btn-login" onClick={e => handleSubmit(e.target.value)} style={{width: '180px', background: 'rgb(103, 184, 209)', marginTop: '50px', marginLeft: '-25vh'}} value="Participar"/>
        </div>
        




    </div>
  )
}
