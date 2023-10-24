import { useState, useEffect } from 'react'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
    ItemJustificaciones,
    ModalAgregar,
    ModalAlert,
} from '../../../components/justificaciones'
import { Alert, Box, Modal, Pagination, Snackbar } from '@mui/material'
import { FechData } from '../../../components/justificaciones/helpers/FechData'

export const AñadirJustificacion = () => {
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState(null)
    const [cards, setCards] = useState([])
    // estas dos estados es para manejar las modales
    const [modal, setModal] = useState(false)
    const [modalAlert, setModalAlert] = useState(false)
    const [modalAgregar, setModalAgregar] = useState(false)

    const [buscador_tipoJustificacion, setbuscador_tipoJustificacion] =
        useState('')
    const [buscadorStatus, setBuscadorStatus] = useState('')
    const [buscadorFecha, setBuscadorFecha] = useState('')

    // Para Toas Alert Success
    const [toasSuccess, setToasSuccess] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setToasSuccess(false)
    }
    const [mensajeAlerta, setMensajeAlerta] = useState('Exitoso!')

    const onShowTerminos = () => {
        setModal(true)
        setModalAlert(true)
    }

    const handleBuscar = (page) => {
        FechData({ page })
            .then((e) => {
                setCards(e.data)
                setCountPage(e.total)
                // console.log(e)
            })
            .catch((e) => setCards(e))
    }

    const limpiar = () => {
        setbuscador_tipoJustificacion('')
        setBuscadorStatus('')
        setBuscadorFecha('')
        setPage(1)
    }

    useEffect(() => {
        handleBuscar(page)
    }, [page])

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={toasSuccess}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity='success'
                    sx={{ width: '100%' }}>
                    {mensajeAlerta}
                </Alert>
            </Snackbar>
            <Modal
                open={modal}
                onClose={() => {
                    setModal(!modalAlert)
                }}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box>
                    {modalAlert && (
                        <ModalAlert mostrarModalAgregar={setModalAgregar} />
                    )}
                    {modalAgregar && (
                        <ModalAgregar
                            cancelarModalAlert={setModal}
                            setToasSuccess={setToasSuccess}
                            handleBuscar={handleBuscar}
                            setMensajeAlerta={setMensajeAlerta}
                        />
                    )}
                </Box>
            </Modal>

            <div className='min-h-screen px-8'>
                <p className='ml-1 text-base mb-3 font-medium md:ml-2 uppercase text-white hover:text-white'>
                    Añadir justificacion
                </p>
                <div className='space-y-5'>
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
                        <div className='flex flex-col w-full md:w-auto gap-2 md:flex-row md:gap-5'>
                            <div className=''>
                                <button
                                    className='w-full text-black outline-none px-8 py-1 font-semibold text-center bg-cv-cyan rounded-md active:scale-95 ease-in-out duration-300 uppercase'
                                    onClick={limpiar}>
                                    <CleaningServicesIcon />
                                </button>
                            </div>
                            <div className=''>
                                <button
                                    className='w-full text-black outline-none px-6 py-1 font-semibold text-center bg-cv-cyan rounded-md active:scale-95 ease-in-out duration-300 uppercase'
                                    onClick={onShowTerminos}>
                                    <NoteAddIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    <ItemJustificaciones
                        cards={cards}
                        page={page}
                        buscador_tipoJustificacion={buscador_tipoJustificacion}
                        buscadorStatus={buscadorStatus}
                        buscadorFecha={buscadorFecha}
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
                </div>
            </div>
        </>
    )
}
