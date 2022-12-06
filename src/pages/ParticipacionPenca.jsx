import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';





async function Pronosticar(){
  
  localStorage.setItem('idpenca', document.getElementById(document.getElementById('pencas').value).value);
  localStorage.setItem('nombrepenca', document.getElementById('pencas').textContent);
  window.location.href = "/pronostico";
    
    

}



function verRanking(idPenca){
  localStorage.setItem('idpenca',idPenca);
  window.location.href = "/ranking";

}


async function cobrarPremio(credentials){

  const settings = {
    method: 'PUT',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
      
  }
  console.log(JSON.stringify(credentials));

  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}pagarPremio/`+sessionStorage.getItem('username')+`/`+document.getElementById('pencas').value, settings);
  if(await response.json()){



    localStorage.setItem('cobrarpremiosalert', '1');
    window.location.reload();
    
   

  //document.getElementById('nombre').value = "";*/
  }
  
}

async function verPremios(nose) { 

  let premios = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPremios`);
  premios = await premios.json();

  var existepremio = false;
  var premio = 0;

  var nomostrar = false;


  for(let i = 0; i < premios.length; i++){
    if(premios[i]['idPenca'] == document.getElementById('pencas').value && premios[i]['username'] == sessionStorage.getItem('username')  && premios[i]['pago'] == false){
      existepremio = true;
      premio = premios[i]['valorPremio'];
    } 
    if(premios[i]['idPenca'] == document.getElementById('pencas').value && premios[i]['username'] == sessionStorage.getItem('username')  && premios[i]['pago'] == true){
      nomostrar = true;
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: "Felicitaciones!",
        text: "Usted ha recibido un premio de $"+premios[i]['valorPremio']+' pesos uruguayos por su participación en esta penca',
        icon: "info",
        button: true
    });
    }
  }


  if(nomostrar == false){
  if(existepremio){

    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      text:'Ingrese los siguientes datos para que podamos depositarle',
      title: "Tiene un premio a cobrar de $"+premio+" pesos uruguayos",
      html: '<label>Ingrese los siguientes datos para que podamos depositarle</label><br><br><br><label style="float: left">Número de cuenta bancaria</label><input required id="numbanco" placeholder="Ingrese aquí su numero de cuenta..." type="text" class="form-control"/> <br> <label style="float: left">Nombre del banco</label><input id="banco" placeholder="Ingrese aquí el nombre del banco que usa..." type="text" class="form-control"/>',
      icon: "info",
      confirmButtonColor: 'rgb(103, 184, 209)',
      showCancelButton: true,
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cobrar Premio'
    }).then((result) => {
      if (result.isConfirmed) {
       if(document.getElementById('numbanco').value == '' || document.getElementById('banco').value == ''){
        Swal.fire({
          background: 'rgb(40,40,40)',
          color: 'rgb(200,200,200)',
          title: "Error",
          text: "No puedes dejar campos vacíos si quieres cobrar el premio",
          icon: "error",
          button: true
      });
       }else{
        cobrarPremio({
          username:sessionStorage.getItem('username'),
          idPenca:document.getElementById('pencas').value
        });
       }
      }
    })

    
  }else{



  var idpenca = document.getElementById('pencas').value;
  var criterioPremios = "";
  var pozo = "";
  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarCompartida`);
  response = await response.json();

  for(let i = 0; i < response.length; i++){
    if(response[i]['id'] == idpenca){
      criterioPremios = response[i]['criterioPremio'];
      pozo = response[i]['pozo'];
    }
  }

  if(criterioPremios != ""){
    verCriterioPremios(criterioPremios, pozo);
  }
}
}

async function verCriterioPremios(idcp, pozo) { 

  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPorcentajes?id_Criterio=`+idcp);
  response = await response.json();
  var premios = '';
  for(let i = 0; i < response.length; i++){
    premios = premios + '<p style="color: rgb(200,200,200); margin-top: 30px" >'+ (i+1)+'°: ' + response[i] +'% del pozo ($'+(pozo*(response[i]/100)) + ' pesos uruguayos) </p>'; 
  }


  
  Swal.fire({
    background: 'rgb(40,40,40)',
    color: 'rgb(200,200,200)',
    title: "Pozo actual: $" + pozo,
    html: premios,
    icon: "info",
    button: true
});
}
}





