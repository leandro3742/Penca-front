import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

        async function unlog(e){
            Swal.fire({
                position: 'top',
                background: 'rgb(40,40,40)',
                color: 'rgb(200,200,200)',
                confirmButtonText: 'Login',
                confirmButtonColor: 'rgb(40,80,40)'
                
            }).then((result) => {
                if (result.isConfirmed) {
                

                window.location.href = '/login';


                }
            })
        }



    async function opciones(e){
        Swal.fire({
            position: 'top',
            background: 'rgb(40,40,40)',
            color: 'rgb(200,200,200)',
            html: "<a style='text-decoration: none; color: white; font-weight: bold' href='/suscripcion'>Crear Penca </a> <br> <br> <a style='text-decoration: none; color: white; font-weight: bold' href='/verpencas'>Explorar Pencas </a> <br> <br> <a style='text-decoration: none; color: white; font-weight: bold' href='/mispencas'>Mis Pencas </a> <br> <br><a style='text-decoration: none; color: white; font-weight: bold' href='/participacionpenca'>Mis Participaciones </a> <br> <br>",
            confirmButtonText: 'Logout',
            confirmButtonColor: 'rgb(40,40,40)'
            
          }).then((result) => {
            if (result.isConfirmed) {
             
    
              logout();
    
    
            }
          })
       }


       async function opcionesAdmin(e){
        Swal.fire({
            position: 'top',
            background: 'rgb(40,40,40)',
            color: 'rgb(200,200,200)',
            html: "<a style='text-decoration: none; color: white; font-weight: bold' href='/listaeventos'>Resultados</a> <br> <br> <a style='text-decoration: none; color: white; font-weight: bold' href='/altapencacompartida'>Nueva Penca </a> <br> <br> <a style='text-decoration: none; color: white; font-weight: bold' href='/altaevento'>Nuevo Evento </a> <br> <br><a style='text-decoration: none; color: white; font-weight: bold' href='/altatorneo'>Nuevo Torneo </a> <br> <br><a style='text-decoration: none; color: white; font-weight: bold' href='/pencascompartidas'>Ver Pencas </a> <br> <br><a style='text-decoration: none; color: white; font-weight: bold' href='/usuarios'>Usuarios </a> <br><br> <br>",
            confirmButtonText: 'Logout',
            confirmButtonColor: 'rgb(110,40,40)'
            
          }).then((result) => {
            if (result.isConfirmed) {
             
    
              logout();
    
    
            }
          })
       }
    



   async function logout(){
    
    Swal.fire({
        background: 'rgb(40,40,40)',
        color: 'rgb(200,200,200)',
        title: 'Seguro que desea cerrar sesión?',
        text: "Por favor confirma",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(103, 184, 209)',
        cancelButtonColor: 'rgb(70,0,0)',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Cerrar Sesión'
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('token');

          window.location.href = "/";
          localStorage.removeItem('ad');


        }
      })
   }

   async function getRoles(username){
    let aux = 'false';
    let response;
    await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Auth/ObtenerRoles?username=`+ username).then(async res => response = await res.json());
    //response = await response.json();

    for(let i = 0; i<response.length; i++){
        if(response[i] == 'ADMIN'){
            aux = 'true';
        }
    }
    return aux;
    //alert('dentro de funcion ' + adm);
   }


export const Navegacion = (props) => {
    const [rol,setRol] = useState();
    async function funcion(){
        let response = await getRoles(sessionStorage.getItem('username'));
        setRol(response);
    }



    useEffect(()=>{
        //getRoles('facundo@bunker360.com');
        //getRoles('facu_camilo@hotmail.com');

        funcion();
        //console.log(a);


       // alert('dentro de useeffect ' + adm);


      
       }, [])
      
    
    //var roles = getRoles('facu_camilo@hotmail.com');//sessionStorage.getItem('username'));
    //console.log(getRoles('facu_camilo@hotmail.com'));


    

    //alert(localStorage.getItem('ad'));


    //localStorage.removeItem('ad');

    //getRoles('facundo@bunker360.com');

    //if(admin = 1){alert('esadmin');}else{alert('noesadmin');}

    var sesion = sessionStorage.getItem('username');

    if(sesion != null && sesion != ""){

        if(rol == 'true'){
            
            //localStorage.removeItem('ad');

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light barra fixed-top navbar-dark bg-dark" >
            <button onClick={e => opcionesAdmin(e.target.value)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a href="/" style={{cursor: 'pointer'}}><label className="navbar-brand" style={{marginLeft: '20px',cursor: 'pointer'}} href="">PencaNet</label></a>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <a className="nav-link" href="/listaeventos">Torneos</a>
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
                    <a className="nav-link" href="/pencascompartidas">Ver Pencas</a>
                </li>

                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <a className="nav-link" href="/usuarios">Usuarios</a>
                </li>

                <li style={{marginLeft: '30px'}} className="nav-item active">
                    <button onClick={e => logout(e.target.value)} className='btn-logout'>Cerrar Sesión ⇥</button>
                </li>
               
               
                </ul>
            
            </div>

          
            </nav>
            
        
        {props.children}
        </>
    )

    }else{

        

        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light barra fixed-top navbar-dark bg-dark" >
           <button onClick={e => opciones(e.target.value)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <a href="/" style={{cursor: 'pointer'}}><label className="navbar-brand" style={{marginLeft: '20px',cursor: 'pointer'}} href="">PencaNet</label></a>
    
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                       
                    <li style={{marginLeft: '30px'}} className="nav-item active">
                        <a className="nav-link" href="/suscripcion">Crear Penca</a>
                    </li>
        
                    <li style={{marginLeft: '30px'}} className="nav-item active">
                        <a className="nav-link" href="/verpencas">Explorar Pencas</a>
                    </li>

                    <li style={{marginLeft: '30px'}} className="nav-item active">
                        <a className="nav-link" href="/mispencas">Mis Pencas</a>
                    </li>

                    <li style={{marginLeft: '30px'}} className="nav-item active">
                        <a className="nav-link" href="/participacionpenca">Mis Participaciones</a>
                    </li>
    
                    <li style={{marginLeft: '30px'}} className="nav-item active">
                        <button onClick={e => logout(e.target.value)} className='btn-logout'>Cerrar Sesión ⇥</button>
                    </li>
                   
                   
                    </ul>
                
                </div>
    
              
                </nav>
                
            
            {props.children}
            </>
        )

    }
    }else{

        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light barra fixed-top navbar-dark bg-dark" >
                <button onClick={e => unlog(e.target.value)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a href="/" style={{cursor: 'pointer'}}><label className="navbar-brand" style={{marginLeft: '20px',cursor: 'pointer'}} href="">PencaNet</label></a>
    
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarTogglerDemo03">
                    <ul className="navbar-nav ml-auto">
                    
                    <li style={{marginLeft: '30px'}} className="nav-item active">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                   
                    </ul>
                
                </div>
                
                </nav>
                
            
            {props.children}
            </>
        )

    }

}
