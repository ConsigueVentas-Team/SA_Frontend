import { useEffect, useState } from 'react'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import {
    CardList,
    // Circular,
    SearchBar,
} from '../../../components/justificaciones'
import { Pagination } from '@mui/material'
import { FechDataJustificaciones } from '../../../components/justificaciones/helpers/FechDataJustificaciones'

export const Justificaciones = () => {
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState(null)
    const [cards, setCards] = useState([])
    const [name, setName] = useState('')
    const [buscador_tipoJustificacion, setbuscador_tipoJustificacion] =
        useState('')
    const [buscadorStatus, setBuscadorStatus] = useState('')
    const [buscadorFecha, setBuscadorFecha] = useState('')

    const limpiar = () => {
        setPage(1)
        setName('')
        setbuscador_tipoJustificacion('')
        setBuscadorStatus('')
        setBuscadorFecha('')
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleBuscar = (page) => {
        FechDataJustificaciones({ page })
            .then((e) => {
                setCards(e.data)
                setCountPage(e.total)
                // console.log(e.total)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        handleBuscar(page)
    }, [page])

    return (
        <>
            {/* <div className='grid grid-cols-2'> */}
            {/* <Circular /> */}
            {/* </div> */}
            <div className='min-h-screen px-8'>
                <p className='ml-1 text-base mb-3 font-medium md:ml-2 uppercase text-white hover:text-white'>
                    justificacion
                </p>

                <div className='space-y-5'>
                    <SearchBar value={name} onChange={handleNameChange} />

                    <div className='w-full flex flex-col md:flex-row items-center justify-between gap-5'>
                        {/* Buscador por tipo de justificación: falta o tardanza */}
                        <div className='w-full text-white'>
                            <select
                                className='px-3 py-1 rounded-md outline-none bg-cv-secondary border border-cv-primary w-full'
                                value={buscador_tipoJustificacion}
                                onChange={(e) =>
                                    setbuscador_tipoJustificacion(
                                        e.target.value
                                    )
                                }>
                                <option value=''>Tipo de justificación</option>
                                <option value='0'>Falta</option>
                                <option value='1'>Tardanza</option>
                            </select>
                        </div>
                        {/* Buscador por tipo de status: en proceso, aceptado o rechazado */}
                        <div className='w-full text-white'>
                            <select
                                className='px-3 py-1 rounded-md outline-none bg-cv-secondary border border-cv-primary w-full'
                                value={buscadorStatus}
                                onChange={(e) =>
                                    setBuscadorStatus(e.target.value)
                                }>
                                <option value=''>Estado</option>
                                <option value='1'>Aceptado</option>
                                <option value='2'>Rechazado</option>
                                <option value='3'>En proceso</option>
                            </select>
                        </div>
                        <div className='w-full text-white'>
                            <input
                                className='px-3 py-1 rounded-md outline-none bg-cv-secondary border border-cv-primary w-full'
                                type='date'
                                id='fecha'
                                value={buscadorFecha}
                                onChange={(e) =>
                                    setBuscadorFecha(e.target.value)
                                }
                            />
                        </div>
                        <div className=''>
                            <button
                                className='w-full text-cv-primary outline-none px-8 py-1 font-semibold text-center bg-cv-cyan rounded-md active:scale-95 ease-in-out duration-300 uppercase'
                                onClick={limpiar}>
                                <CleaningServicesIcon />
                            </button>
                        </div>
                    </div>
                </div>

                <>
                    <CardList
                        cards={cards}
                        page={page}
                        buscador_tipoJustificacion={buscador_tipoJustificacion}
                        buscadorStatus={buscadorStatus}
                        buscadorFecha={buscadorFecha}
                        searchName={name}
                    />
                    <Pagination
                        className='flex justify-center'
                        count={Math.ceil(countPage / 6)}
                        page={page}
                        onChange={(event, value) => {
                            setPage(value)
                            handleBuscar(value)
                        }}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: '#57F3FF', // Cambia '#colorDeseado' por el color que quieras.
                            },
                        }}
                    />
                </>
            </div>
        </>
    )
}
