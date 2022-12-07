import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';




async function UpdatePronostico(credentials){
    //console.log(JSON.stringify(credentials));
 // localStorage.setItem('penca', document.getElementById(document.getElementById('pencas').value).value);

 const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
      
  }
  console.log(JSON.stringify(credentials));


  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}agregarPronostico`, settings);


  //alert(await response.status);

    if(await response.json()){
        localStorage.setItem('actualizareventosalert', '1');
        window.location.reload();

        
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

    

        
    
    getEventos();



}

  

async function getEventos() {
    let response1 = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarTorneos`);
    response1 = await response1.json();
    var tit = document.createElement("label");
    tit.innerHTML = "Estos son tus pronósticos para:   ";
    tit.style.color = 'rgb(200,200,200)';
    tit.style.marginTop = '50px';
    document.getElementById('primerdiv').appendChild(tit);

    for(let i = 0; i < response1.length; i++){
        if(response1[i]['id'] == localStorage.getItem('torneo')){
            //document.getElementById('titulo').textContent = response1[i]['nombre'];
            var tit = document.createElement("label");
            tit.innerHTML = response1[i]['nombre'];
            tit.style.color = 'white';
            tit.style.fontSize = '25px';
            tit.style.marginTop = '50px';
            document.getElementById('primerdiv').appendChild(tit);
        }
    }





    var idTorneo = localStorage.getItem('torneo');
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEventosTorneo?id=`+idTorneo);
  
    response = await response.json();

    localStorage.setItem('torneo', idTorneo);
    var user = sessionStorage.getItem('username');
    var idpe = localStorage.getItem('idpenca');


    //console.log(response[0]['nombre']);



    for(let i = 0; i < response.length; i++){
      
        var eventoid = response[i]['id'];

        var div = document.createElement("div");
        div.id = "eventos";
        var fecha = document.createElement("label"); var mes = new Date(response[i]['fechaHora']).getMonth() + 1; 
        fecha.innerHTML = new Date(response[i]['fechaHora']).getDate() + '/' + mes + '/' + new Date(response[i]['fechaHora']).getFullYear() + ' ' + new Date(response[i]['fechaHora']).getHours() + ':' + new Date(response[i]['fechaHora']).getMinutes() + ' - Pronóstico';
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
        res1.type = 'number';
        var esComp = localStorage.getItem('esCompartida');
        let pronostico = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPronosticosUsuario?username=`+user+`&id_Penca=`+idpe+`&esCompartida=`+ esComp);
        //let pronostico = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarPronosticosUsuario?username=facundo@bunker360.com&id_Penca=1`);

        pronostico = await pronostico.json();
        for(let x = 0; x < pronostico.length; x++){
          if(pronostico[x]['id_Evento'] == eventoid){
            res1.value = pronostico[x]['golesEquipo1'];
          }
        }
        var pronosticoequipo1 = res1.value;
          //res1.value = response[i]['golesEquipo1'];
        res1.style = 'background: rgb(30,30,30)';
        div.appendChild(res1);

        var idevento = document.createElement("input");
        //idevento.id = 'idequipo' + response[i]['id'];
        idevento.id = 'idequipo';
        idevento.value = response[i]['id'];
        idevento.className = "ideventos";
        idevento.style.display = 'none';
        div.appendChild(idevento);


       var idev = document.createElement("input");
        //idevento.id = 'idequipo' + response[i]['id'];
        idev.id = 'idev' + i;
        idev.value = response[i]['id'];
        idev.style.display = 'none';
        div.appendChild(idev);

        var vs = document.createElement("label");
        vs.innerHTML = "  VS  ";
        vs.style.color = "grey";
        vs.classList = 'borrar';

        div.appendChild(vs);


        var res2 = document.createElement("input");
        res2.placeholder = '-';
        res2.type = 'number';
        res2.style = 'background: rgb(30,30,30);'
        res2.id = 'resequipo2' + response[i]['id'];
        res2.classList = 'inputclass arrows borrar';

        

        for(let x = 0; x < pronostico.length; x++){
          if(pronostico[x]['id_Evento'] == eventoid){
            res2.value = pronostico[x]['golesEquipo2'];
          }
        }
        var pronosticoequipo2 = res2.value;

        //res2.value = response[i]['golesEquipo2'];
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
        fin.style.color = "rgb(85,85,85)";
        fin.style.marginTop = "30px";

        var puntosxpartido = 0;

        if((pronosticoequipo1 < pronosticoequipo2 && response[i]['golesEquipo1'] < response[i]['golesEquipo2']) || (pronosticoequipo1 > pronosticoequipo2 && response[i]['golesEquipo1'] > response[i]['golesEquipo2']) || (pronosticoequipo1 == pronosticoequipo2 && response[i]['golesEquipo1'] == response[i]['golesEquipo2'])){
          puntosxpartido = puntosxpartido + 3;
          if(pronosticoequipo1 == response[i]['golesEquipo1']){
            puntosxpartido = puntosxpartido + 1;
          }
          if(pronosticoequipo2 == response[i]['golesEquipo2']){
            puntosxpartido = puntosxpartido + 1;
          }
        }

        if(pronosticoequipo1 == response[i]['golesEquipo1'] && pronosticoequipo2 == response[i]['golesEquipo2']){
          puntosxpartido = 5;
        }


        fin.innerHTML = 'Evento Finalizado ' + '- '+ puntosxpartido + ' puntos <br>' + e1.textContent + ' ' + response[i]['golesEquipo1'] + ' - ' + response[i]['golesEquipo2'] + ' ' + e2.textContent;
        fin.classList = 'borrar';

        if(response[i]['resultado'] == ""){
            fin.style.visibility = 'hidden';
        }else{
          //esto es provisorio, deberia poner como medida el horario del partido
            res1.readOnly = true;
            res2.readOnly = true;
        }

        var hoy = new Date();
        var fp = new Date(response[i]['fechaHora']);

        if(fp >= hoy){
          if(fp == hoy){
            if(fp.getHours() >= hoy.getHours()){
              if(fp.getHours() == hoy.getHours()){
                if(fp.getMinutes > hoy.getMinutes()){
                  res1.readOnly = true;
                  res2.readOnly = true;
                }
              }
            }else{
              res1.readOnly = true;
              res2.readOnly = true;
            }
        }
        }else{
            res1.readOnly = true;
            res2.readOnly = true;
        }
        div.appendChild(fin);
        


        document.getElementById("principal").appendChild(div);
      
       

    }

        
  }
  async function altaPronostico(){
  
    document.querySelectorAll("#idequipo").forEach(div => {
      //alert(div.value);
      var ideq = div.value;
  
      //var vareq1 = 'equipo1' + id;
      var f = document.getElementById('f'+ideq).textContent;
      var d = new Date(f);
      f = d.toJSON();
  
      var reseq1 = document.getElementById('resequipo1'+ideq).value;
      var reseq2 = document.getElementById('resequipo2'+ideq).value;
      var penca = localStorage.getItem('idpenca');
      var username = sessionStorage.getItem('username');


  
      if(username != null && username != ""){

        if(localStorage.getItem('esCompartida') == 'true'){
          var escom = true;
        }else{
          var escom = false;

        }

  
      UpdatePronostico({
        golesEquipo1:reseq1,
        golesEquipo2:reseq2,
        username:username,
        id_Evento:ideq,
        id_Penca:penca,
        esCompartida:escom
  

      })

    }else{
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: "No se econtró usuario logueado!",
        icon: "error",
        button: false,
        timer:3000
    });
    }
  
    })
  }
  

export const Pronostico = () => {


    
 useEffect(()=>{

    //UpdatePronostico();
    getEventosTorneo(localStorage.getItem('idpenca'));
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
      text: "Se guardarán/modificarán los pronósticos que has hecho",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(103, 184, 209)',
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        altaPronostico();
      }
    })
  

   
}


  return (
        
    <div id="principal" className='grid-container-element colores' >

        
        
        
        <div id="primerdiv" className='resp'>
            
        <h2 id="titulo" style={{color: 'white', marginTop: '50px', float: 'left', marginLeft: '50px'}}></h2>

        </div>
                


        <div className='resp1' style={{ }}>
        <input type="submit" className="btn btn-login" onClick={e => handleSubmit(e.target.value)} style={{width: '180px', color:'white', background: 'rgb(0, 4, 45)', marginTop: '50px', float: 'right', marginRight: '50px'}} value="Confirmar Pronósticos"/>
        </div>


    </div>
  )
}
