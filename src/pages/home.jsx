import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
  
const Home = () => {

  useEffect(()=>{
    //if(sessionStorage.getItem('f5') == 'recargar'){location.reload(); sessionStorage.removeItem('f5')}

    document.getElementById('user').innerHTML = sessionStorage.getItem('username');

   }, [])
  
  return (
    
    <div className='portadaHome'>
      <h1 style={{marginTop: '100px', color: 'white'}}>Bienvenido a PencaNet</h1>
      <h1 id="user" style={{marginTop: '20px', color: 'white'}}></h1>

    </div>
  )
  
  
}


export default Home