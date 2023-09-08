import CircleIcon from '@mui/icons-material/Circle'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const ItemJustificaciones = ({
    cards,
    buscador_tipoJustificacion,
    buscadorStatus,
    buscadorFechaInicio,
    buscadorFecha,
}) => {
    const navigate = useNavigate()

    const isRechazadoOrAceptado = (prop) => {
        if (prop.status === 2) {
            return 'Rechazado'
        } else if (prop.status === 3) {
            return 'En proceso'
        } else {
            return 'Aceptado'
        }
    }

    const colorIcon = (prop) => {
        if (isRechazadoOrAceptado(prop) === 'Rechazado') {
            return 'red'
        }
        if (isRechazadoOrAceptado(prop) === 'En proceso') {
            return 'yellow'
        }
        if (isRechazadoOrAceptado(prop) === 'Aceptado') {
            return 'green'
        }
    }

    const mostrarDetalles = (id) => {
        navigate(`/details/${id}`)
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-cv-secondary min-w-sm mt-5'>
            {cards
                .filter((post) => {
                    const justificationTypeArray = Array.isArray(post.type)
                        ? post.type
                        : [post.type]
                    if (buscador_tipoJustificacion === '') {
                        // Si no se ha seleccionado ningún tipo de justificación, se muestran todos los cards
                        return true
                    } else {
                        // Filtrar por el tipo de justificación seleccionado
                        return justificationTypeArray.includes(
                            Number(buscador_tipoJustificacion)
                        )
                    }
                })
                .filter((post) => {
                    const justificationTypeArray = Array.isArray(post.status)
                        ? post.status
                        : [post.status]

                    if (buscadorStatus === '') {
                        // Si no se ha seleccionado ningún tipo de justificación, se muestran todos los cards
                        return true
                    } else if (buscadorStatus === '3') {
                        // Filtrar por "En proceso"
                        return justificationTypeArray.includes(3)
                    } else if (buscadorStatus === '1') {
                        // Filtrar por "Aceptado"
                        return justificationTypeArray.includes(1)
                    } else if (buscadorStatus === '2') {
                        // Filtrar por "Rechazado"
                        return justificationTypeArray.includes(2)
                    } else {
                        return false // Valor de búsqueda inválido, no se muestra ningún card
                    }
                })
                .filter((post) => {
                    if (buscadorFechaInicio === '' && buscadorFecha === '') {
                        return true
                    } else if (
                        buscadorFechaInicio !== '' &&
                        buscadorFecha === ''
                    ) {
                        const fechaPost = post.justification_date
                        return fechaPost >= buscadorFechaInicio
                    } else if (
                        buscadorFechaInicio === '' &&
                        buscadorFecha !== ''
                    ) {
                        const fechaPost = post.justification_date
                        const fechaBuscador = buscadorFecha
                        return fechaPost === fechaBuscador
                    } else {
                        const fechaPost = post.justification_date
                        const fechaBuscadorInicio = buscadorFechaInicio
                        const fechaBuscador = buscadorFecha
                        return (
                            fechaPost >= fechaBuscadorInicio &&
                            fechaPost <= fechaBuscador
                        )
                    }
                })
                .map((card, index) => (
                    <div
                        className='bg-cv-primary text-white rounded-2xl shadow-2xl'
                        key={index}>
                        <div className='w-full flex flex-col items-center justify-between p-4 overflow-hidden'>
                            {/* Contenido de la tarjeta */}
                            <div className='flex items-center'>
                                <div className='text-white font-semibold'>
                                    <h1>JUSTIFICACIÓN Nº{card.id}</h1>
                                </div>
                            </div>

                            <div className='w-full flex mt-4 space-x-3 md:mt-6 text-white'>
                                <ul className='w-full space-y-0.5'>
                                    <li className='text-sm font-normal flex items-center'>
                                        <p>
                                            <span className='mr-2 uppercase font-semibold mb-1'>
                                                Estado:{' '}
                                            </span>{' '}
                                            {isRechazadoOrAceptado(card)}
                                        </p>
                                        <div
                                            className=''
                                            style={{
                                                marginLeft: 'auto',
                                            }}>
                                            <CircleIcon
                                                sx={{
                                                    color: colorIcon(card),
                                                }}></CircleIcon>
                                        </div>
                                    </li>
                                    <li className='text-sm font-normal flex items-center'>
                                        <label className='mr-2 uppercase font-semibold mb-1'>
                                            Fecha:{' '}
                                        </label>
                                        <div className='w-1/4'>
                                            <input
                                                className='bg-transparent'
                                                disabled
                                                value={moment(
                                                    card.justification_date
                                                ).format('DD/MM/YYYY')}></input>
                                        </div>
                                    </li>
                                    <li className='text-sm font-normal flex items-center'>
                                        <p>
                                            <span className='mr-2 uppercase font-semibold mb-1'>
                                                {' '}
                                                Tipo:{' '}
                                            </span>{' '}
                                            {card.type === 0
                                                ? 'Falta'
                                                : 'Tardanza'}
                                        </p>
                                    </li>
                                    <li className='w-full text-sm font-normal'>
                                        <span className='mr-2 uppercase font-semibold mb-1'>
                                            Motivo:
                                        </span>
                                        <div className='whitespace-normal'>
                                            <textarea
                                                className='bg-transparent text-sm align-top w-full h-auto resize-none'
                                                disabled
                                                value={card.reason}></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className=' text-sm font-medium text-cv-primary'>
                            <button
                                onClick={() => mostrarDetalles(card.id)}
                                className='block w-full font-semibold p-2 text-md text-center uppercase rounded-b-lg bg-cv-cyan'>
                                Revisar
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

ItemJustificaciones.propTypes = {
    cards: PropTypes.array.isRequired,
    buscador_tipoJustificacion: PropTypes.string.isRequired,
    buscadorStatus: PropTypes.string.isRequired,
    buscadorFechaInicio: PropTypes.string.isRequired,
    buscadorFecha: PropTypes.string.isRequired,
}
