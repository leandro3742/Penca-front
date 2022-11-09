import React from 'react'

const Login = () => {
  return (
    <div className='backgroundImg' style={{width:'100%'}}>
        <div className='center login' style={{width: '60%'}}>
        <h1 style={{color: 'white'}}>Iniciar Sesión</h1><br /><br />

            <input type="text" name='username' id="username" placeholder='Ingrese su correo' className='form-control' style={{}} /><br /><br />
            <input type="text" name='pass' id="pass" placeholder='Ingrese su contraseña' className='form-control' />
            <input type="submit" className='btn-login' value="Login" />

           
       </div>
    </div>
  )
  
}

export default Login