import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { AES, enc } from 'crypto-js'

export const ModalRechazado = ({
    setShowModalRechazado,
    itemData,
    setToasSuccess,
}) => {
    const [messages, setMessage] = useState('')
    const [reason_decline, setReason_decline] = useState('')

    const onCloseModalRechazo = () => {
        setShowModalRechazado((e) => !e)
    }

    const onClickRechazar = (id) => {
        const tokenD = AES.decrypt(
            localStorage.getItem('token'),
            import.meta.env.VITE_TOKEN_KEY
        )
        const token = tokenD.toString(enc.Utf8)

        if (!reason_decline) {
            setMessage('Por favor, proporciona un motivo de rechazo')
            return
        }

        fetch(import.meta.env.VITE_API_URL + `/justification/decline/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason_decline }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message)
                    })
                }
                return response.json()
            })
            .then(() => {
                setToasSuccess((e) => !e)
                onCloseModalRechazo()
                window.location.replace('')
            })
            .catch((error) => {
                setMessage(error.message)
            })

        // navigate(`/justificaciones`)
    }

    return (
        <>
            <div className='fixed inset-0 bg-black opacity-50'></div>
            <div className='fixed inset-0 flex items-center justify-center z-10'>
                <div className='relative max-w-2xl max-h-full'>
                    <div className='relative bg-white rounded-lg shadow'>
                        <div className='flex flex-col items-center justify-center p-4 border-b rounded-t'>
                            <h1 className='uppercase text-black text-center font-semibold text-xl'>
                                Rechazando la justificación
                            </h1>
                        </div>
                        <div className='w-full p-6 space-y-4'>
                            <div className='flex items-center justify-center'>
                                <ReportProblemIcon
                                    sx={{ color: '#F3AE37', fontSize: 50 }}
                                />
                            </div>
                            {messages && (
                                <p className='text-red-500'>{messages}</p>
                            )}
                            <p className='text-cv-primary text-base font-semibold'>
                                Motivo
                            </p>
                            <textarea
                                value={reason_decline}
                                onChange={(e) =>
                                    setReason_decline(e.target.value)
                                }
                                className='bg-gray-300 outline-none border-cv-primary text-cv-primary p-2 rounded-md w-full placeholder:text-gray-400 placeholder:text-sm'
                                placeholder='Describa el motivo del RECHAZO de la justificación'></textarea>
                        </div>
                        <div className='flex items-center justify-evenly p-4 border-t border-gray-200 rounded-b'>
                            <button
                                onClick={onCloseModalRechazo}
                                className='uppercase border-2 border-cv-primary hover:bg-cv-primary hover:text-white font-medium rounded-lg text-black text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'>
                                Cancelar
                            </button>
                            <button
                                onClick={() =>
                                    onClickRechazar(
                                        itemData.id
                                        // itemData.user_id
                                    )
                                }
                                className='text-white uppercase border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'>
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ModalRechazado.propTypes = {
    setShowModalRechazado: PropTypes.func,
    itemData: PropTypes.object.isRequired,
    setToasSuccess: PropTypes.func,
}
