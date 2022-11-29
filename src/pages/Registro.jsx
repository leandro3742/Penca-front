import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';



async function NuevoUser(credentials) {

  
 
  
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: 'Serguro que deseas confirmar tu registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(103, 184, 209)',
      cancelButtonColor: 'rgb(70,0,0)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmarRegistro(credentials);
      }
    })
  
  }
  //console.log(await response.json());






async function confirmarRegistro(credentials){
  let aux = false;
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
      
  }
  //console.log(JSON.stringify(credentials));


  let response = await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/Register`, settings);
  //console.log(await response.status);
  var respuesta = await response.json();
  console.log(respuesta['statusMessage']);

    if(response.status != 200 && response.status != 201){
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: 'Error!',
        text: respuesta['statusMessage'],
        icon: "error",
        button: false
    });
    }else{
      
      localStorage.setItem('registroalert', '1');
      window.location.reload();
  
     
    }
    
    //console.log(JSON.stringify(credentials));
    //console.log(response);

    
  
 
}
export const Registro = () => {
  

  const [Nombre, setNombre] = useState();
  const [Apellido, setApellido] = useState();
  const [Email, setEmail] = useState();
  const [Pass, setPass] = useState();


 useEffect(()=>{

  if(localStorage.getItem("registroalert") !== null){
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      title: "Te has registrado correctamente!",
      icon: "success",
      button: false,
      timer:3000
  });

  localStorage.removeItem('registroalert');
  }
  
  //getTorneo();
 }, [])

  const handleSubmit = async (e) => {
      e.preventDefault();
      NuevoUser({
        nombre:Nombre,
        apellido:Apellido,
        email:Email,
        password:Pass


      })
  }
  return (
    <div className='portadaRegistro'>
        <div className='center divregistro' >
            <h1 style={{color: 'white'}}>Registrarse</h1><br /><br />
            <form onSubmit={handleSubmit}>

                <label htmlFor="" style={{marginTop: '0px', float: 'left', color: 'rgb(200,200,200)'}}>Nombre</label>
                <input type="text" name='nombre' id="nombre" onChange={e => setNombre(e.target.value)} placeholder='Ingrese su nombre' className='form-control' style={{}} /><br />

                <label htmlFor="" style={{marginTop: '0px', float: 'left', color: 'rgb(200,200,200)'}}>Apellido</label>
                <input type="text" name='apellido' id="apellido" onChange={e => setApellido(e.target.value)} placeholder='Ingrese su apellido' className='form-control' /> <br />

                <label htmlFor="" style={{marginTop: '0px', float: 'left', color: 'rgb(200,200,200)'}}>Correo</label>
                <input type="text" name='email' id="email" onChange={e => setEmail(e.target.value)} placeholder='Ingrese su correo (user@example.com)' className='form-control' /> <br />

                <label htmlFor="" style={{marginTop: '0px', float: 'left', color: 'rgb(200,200,200)'}}>Contraseña</label>
                <input type="password" name='pass' id="pass" onChange={e => setPass(e.target.value)} placeholder='Ingrese su contraseña' className='form-control' />
                <label htmlFor="" style={{fontSize: '11px', marginTop: '0px', float: 'left', color: 'rgb(150,150,150)'}}>La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter alfanumérico.</label> <br />
                
                
                <input type="submit" className='btn-verde' value="Registrarse" />

           </form>
       </div>
    </div>
  )
}
