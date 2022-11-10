import React from 'react'

export const Registro = () => {
  return (
    <div className='portadaRegistro'>
        <div className='center divregistro' >
            <h1 style={{color: 'white'}}>Registrarse</h1><br /><br />
                <label htmlFor="" style={{marginTop: '0px', float: 'left', color: 'rgb(200,200,200)'}}>Nombre</label>
                <input type="text" name='username' id="username" placeholder='Ingrese su nombre' className='form-control' style={{}} /><br />

                <label htmlFor="" style={{marginTop: '0px', float: 'left', color: 'rgb(200,200,200)'}}>Apellido</label>
                <input type="text" name='pass' id="pass" placeholder='Ingrese su apellido' className='form-control' /> <br />

                <label htmlFor="" style={{marginTop: '0px', float: 'left', color: 'rgb(200,200,200)'}}>Correo</label>
                <input type="text" name='pass' id="pass" placeholder='Ingrese su correo' className='form-control' /> <br />

                <label htmlFor="" style={{marginTop: '0px', float: 'left', color: 'rgb(200,200,200)'}}>Contraseña</label>
                <input type="password" name='pass' id="pass" placeholder='Ingrese su contraseña' className='form-control' /> <br />
                <input type="submit" className='btn-verde' value="Registrarse" />

           
       </div>
    </div>
  )
}
