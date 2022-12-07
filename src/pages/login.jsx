import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2';
import LoginGithub from 'react-login-github';



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
    sessionStorage.setItem('username', response.email);
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('f5', 'recargar');


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


const onSuccess = async response => {
  let resp = await response.code
  let aux;
  console.log(resp)
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/LoginSocial`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(resp)
  }).then(async res => aux = await res.json()).catch(err => console.error(err))
  if(aux.email){
    window.location.href = "/";
    sessionStorage.setItem('username', response.email);
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('f5', 'recargar');
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      text: 'Bienvenido '+aux.email,
      icon: 'success',
      confirmButtonColor: 'rgb(103, 184, 209)',
      confirmButtonText: 'Ok'
    })
  }
  else{
    Swal.fire({
      background: 'rgb(40,40,40)',
      color: 'rgb(200,200,200)',
      text: 'No pudimos verificar tus datos',
      icon: 'error',
      confirmButtonColor: 'rgb(103, 184, 209)',
      confirmButtonText: 'Ok'
    })
  }
};


const onFailure = response => console.error(response);





const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className='portadaRegistro' style={{width:'100%'}}>
        <div className='center login1' style={{paddingBottom: '20px'}}>
        <h1 style={{color: 'white'}}>Iniciar Sesión</h1><br /><br />

            <input id="username" type="text" onChange={(e)=>setUserName(e.target.value)} placeholder='Ingrese su correo' className='form-control' style={{}} /><br /><br />
            <input id="pass" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Ingrese su contraseña' className='form-control' />
            <div className='' style={{display: 'inline-block'}}>
              <button className='btn-verde' style={{marginTop: '60px'}} onClick={()=> fetchLogin(userName, password)}>Login</button><br />
             
            </div>

            <div className='' style={{display: 'inline-block'}}>
            <LoginGithub className='btn-github' clientId="436f3043b58384f9aacc" scope={'user'} onSuccess={onSuccess} onFailure={onFailure} />
             
            </div>
            <br /><br />

           




            
              <a href="/registro" className='labelregistro'>Todavía no tienes una cuenta? Click aquí para registrarte!</a>
       </div>
    </div>
  )
  
}

export default Login