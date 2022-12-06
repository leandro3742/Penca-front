import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const addUser = async(credentials) => {
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
  }
  let response;
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}agregarUsuario`, settings).then(async res => response = await res.json())
  return response
}

const existUser = async(credentials) => {
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
  }
	let response;
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/ExisteUsuario`, settings).then(async res => response = await res.json())
  return response
}

const Confirmar = () => {
	const { id, email } = useParams()

	const addUserToPenca = async() => {
		let aux = email.replaceAll('k4as212fvlkh621ddf4679342fcwe42', 'a');
		aux = aux.replaceAll('123456789', '@');
		aux = aux.replaceAll('punto', '.');
		
		let exist = await existUser(aux);
		console.log(exist)
		if(exist.statusMessage === 'Existe'){
			let response = await addUser({id_Penca: id, username: aux, esCompartida: false}) 
			console.log(response)
			alert(response.statusMessage)
		}
		else{
			alert("No se encuentra el codigo disponible")
		}
	}
	useEffect(() => {
		addUserToPenca()
	}, []);
 
	return (
    <div className='bg-dark portadaRegistro' style={{width:'100%'}}>
			
    </div>
  )
}

export default Confirmar