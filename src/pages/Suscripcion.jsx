import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PaypalCheckoutButton from '../components/PaypalCheckoutButton';

const completeTask = () => {
  Swal.fire({
    background: 'rgb(40,40,40)',
    color: 'rgb(200,200,200)',
    title: 'Se creo correctamente!',
    icon: 'success',
    confirmButtonColor: 'rgb(103, 184, 209)',
  })
}

const fetchTorneos = async() => {
  let response;
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarTorneos`).then(async res => response = await res.json())
  return response
}

const createPenca = async(credentials) => {
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
  }
  let response;
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}agregarEmpresarial`, settings).then(async res => response = await res.json())
  return response
}

const getPencaEmpresarial = async(credentials) => {
  let response;
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}listarEmpresarial`).then(async res => response = await res.json())
  return response
}

const createSuscription = async(credentials) => {
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
  }
  let response;
  await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}agregarSubscripcion`, settings).then(async res => response = await res.json())
  return response
}

const sendEmails = (credentials) => {
  const settings = {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(credentials)
  }
  fetch(`${import.meta.env.VITE_BACKEND_SERVICE}enviarInvitaciones`, settings)
}

export const Suscripcion = () => {
  const [pago, setPago] = useState(0)
  const [estaPago, setEstaPago] = useState(false)
  const Link = "";
  const [nombre, setNombre] = useState();
  const Usuario = sessionStorage.getItem("username");
  const [torneos, setTorneos] = useState([]);
  const [torneoSelected, setTorneoSelected] = useState('')
  const [list, setList] = useState([]);
  const [user, setUser] = useState("");

  const tablePrice = {
    100: 50,
    150: 150,
    220: 500,
    280: 1000,
    590: 5000,
  }

  const getTorneos = async() => {
    let data = await fetchTorneos();
    setTorneos(data)
  }

  useEffect(() => {
    sessionStorage.setItem('suscripcion',pago);
  }, [pago]);
  
  useEffect(() => {
    getTorneos()
  }, []);

  const isOk = (elem) => {
    setEstaPago(true)
    // saveSuscription();
  }
  const deleteUser = (index) => {
    setList(list.filter((elem) => { return index != elem}))
  }
  
  const crearEvento = async() => {
    let email = sessionStorage.getItem('username')
    let response = await createPenca({id:0, link:'string', nombre: nombre, usuario_creador: email, torneo: parseInt(torneoSelected), esCompartida: false})
    if(response.statusOk){
      let pencas = await getPencaEmpresarial()
      let id_penca = pencas[pencas.length - 1].id
      let response2 = await createSuscription({id_PencaEmpresarial: id_penca, rut: 'ff', nroTar_Credito: 'ff', Username_Usuario: email})
      if(response2){
        let aux = email.replaceAll('a', 'k4as212fvlkh621ddf4679342fcwe42')
        aux = aux.replaceAll('@', '123456789')
        aux = aux.replaceAll('.', 'punto')
        sendEmails({emails: list, link:`https://tupenca.netlify.app/confirmar/${id_penca}/${aux}`})
        setEstaPago(false)
        completeTask()
      }
    }
    else(
      alert(response.statusMessage)
    )
  }

  return (
    <div className="grid-container-element eventos">
      <div className='portadaEvento'>
      </div>
      <div>
        <div className='contenedor1 center'>
          {!estaPago &&
          <div>
            <h1 style={{ color: 'rgb(200,200,200)' }}>Subscripción</h1>
            <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Cantidad de participantes</label>
            <select type="text" value={pago} id="precios" required="required" name="torneos" className='form-control' onChange={e => setPago(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)', marginTop: '70px' }}>
              <option value="">Seleccione una opción</option>
              <option value="100">Hasta 50 participantes ($100 Dólares)</option>
              <option value="150">Hasta 150 participantes ($150 Dólares)</option>
              <option value="220">Hasta 500 participantes ($220 Dólares)</option>
              <option value="280">Hasta 1000 participantes ($280 Dólares)</option>
              <option value="590">Hasta 5000 participantes ($590 Dólares)</option>
            </select>

            <h3 id="precio" style={{marginTop: '70px', color:'rgb(200,200,200)'}}>{pago} US$</h3>
            
            {pago && <PaypalCheckoutButton isOk={isOk} product={{id: 'elem.id', descripcion: '' ,tipoSub: "SEMANAL", nombre: 'elem.nombre', precio: pago}}/> }
          </div>
          }

          {estaPago && 
            <form >
              <div className="">
                <h1 style={{ color: "rgb(200,200,200)" }}> Nueva Penca Empresarial </h1>
                <label style={{ marginTop: "45px", float: "left", color: "rgb(200,200,200)", }} > Nombre </label>
                <input type="text" required="required" id="nombre" className="form-control" onChange={(e) => setNombre(e.target.value)} style={{ background: "none", color: "rgb(200,200,200)" }} />

                <label style={{ marginTop: "30px", float: "left", color: "rgb(200,200,200)" }} > Torneo </label>
                <select type="text" id="torneos" required="required" name="torneos" className="form-control" onChange={(e) => setTorneoSelected(e.target.value)} style={{ background: "none", color: "rgb(200,200,200)" }} >
                  <option value="">Seleccione un torneo</option>
                  {torneos.map(elem => {
                    return <option key={elem.id} value={elem.id}>{elem.nombre}</option>
                  })}
                </select>
                
                {list.length < tablePrice[pago] &&
                <div className="d-flex mt-5 align-items-center">
                  <input placeholder="Email de los participantes" className="form-control" value={user} onChange={(e) => setUser(e.target.value)} style={{ background: "none", color: "rgb(200,200,200)" }}/>
                  <div>
                    <button type="button" onClick={()=>{setList([...list, user]); setUser("")}} className="btn btn-sm btn-primary mx-4">Agregar</button>
                  </div>
                </div>
                }
                <div style={{overflowY: 'scroll', height: '150px', marginTop: '25px', border: '1px solid white'}} className='rounded p-1 row'>
                  {list.map((user,index) => {
                    return (
                    <div key={user} className="d-flex col-11">
                      <span className="text-white my-1 mx-3">{user}</span>
                      <div className="p-1">
                        <button type="button" className="btn btn-sm btn-danger" onClick={()=>deleteUser(user)}>X</button>
                      </div>
                    </div>)
                  })}
                </div>
                <h5 className="text-white">{list.length} / {tablePrice[pago]}</h5>
                <button
                  type="button"
                  style={{ marginTop: "65px" }}
                  className="btn-confirmar"
                  onClick={crearEvento}
                >
                Crear evento
                </button>
              </div>
            </form>
          }

          {/* <input type="submit" value="Realizar Pago" onClick={e => confirmarPago(e)} style={{ marginTop: '65px' }} className='btn-confirmar' /> */}
                    
        </div>

      </div>
            
    </div>
  )
}
