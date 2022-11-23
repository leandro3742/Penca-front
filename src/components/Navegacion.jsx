import React from 'react'

export const Navegacion = (props) => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light barra fixed-top navbar-dark bg-dark" >
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <label className="navbar-brand" style={{marginLeft: '20px'}} href="#">PencaNet</label>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <a className="nav-link" href="/listaeventos">Torneos</a>
                </li>

                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <a className="nav-link" href="/altapencaempresarial">Pencas Empresariales</a>
                </li>

                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <a className="nav-link" href="/altapencacompartida">Pencas Compartidas</a>
                </li>
                

                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <a className="nav-link" href="/altaevento">Nuevo Evento</a>
                </li>

                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <a className="nav-link" href="/altatorneo">Nuevo Torneo</a>
                </li>

                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <a className="nav-link" href="/verpencas">Ver Pencas</a>
                </li>
               
                </ul>
            
            </div>
            
            </nav>
            
        
        {props.children}
        </>
    )
}
