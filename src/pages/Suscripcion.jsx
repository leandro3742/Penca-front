import React from 'react';
import Swal from 'sweetalert2';


function setPago(e){
    document.getElementById('precio').textContent = Intl.NumberFormat('es-ES', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(e);
}

function confirmarPago(){
    if(document.getElementById('precios').value == ""){
        Swal.fire({
            background: 'rgb(40,40,40)',
            color: 'rgb(200,200,200)',
            title: 'Error',
            text: "Debes seleccionar una opción de pago",
            icon: 'warning',
            confirmButtonColor: 'rgb(103, 184, 209)',
            confirmButtonText: 'Ok!'
         
    })
}else{
    Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: 'Estás seguro?',
        text: "Deseas confirmar el pago?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(103, 184, 209)',
        cancelButtonColor: 'rgb(70,0,0)',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, confirmar!'
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/altapencaempresarial';
        }
      })
    }    
}

export const Suscripcion = () => {
  return (
    <div className="grid-container-element eventos">
            <div className='portadaEvento'>



            </div>
            <div>


                    <div className='contenedor1 center'>
                        <h1 style={{ color: 'rgb(200,200,200)' }}>Subscripción</h1>
                        
                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Cantidad de participantes</label>
                        <select type="text" id="precios" required="required" name="torneos" className='form-control' onChange={e => setPago(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)', marginTop: '70px' }}>
                              <option value="">Seleccione una opción</option>
                              <option value="100">Hasta 50 participantes ($100 Dólares)</option>
                              <option value="150">Hasta 150 participantes ($150 Dólares)</option>
                              <option value="220">Hasta 500 participantes ($220 Dólares)</option>
                              <option value="280">Hasta 1000 participantes ($280 Dólares)</option>
                              <option value="590">Hasta 5000 participantes ($590 Dólares)</option>
                              <option value="1350">Más de 5000 participantes ($1,350 Dólares)</option>
                        </select>

                        <h3 id="precio" style={{marginTop: '70px', color:'rgb(200,200,200)'}}>0,00 US$</h3>
                            
                        <input type="submit" value="Realizar Pago" onClick={e => confirmarPago(e)} style={{ marginTop: '65px' }} className='btn-confirmar' />
                    
                    </div>

            </div>
            
        </div>
  )
}
