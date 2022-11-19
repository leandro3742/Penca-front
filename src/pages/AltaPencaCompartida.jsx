import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';




async function NuevaPenca(credentials) {

  

    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: 'Estás seguro?',
      text: "Se creará el nuevo evento!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(103, 184, 209)',
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmarPenca(credentials);
      }
    })
  
  }
  //console.log(await response.json());


 function mostrarP(n){
  let cant = document.getElementById('ganadores').value;
  
  for(let i = 0; i < cant; i++){
    let x = 'inp' + (i+1);
    //alert(document.getElementById(x).value);
  }
   
 }

  async function setPorcentajes(cantidad) {
    

    if(document.getElementById('cantInputs').value > 0 || document.getElementById('cantInputs').value < 6 || document.getElementById('cantInputs').value == ""){
      let cant = document.getElementById('cantInputs').value;
      for(i = 0; i < cant; i++){
        let x = 'inp' + (i+1);
        document.getElementById(x).remove();
      }
      }

    
    if(cantidad > 5){
     
      cantidad = 5;
      document.getElementById('ganadores').value = cantidad;

    }

    if(cantidad < 0){
      cantidad = 0;
      document.getElementById('ganadores').value = cantidad;
    }

    document.getElementById('labelcant').style = 'display: block; color: rgb(170,170,170); margin-top: 35px';



    


    var i = 0


    


    for(i; i < cantidad; i++){
      

      var input = document.createElement("input");
      input.type = "number";
      input.className = "form-control"; // set the CSS class
      input.min = 1; 
      input.max = 100; 

      input.style =  "background: rgb(23, 41, 49);; width: 150px; margin-bottom: 30px; color: rgb(200,200,200); display: inline-block; margin-right: 30px; border: none; border-bottom: 1px solid grey;";
      var gan = i + 1;
      input.id = 'inp' + gan;
      var placeh = "% Ganador " + gan;
      input.placeholder = placeh;
      document.getElementById('container').appendChild(input); // put it into the DOM
      
    }

    document.getElementById('cantInputs').value = cantidad;


   
  }



  async function getTorneo() {

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






async function confirmarPenca(credentials){
    const settings = {
      method: 'POST',
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify(credentials)
        
    }
    console.log(JSON.stringify(credentials));
  
    let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}agregarCompartida`, settings);
    console.log(response.status);
    console.log(response.json());

    if(await response.json()){
  
      localStorage.setItem('nuevapencaalert', '1');
      window.location.reload();
      
     /* Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: "Has agregado una nuevo torneo!",
        icon: "success",
        button: false,
        timer:3000
    });
  
    //document.getElementById('nombre').value = "";*/
    }
  }
  
  
  




export const AltaPencaCompartida = () => {

  const [Nombre, setNombre] = useState();
  const [Torneo, setTorneo] = useState();
    
useEffect(()=>{
    document.getElementById('torneos').empty;
    getTorneo();


  if(localStorage.getItem("nuevapencaalert") !== null){
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: "Has agregado una nueva penca empresarial!",
      icon: "success",
      button: false,
      timer:3000
  });

  localStorage.removeItem('nuevapencaalert');
  }
    
  
   }, [])

   
  

   const handleSubmit = async (e) => {
    e.preventDefault();

    var cant = document.getElementById('ganadores').value;

    var inp1 = document.getElementById('inp1');
    if (inp1 !== null) {
      console.log('✅ Element exists');
        var porcentajes = [inp1.value];
        var inp2 = document.getElementById('inp2');
        if (inp2 !== null) {
          console.log('✅ Element exists');
          var porcentajes = [inp1.value, inp2.value];
        }
          var inp3 = document.getElementById('inp3');
          if (inp3 !== null) {
            console.log('✅ Element exists');
            var porcentajes = [inp1.value, inp2.value, inp3.value];
          }
            var inp4 = document.getElementById('inp4');
            if (inp4 !== null) {
              console.log('✅ Element exists');
              var porcentajes = [inp1.value, inp2.value, inp3.value, inp4.value];
            }
              var inp5 = document.getElementById('inp5');
              if (inp5 !== null) {
              console.log('✅ Element exists');
              var porcentajes = [inp1.value, inp2.value, inp3.value, inp4.value, inp5.value];
              }
    }

    NuevaPenca({
      id:0,
      nombre:Nombre,
      criterioPremio:{
      "id": 0,
      "cantGanadores": cant,
      "porcentajes": porcentajes
    }
      ,
      torneo:Torneo
     




    })
}

  return (
    <div className="grid-container-element pencasFondo">
            <div className='portadaPenca'>



            </div>
            <div>

            <form onSubmit={handleSubmit}>

                    <div className='contenedor1 center'>
                        <h1 style={{ color: 'rgb(200,200,200)' }}>Nueva Penca Compartida</h1>
                        <label htmlFor="" style={{ marginTop: '45px', float: 'left', color: 'rgb(200,200,200)' }}>Nombre</label>
                        <input type="text" required="required" id="nombre" className='form-control' onChange={e => setNombre(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                          <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Torneo</label>
                          <select type="text" id="torneos" required="required" name="torneos" className='form-control' onChange={e => setTorneo(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }}>
                                <option value="">Seleccione un torneo</option>

                          </select>

                          <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)'}}>Cantidad de ganadores (Máx 5)</label>
                          <input type="number"  min="1" max="5" required="required" id="ganadores" className='form-control' onChange={e => setPorcentajes(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                          <label htmlFor="" id="labelcant" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)', display: 'none'}}>Porcentaje de los ganadores</label><br />
                            <div id="container">
                            <input type="number" value="0" id="cantInputs" className='form-control' onChange={e => setPorcentajes(e.target.value)} style={{ background: 'green', color: 'rgb(200,200,200)', display: "none"}}  />

                            </div>
                        <input type="submit" value="Crear Penca" style={{ marginTop: '65px' }} className='btn-confirmar' />


                    
                    </div>
                </form>

            </div>
            
    </div>
  )
}
