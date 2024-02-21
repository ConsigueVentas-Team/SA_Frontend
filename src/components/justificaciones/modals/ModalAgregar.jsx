import { AES, enc } from 'crypto-js'
import { useState } from 'react'
import PropTypes from 'prop-types'

export const ModalAgregar = ({
    cancelarModalAlert,
    setToasSuccess,
    handleBuscar,
    setMensajeAlerta,
}) => {
    const [messages, setMessage] = useState('')
    const [justification_type, setJustification_type] = useState('')
    const [justification_date, setJustification_date] = useState('')
    const [dateError, setDateError] = useState('')
    const [reason, setReason] = useState('')
    const [evidence, setEvidence] = useState('')

    // const [radioButton, setRadioButton] = useState(false)
    // const [showLabel, setShowLabel] = useState(true)
    const [justification_date_max, setJustification_date_max] = useState('')

    // console.log({ justification_date, justification_date_max })

    const closeJusti = () => {
        setJustification_date('')
        setReason('')
        setEvidence(null)
        setJustification_type('')

        setJustification_date_max('')
    }

    const handleTextChange = e => {
        const textArea = e.target.value
        if (textArea.length <= 255) {
            // Establecer el valor mínimo permitido (por ejemplo, 50 caracteres)
            setReason(textArea)
        }
    }

    // const validarDateMax = () => {
    //     if (radioButton) {

    //     }
    // }

    const handleSubmit = event => {
        event.preventDefault()
        const tokenD = AES.decrypt(
            localStorage.getItem('token'),
            import.meta.env.VITE_TOKEN_KEY
        )
        const token = tokenD.toString(enc.Utf8)
        const formData = new FormData()
        formData.append('justification_date', justification_date)
        formData.append('reason', reason)
        formData.append('evidence', evidence)
        formData.append('justification_type', justification_type)

        if (
            !justification_date ||
            !reason ||
            !evidence ||
            justification_type === null
        ) {
            setMessage('Por favor, complete todos los campos.')
            return
        }

        fetch(import.meta.env.VITE_API_URL + '/justification/create', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message)
                    })
                }
                return response.json()
            })
            // eslint-disable-next-line no-unused-vars
            .then(data => {
                setMensajeAlerta(data.message)
                setToasSuccess(e => !e)
                handleBuscar()
            })
            .catch(error => {
                setMessage(error.message)
            })
            .finally(() => {
                closeJusti()
                cancelarModalAlert(false)
            })
    }

    const handleDateChange = e => {
        const selectedDate = new Date(e.target.value)
        const currentDate = new Date()

        const minDate = new Date()
        minDate.setDate(currentDate.getDate() - 3)

        const maxDate = new Date()
        maxDate.setDate(currentDate.getDate() + 3)

        if (selectedDate >= minDate && selectedDate <= maxDate) {
            if (e.target.name === 'justification_date') {
                setJustification_date(e.target.value)
            } else {
                setJustification_date_max(e.target.value)
            }
            // setJustification_date(e.target.value)
            setDateError('')
        } else {
            setDateError(
                'Solo puedes seleccionar 3 días antes o 3 días después del día de hoy.'
            )
        }
    }

    const onCancelJusti = () => {
        cancelarModalAlert(false)
    }

    return (
        <>
            <div className='justify-center w-full max-h-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                {/* Formulario */}

                <div className='max-w-lg border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    <div className='px-6 py-6 lg:px-8'>
                        <h2 className='mb-4 text-xl font-semibold text-gray-900 text-center '>
                            Agregar Justificacion
                        </h2>

                        <form
                            className='flex flex-col items-center gap-2'
                            onSubmit={handleSubmit}>
                            {messages && (
                                <p className='text-red-500 text-sm'>
                                    {messages}
                                </p>
                            )}
                            <div className='w-full flex items-center justify-between gap-4'>
                                <div className='w-full flex flex-col text-sm outline-none'>
                                    <label
                                        htmlFor='justification'
                                        className='mb-2 text-black'>
                                        Tipo de justificación
                                    </label>
                                    <select
                                        id='justification'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2 outline-none'
                                        defaultValue='Seleccione'
                                        onChange={event => {
                                            const selectedValue =
                                                event.target.value
                                            let justificationType

                                            if (selectedValue === 'Falta') {
                                                justificationType = 0
                                            } else if (
                                                selectedValue === 'Tardanza'
                                            ) {
                                                justificationType = 1
                                            } else {
                                                // Manejar el caso de "Seleccione" u opciones no reconocidas
                                                justificationType = null // O cualquier otro valor por defecto
                                            }

                                            setJustification_type(
                                                justificationType
                                            )
                                        }}>
                                        <option value='Seleccione'>
                                            Seleccione
                                        </option>
                                        <option value='Tardanza'>
                                            Tardanza
                                        </option>
                                        <option value='Falta'>Falta</option>
                                    </select>
                                </div>

                                <div className='w-full flex flex-col text-sm text-black'>
                                    <div className='flex flex-row items-center justify-between'>
                                        <label htmlFor='date' className='mb-2'>
                                            Fecha
                                        </label>

                                        {/* <div className='flex mb-2 gap-1'>
                                            {showLabel && (
                                                <label
                                                    htmlFor='radio'
                                                    className='text-gray-300'>
                                                    establecer rango
                                                </label>
                                            )}

                                            <input
                                                id='radio'
                                                className=''
                                                type='radio'
                                                onClick={() => {
                                                    setRadioButton(!radioButton)
                                                    setShowLabel(!showLabel)
                                                }}
                                            />
                                        </div> */}
                                    </div>

                                    <input
                                        id='date'
                                        className='border-gray-300 bg-gray-50 border p-2 rounded-md outline-none'
                                        type='date'
                                        name='justification_date'
                                        value={justification_date}
                                        onChange={handleDateChange}
                                    />
                                </div>

                                {/* {radioButton && (
                                    <div className='w-full flex flex-col text-sm text-black'>
                                        <label htmlFor='date' className='mb-2'>
                                            Fecha Máxima
                                        </label>
                                        <input
                                            id='date'
                                            className='border-gray-300 bg-gray-50 border p-2 rounded-md outline-none'
                                            type='date'
                                            name='justification_date_max'
                                            value={justification_date_max}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                )} */}
                            </div>
                            <div className='w-full flex justify-center'>
                                {dateError && (
                                    <p className='text-red-500 text-sm'>
                                        {dateError}
                                    </p>
                                )}
                            </div>

                            <div className='w-full flex flex-col'>
                                <label
                                    htmlFor='reason'
                                    className='mb-2 text-sm text-black'>
                                    Motivo
                                </label>
                                <textarea
                                    id='reason'
                                    type='text'
                                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300   '
                                    placeholder='Describe el motivo de su tardanza o falta'
                                    name='reason'
                                    value={reason}
                                    onChange={handleTextChange}
                                    minLength={255}></textarea>
                                <p className='mt-1 text-xs'>
                                    Caracteres restantes: {255 - reason.length}
                                </p>
                            </div>

                            <div className='w-full flex flex-col'>
                                <p className='mb-2 text-black'>Evidencias</p>
                                <div className='flex items-center justify-center w-full'>
                                    <label
                                        htmlFor='dropzone-file'
                                        className='flex flex-col items-center justify-center w-full border border-gray-300  rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100'>
                                        <div className='flex flex-col items-center justify-center py-2'>
                                            <svg
                                                className='w-8 mb-4 text-gray-500 dark:text-gray-400'
                                                aria-hidden='true'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 20 16'>
                                                <path
                                                    stroke='currentColor'
                                                    d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                                />
                                            </svg>

                                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                                <span className='font-semibold'>
                                                    {evidence
                                                        ? evidence.name
                                                        : 'Seleccione un archivo'}
                                                </span>{' '}
                                                {evidence
                                                    ? ''
                                                    : 'o arrastre y suelte aquí'}
                                            </p>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                                PNG, JPG or PDF tamaño de
                                                archivo no superior a 10mb
                                            </p>
                                        </div>
                                        <input
                                            id='dropzone-file'
                                            type='file'
                                            name='evidence'
                                            className='hidden'
                                            required
                                            onChange={e =>
                                                setEvidence(e.target.files[0])
                                            }
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className='w-full flex justify-evenly items-center mt-2'>
                                <button
                                    onClick={onCancelJusti}
                                    className='uppercase border-2 border-cv-primary hover:bg-cv-primary hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300 text-black'>
                                    CANCELAR
                                </button>
                                <button
                                    className='uppercase text-white border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'
                                    onClick={handleSubmit}
                                    type='submit'>
                                    GUARDAR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

ModalAgregar.propTypes = {
    cancelarModalAlert: PropTypes.func.isRequired,
    setToasSuccess: PropTypes.func.isRequired,
    handleBuscar: PropTypes.func.isRequired,
    setMensajeAlerta: PropTypes.func,
}
