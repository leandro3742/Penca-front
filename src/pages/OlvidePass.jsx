import React, {useState} from 'react'
import Swal from 'sweetalert2'
const fetchLogin = async (user) => {
    let response
    await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/OlvidoPass?username=`+user)
    .then(
      async res => {    
        response = await res.json()
        console.log(response)
    }
    )
    
    if(response.statusMessage != 'Se envio su nueva password a su email'){
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
     
      Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        text: "Se envio su nueva password a su emai",
        icon: 'success',
        confirmButtonColor: 'rgb(103, 184, 209)',
        confirmButtonText: 'Ok'
      })
  }
}
const OlvidePass = () => {
    const [userName, setUserName] = useState("")
    return (
    <div className='portadaRegistro' style={{width:'100%'}}>
        <div className='center login1' style={{paddingBottom: '20px'}}>
            <h1 style={{color: 'white'}}>Recuperar Password</h1><br /><br />
            <input id="username" type="text" onChange={(e)=>setUserName(e.target.value)} placeholder='Ingrese su correo' className='form-control' style={{}} /><br /><br />
            <div className='' style={{display: 'inline-block'}}>
              <button className='btn-verde' style={{marginTop: '60px'}} onClick={()=> fetchLogin(userName)}>Recuperar</button>
            </div>
       </div>
    </div>
    )
}

export default OlvidePass