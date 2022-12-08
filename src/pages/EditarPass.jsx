import React, { useState } from 'react'
import Swal from 'sweetalert2';

const fetchLogin = async (user, pass, newPass) => {
    const settings = {
      method: 'POST',
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email: user,
        pass: pass,
        newPass: newPass
      })      
    }
    let response
    await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/EditarPass`, settings)
    .then(
      async res => {    
        response = await res.json()
      }
    )
    if(response.statusMessage != 'Ok'){
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
      sessionStorage.setItem('username', user);
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('f5', 'recargar');
  
  
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        text: 'Bienvenido '+user,
        icon: 'success',
        confirmButtonColor: 'rgb(103, 184, 209)',
        confirmButtonText: 'Ok'
      })
    }
  }
}
  
const EditarPass = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    return (
    <div className='portadaRegistro' style={{width:'100%'}}>
        <div className='center login1' style={{paddingBottom: '20px'}}>
            <h1 style={{color: 'white'}}>Recuperar Password</h1><br /><br />
            <input id="username" type="text" onChange={(e)=>setUserName(e.target.value)} placeholder='Ingrese su correo' className='form-control' style={{}} /><br /><br />
            <input id="pass" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Ingrese su contraseña' className='form-control' /><br /><br />
            <input id="nuevaPass" type="password" onChange={(e)=>setNewPassword(e.target.value)} placeholder='Ingrese nueva contraseña' className='form-control' />            
            <div className='' style={{display: 'inline-block'}}>
              <button className='btn-verde' style={{marginTop: '60px'}} onClick={()=> fetchLogin(userName, password, newPassword)}>Recuperar</button>
            </div>
       </div>
    </div>
  )
}

export default EditarPass