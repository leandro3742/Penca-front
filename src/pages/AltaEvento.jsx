import React, { useState } from 'react';


async function NuevoEvento(credentials) {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
            EquipoLocal:credentials.EquipoLocal,
            EquipoVisitante:credentials.EquipoVisitante,
            FechaHora:credentials.FechaHora,
            Torneo:credentials.Torneo
        })
    }
    fetch('http://localhost:8090/Java2022_war_exploded/Prueba/altaContenido', settings);
   
}

export const AltaEvento = () => {
    const [EquipoLocal, setEquipoLocal] = useState();
    const [EquipoVisitante, setEquipoVisitante] = useState();
    const [FechaHora, setFechaHora] = useState();
    const [Torneo, setTorneo] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        NuevoEvento({
            EquipoLocal,
            EquipoVisitante,
            FechaHora,
            Torneo


        })
    }


    return (
        <div className="grid-container-element eventos">
            <div className='portadaEvento'>

            </div>
            <div>
                <form onSubmit={handleSubmit}>

                    <div className='contenedor1 center'>
                        <h1 style={{ color: 'rgb(200,200,200)' }}>Nuevo Evento</h1>
                        <label htmlFor="" style={{ marginTop: '45px', float: 'left', color: 'rgb(200,200,200)' }}>Equipo Local</label>
                        <input type="text" className='form-control' onChange={e => setEquipoLocal(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Equipo Visitante</label>
                        <input type="text" className='form-control' onChange={e => setEquipoVisitante(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Fecha y Hora</label>
                        <input type="datetime-local" className='form-control' onChange={e => setFechaHora(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Torneo</label>
                        <select type="text" className='form-control' onChange={e => setTorneo(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }}>
                            <option value="">Seleccione una opción</option>
                        </select>



                        <input type="submit" value="Crear Evento" style={{ marginTop: '65px' }} className='btn-confirmar' />
                    
                    </div>
                    </form>

            </div>
            
        </div>
    )
}