async function getEventosTorneo(idPenca, posicion) {

  localStorage.setItem('esCompartida', document.getElementById('esCompartida'+posicion).value);

  //alert(document.getElementById('esCompartida'+posicion).value);
   /*var className = document.getElementsByClassName('borrar');
   for(var index=0;index < className.length;index++){
        alert(className.length + ' - ' + index);

      console.log(className[index].innerHTML);
      className[index].remove();
   }*/
    // Get all elements of class B
    //alert(document.querySelectorAll("#eventos").length);


    if(idPenca == ''){
      document.getElementById('editar').hidden = true;
      document.getElementById('ranking').hidden = true;
      document.getElementById('premios').hidden = true;


    }else{
      document.getElementById('editar').hidden = false;
      document.getElementById('ranking').hidden = false;
      document.getElementById('premios').hidden = false;



    }



    document.querySelectorAll("#eventos").forEach(div => {
      div.remove("borrar");
      // Swap the text as well
      //div.textContent = "Class A";
    })




    if(document.getElementById('esCompartida'+posicion).value == 'true'){


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

  if(document.getElementById('esCompartida'+posicion).value == 'false'){


    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEmpresarial`);
  
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




}



async function getPencas(idTorneo) {

    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarCompartida`);
  
    response = await response.json();
    var pencas = [];
    var esCompartida = [];
    

  for(let i = 0; i < response.length; i++){

    let userpenca = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarUsuarioPenca?id_Penca=`+response[i]['id']+`&esCompartida=true`);
    userpenca = await userpenca.json();

    for(let x = 0; x < userpenca.length; x++){
      if(userpenca[x]['username'] == sessionStorage.getItem('username')){
        pencas.push(response[i]['id']);
        esCompartida.push('true');
      }
    }
  }
  

    let response1 = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEmpresarial`);

    if(response1.status == 200 || response1.status == 201){
  
    response1 = await response1.json();
    var pencas1 = [];

  for(let i = 0; i < response1.length; i++){

    let userpenca1 = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarUsuarioPenca?id_Penca=`+response1[i]['id']+`&esCompartida=false`);
    userpenca1 = await userpenca1.json();

    for(let x = 0; x < userpenca1.length; x++){
      if(userpenca1[x]['username'] == sessionStorage.getItem('username')){
        pencas1.push(response1[i]['id']);
        pencas.push(response1[i]['id']);
        esCompartida.push('false');

      }
    }
  }
  
    
  }



    for(let x = 0; x < esCompartida.length; x++){
      var esc = document.createElement('input');
      esc.style.display = 'none';
      esc.value = esCompartida[x];
      esc.id = 'esCompartida'+x;
      document.getElementById('principal').appendChild(esc);

    }

    //console.log(response[0]['nombre']);


    for(let i = 0; i < response.length; i++){
      


      for(let it = 0; it < pencas.length; it++){
        
      if(esCompartida[it] == 'true'){

        if(pencas[it] == response[i]['id']){


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
    }
  }


 for(let i = 0; i < response1.length; i++){

  for(let it = 0; it < pencas.length; it++){

      
      if(esCompartida[it] == 'false'){
        if(pencas[it] == response1[i]['id']){

          let t = document.getElementById('pencas');
          var opt = document.createElement('option');
          opt.value = response1[i]['id'];
          opt.id = response1[i]['id'];
          opt.innerHTML = response1[i]['nombre'];

          
          var idp = document.createElement("input");
          idp.id = response1[i]['nombre'];
          idp.style.display = 'none';
          idp.value = response1[i]['id'];
          document.getElementById('principal').appendChild(idp);




          t.appendChild(opt); 
    }
      }
      }

    }
    




    



/*
    
    for(let i = 0; i < response1.length; i++){
      


      for(let it = 0; it < pencas1.length; it++){

        if(pencas1[it] == response1[i]['id']){

          let t = document.getElementById('pencas');
          var opt = document.createElement('option');
          opt.value = response1[i]['id'];
          opt.id = response1[i]['id'];
          opt.innerHTML = response1[i]['nombre'];

          
          var idp = document.createElement("input");
          idp.id = response1[i]['nombre'];
          idp.style.display = 'none';
          idp.value = response1[i]['id'];
          document.getElementById('principal').appendChild(idp);




      t.appendChild(opt); 
        }
      }
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


export const ParticipacionPenca = () => {


    
 useEffect(()=>{
    document.getElementById('pencas').empty;
    getPencas(0);
    //getEventos();
    if(localStorage.getItem("cobrarpremiosalert") !== null){
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: "Perfecto!",
        text: 'Pronto te depositarán tu premio',
        icon: "success",
        button: true
    });
    localStorage.removeItem("cobrarpremiosalert");

    }

    if(localStorage.getItem("alertparticipacion") !== null){
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: "Te has anotado a la penca!",
        text: 'Aquí en "Mis Participaciones" puedes encontrar todas las pencas en las que participas y editar tus pronósticos',
        icon: "success",
        button: true
    });
    localStorage.removeItem("alertparticipacion");

    }


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

   Pronosticar();
  


}

const handleSubmit1 = async (e) => {
  //e.preventDefault();

  //var idev = document.getElementsByClassName('idequipo').length;

 verRanking(document.getElementById('pencas').value);



}


  return (
        
    <div id="principal" className='grid-container-element colores' >

        <div>
          <h5 style={{float: 'left', marginLeft: '10vh', color: 'rgb(200,200,200)', marginTop: '50px', lineHeight: '40px'}}>Pencas en las que participo:     </h5>
        <select id="pencas" className='form-control' onChange={e => getEventosTorneo(e.target.value, e.target.selectedIndex-1)} style={{width: '50%', height: '40px', marginTop: '50px', marginLeft: '130px', color: 'white', background: 'rgb(36, 61, 73)'}} >
            <option value="">Seleccione una penca</option>
        </select>
        </div>

        <div id="acciones">
        <input type="button" id="editar"  hidden="hidden" className="btn btn-login " onClick={e => handleSubmit(e.target.value)} style={{color: 'white', background: 'rgb(0, 4, 45)', width: '180px', marginTop: '50px', marginLeft: '5vh'}} value="Mis Pronósticos"/><br className='br' />
        <input type="button" id="ranking" hidden="hidden" className="btn btn-login " onClick={e => handleSubmit1(e.target.value)} style={{color: 'white', background: 'rgb(0, 4, 45)', width: '180px', marginTop: '50px', marginLeft: '5vh'}} value="Posiciones"/> 
        <input type="button" id="premios" hidden="hidden" className="btn btn-login " onClick={e => verPremios(e.target.value)} style={{color: 'white', background: 'rgb(0, 4, 45)', width: '180px', marginTop: '50px', marginLeft: '5vh'}} value="Premios"/> 

        </div>
        




    </div>
  )
}
