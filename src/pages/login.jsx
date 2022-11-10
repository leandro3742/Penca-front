import React from 'react'

const Login = () => {
  return (
    <div className='portadaRegistro' style={{width:'100%'}}>
        <div className='center login1' style={{paddingBottom: '20px'}}>
        <h1 style={{color: 'white'}}>Iniciar Sesión</h1><br /><br />

            <input type="text" name='username' id="username" placeholder='Ingrese su correo' className='form-control' style={{}} /><br /><br />
            <input type="text" name='pass' id="pass" placeholder='Ingrese su contraseña' className='form-control' />

            <input type="submit" className='btn-verde' style={{marginTop: '60px'}} value="Login" /> <br /> <br /> <br />

            <a href="/registro" className='labelregistro'>Todavía no tienes una cuenta? Click aquí para registrarte!</a>


           
       </div>
    </div>
  )
  
}

export default Login