import React, { useEffect, useState } from 'react'

const getStats = async() => {
    let response;
    await fetch(`${import.meta.env.VITE_BACKEND_SERVICE}estadisticas`).then(async res => response = await res.json())
    return response
}

const Estadisticas = () => {
    const [data, setData] = useState({})
    const getData = async() => {      
        let a = await getStats();
        console.log(a)
        setData(a)
    }
    useEffect(() => {
        getData()
    }, []);

    return (
        <div className='portadaRegistro' style={{width:'100%'}}>
        {Object.keys(data).length > 0 &&
            <div className='center login1' style={{paddingBottom: '20px'}}>
                <h5 className='text-white'>Cantidad de pencas Empresariales: {data.empresariales.length + 1}</h5>
                <h5 className='text-white'>Cantidad de pencas Compartidas: {data.compartidas.length + 1}</h5>
            </div>
        }
        </div>
    )
}

export default Estadisticas