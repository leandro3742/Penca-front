import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2';


const fetchLogin = async (user, pass) => {
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
      username: user,
      password: pass
    })      
  }
  let response
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/Login`, settings)
  .then(
    async res => {
      if(res.status !== 401)
      response = await res.json()
      else response = 'Error'
    }
  )
  if(response === 'Error'){
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      text: 'Usuario y/o contraseña incorrectos',
      icon: 'error',
      confirmButtonColor: 'rgb(103, 184, 209)',
      confirmButtonText: 'Ok'
    })
  }
  else{
    if(document.getElementById('username').value != "" && document.getElementById('pass').value != ""){
    window.location.href = "/";
    sessionStorage.setItem('username', response.email)
    sessionStorage.setItem('token', response.token)

    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      text: 'Bienvenido '+response.email,
      icon: 'success',
      confirmButtonColor: 'rgb(103, 184, 209)',
      confirmButtonText: 'Ok'
    })
  }else{
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      text: 'Complete los campos por favor',
      icon: 'error',
      confirmButtonColor: 'rgb(103, 184, 209)',
      confirmButtonText: 'Ok'
    })
  }
  }
}

const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className='portadaRegistro' style={{width:'100%'}}>
        <div className='center login1' style={{paddingBottom: '20px'}}>
        <h1 style={{color: 'white'}}>Iniciar Sesión</h1><br /><br />

            <input id="username" type="text" onChange={(e)=>setUserName(e.target.value)} placeholder='Ingrese su correo' className='form-control' style={{}} /><br /><br />
            <input id="pass" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Ingrese su contraseña' className='form-control' />
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <button className='btn-verde' style={{marginTop: '60px'}} onClick={()=> fetchLogin(userName, password)}>Login</button><br />
              <a href="/registro" className='labelregistro'>Todavía no tienes una cuenta? Click aquí para registrarte!</a>
            </div>



           
       </div>
    </div>
  )
  
}

export default Login