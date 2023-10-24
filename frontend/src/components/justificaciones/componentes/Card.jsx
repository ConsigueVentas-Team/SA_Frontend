import moment from 'moment'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export const Card = ({ card, page }) => {
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

    const bandera = true

    const mostrarDetalles = (id) => {
        navigate(`/details/${id}`, {
            // modifique bandera a true para que se muestre el boton de regresar
            state: { page, bandera },
        })
    }

    return (
        <div className='bg-cv-primary text-white rounded-2xl shadow-2xl'>
            <div className='w-full flex flex-col items-center justify-between p-4 overflow-hidden'>
                <div className='w-full flex items-center justify-between'>
                    <div className='border-2 border-cv-cyan w-14 h-14 bg-gray-100 rounded-full overflow-hidden'>
                        <img
                            src={card.user.image_url}
                            alt='Foto de Perfil'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='text-white font-semibold'>
                        <h2>{card.user.name}</h2>
                        <h2>{card.user.surname}</h2>
                    </div>
                </div>
                <div className='w-full flex mt-4 space-x-3 md:mt-6 text-white'>
                    <ul className='w-full space-y-0.5'>
                        <li className='text-sm font-normal flex items-center '>
                            <p>
                                <span className='mr-2 uppercase text-gray-400 font-semibold mb-1'>
                                    Turno:
                                </span>
                                <span>{card.user.shift}</span>
                            </p>
                        </li>
                        <li className='text-sm font-normal flex items-center'>
                            <label className='mr-2 text-gray-400 uppercase font-semibold mb-1'>
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
                        <li className='text-sm font-normal flex items-center '>
                            <p>
                                <span className='mr-2 uppercase text-gray-400 font-semibold mb-1'>
                                    Estado:
                                </span>
                                <span>
                                    {isRechazadoOrAceptado(card)}
                                    {/* {isRechazadoOrAceptado(card) ===
                                        'Aceptado' ||
                                    isRechazadoOrAceptado(card) ===
                                        'Rechazado' ? (
                                        <span>
                                            {' '}
                                            por {card.action_by_user.name}
                                        </span>
                                    ) : null} */}
                                </span>
                            </p>
                        </li>
                        <li className='text-sm font-normal flex items-center '>
                            <p>
                                <span className='mr-2 text-gray-400 uppercase font-semibold mb-1'>
                                    {' '}
                                    Tipo:{' '}
                                </span>{' '}
                                {card.type === 0 ? 'Falta' : 'Tardanza'}
                            </p>
                        </li>
                        <li className='w-full text-sm font-normal'>
                            <span className='mr-2 uppercase text-gray-400 font-semibold mb-1'>
                                Motivo:
                            </span>
                            <div className='whitespace-normal'>
                                <textarea
                                    className='bg-transparent text-sm align-top w-full h-auto resize-none overflow-hidden'
                                    disabled
                                    maxLength={87} // Cambia el número 100 por el límite de caracteres que desees
                                    value={card.reason.length > 87 ? `${card.reason.substring(0, 87)} ...` : card.reason}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='text-sm font-medium text-cv-primary'>
                <button
                    className={`block w-full p-2 text-xl text-center uppercase rounded-b-lg ${
                        isRechazadoOrAceptado(card) === 'En proceso'
                            ? 'bg-yellow-500'
                            : 'bg-cv-cyan'
                    }`}
                    onClick={() => {
                        mostrarDetalles(card.id)
                    }}>
                    Revisar
                </button>
            </div>
        </div>
    )
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
}

Card.defaultProps = {
    card: {},
}
