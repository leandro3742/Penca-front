import React from 'react'

export const AltaPenca = () => {
  return (
    <div className="grid-container-element eventos">
            <div className='portadaEvento'>


            <a href="/home"><button className='btn-back' style={{fontSize: '20px', float: 'left', cursor:'pointer'}} >🡄 Back</button></a>

            </div>
            <div>

                <form onSubmit={handleSubmit}>

                    <div className='contenedor1 center'>
                        <h1 style={{ color: 'rgb(200,200,200)' }}>Nuevo Evento</h1>
                        <label htmlFor="" style={{ marginTop: '45px', float: 'left', color: 'rgb(200,200,200)' }}>Equipo Local</label>
                        <input type="text" required="required" id="el" className='form-control' onChange={e => setEquipoLocal(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Equipo Visitante</label>
                        <input type="text" required="required" className='form-control' onChange={e => setEquipoVisitante(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Fecha y Hora</label>
                        <input type="datetime-local" required="required" className='form-control' onChange={e => setFechaHora(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }} />

                        <label htmlFor="" style={{ marginTop: '30px', float: 'left', color: 'rgb(200,200,200)' }}>Torneo</label>
                        <select type="text" id="torneos" required="required" name="torneos" className='form-control' onChange={e => setTorneo(e.target.value)} style={{ background: 'none', color: 'rgb(200,200,200)' }}>
                              <option value="">Seleccione un torneo</option>

                        </select>

                            
                        <input type="submit" value="Crear Evento" style={{ marginTop: '65px' }} className='btn-confirmar' />
                    
                    </div>
                    </form>

            </div>
            
        </div>
  )
}


