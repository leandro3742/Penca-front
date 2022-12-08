import React, { useEffect, useState } from 'react'

const getStats = async() => {
    let response;
    await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}estadisticas`).then(async res => response = await res.json())
    return response
}
const getMongo = async () => {
    let response;
    await  fetch(`${import.meta.env.VITE_BACKEND_SERVICE}Mongo?day=`+7+"&month="+12+"&year=2022").then(async res => response = await res.json())
    return response
}
const Estadisticas = () => {
    const [data, setData] = useState({})
    const [mongo, setMongo] = useState([])
    const getData = async() => {      
        let a = await getStats();
        let b = await getMongo();
        setMongo(b)
        setData(a)
    }
    useEffect(() => {
        getData()
    }, []);

    return (
        <div className='portadaRegistro' style={{width:'100%'}}>
        {Object.keys(data).length > 0 &&
            <div className='center login1' style={{paddingBottom: '20px'}}>
                <h5 className='text-white'>Cantidad de pencas Empresariales: {data.empresariales ? data.empresariales.length : 0}</h5>
                <h5 className='text-white'>Cantidad de pencas Compartidas: {data.compartidas ? data.compartidas.length : 0}</h5>
                <h5 className='text-white'>Cantidad de usuarios logeados hoy: {mongo.length}</h5>
            </div>
        }
        </div>
    )
}

export default Estadisticas