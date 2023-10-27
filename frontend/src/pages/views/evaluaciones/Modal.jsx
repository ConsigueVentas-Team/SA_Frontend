import { useState } from 'react'
import { AES, enc } from 'crypto-js'
import Loading from '../../../components/essentials/Loading'

const Modal = ({ isOpen, onClose, idd, nota1, nota2, nota3, nota4 }) => {

    const [softskills, setSoftskills] = useState('')
    const [performance, setPerformance] = useState('')
    const [autoevaluation, setAutoevaluation] = useState('')
    const [hardskills, setHardskills] = useState('')
    const [error, setError] = useState(null)
    const [isSaving, setIsSaving] = useState(false)


    console.log({ nota1, nota2, nota3, nota4 })
    console.log({ softskills, performance, autoevaluation, hardskills })


    const clearForm = () => {
        setSoftskills('')
        setPerformance('')
        setAutoevaluation('')
        setHardskills('')
        onClose()
        setError(null)
    }

    const handleGuardar = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const tokenKey = import.meta.env.VITE_TOKEN_KEY

            const url = new URL(`${apiUrl}/evaluation/notes/${idd}`)

            const tokenD = AES.decrypt(localStorage.getItem('token'), tokenKey)
            const token = tokenD.toString(enc.Utf8)

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    softskills,
                    performance,
                    autoevaluation,
                    hardskills,
                }),
            })

            if (!response.ok) {
                throw new Error(
                    `Error al guardar los datos: ${response.status}`
                )
            }

            onClose()
            setSoftskills('')
            setPerformance('')
            setAutoevaluation('')
            setHardskills('')
            setError(null)
            setIsSaving(false)
        } catch (error) {
            setError(error.message)
            setIsSaving(false)
        }
    }

    const validarFormulario = () => {
        if (
            softskills.trim() === '' ||
            performance.trim() === '' ||
            autoevaluation.trim() === '' ||
            hardskills.trim() === ''
        ) {
            setError('Todos los campos son obligatorios')
        } else {
            if (softskills >= 0 && softskills <= 20) {
                if (performance >= 0 && performance <= 20) {
                    if (autoevaluation >= 0 && autoevaluation <= 20) {
                        if (hardskills >= 0 && hardskills <= 20) {
                            handleGuardar()
                            setIsSaving(true)
                        } else {
                            setError('La nota debe ser entre 0 y 20')
                        }
                    } else {
                        setError('La nota debe ser entre 0 y 20')
                    }
                } else {
                    setError('La nota debe ser entre 0 y 20')
                }
            } else {
                setError('La nota debe ser entre 0 y 20')
            }
        }
    }

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'
                }`}>
            {isSaving ? (
                <Loading />
            ) : (
                <div
                    className='modal mx-auto bg-white p-4 rounded-lg shadow-md'
                    style={{ margin: '50px' }}>
                    <h2 className=' font-bold text-center mb-4'>
                        CARGAR NOTAS
                    </h2>
                    {/* <h4 className='text-1xl font-bold text-center mb-4 text-gray-600 uppercase'>
                        {mes}
                    </h4> */}

                    <div className='mb-4 rounded-lg border border-gray-400 bg-gray-100 px-2 py-1'>
                        <div className='flex items-center'>
                            <label className='w-2/4 text-gray-500'>ID:</label>
                            <input
                                type='text'
                                placeholder='ID'
                                value={idd}
                                readOnly
                                className='w-3/4 rounded p-2 ml-2 border border-gray-300'
                            />
                        </div>
                    </div>

                    <div className='mb-4 rounded-lg border border-gray-400 bg-gray-100 px-2 py-1'>
                        <div className='flex items-center'>
                            <label className='w-2/4 text-gray-500'>
                                Habilidades Blandas
                            </label>
                            <input
                                type='number'
                                placeholder={nota1}
                                value={softskills}
                                onChange={(e) => setSoftskills(e.target.value)}
                                className='w-3/4 rounded p-2 ml-2 border border-gray-300'
                            />
                        </div>
                    </div>

                    <div className='mb-4 rounded-lg border border-gray-400 bg-gray-100 px-2 py-1'>
                        <div className='flex items-center'>
                            <label className='w-2/4 text-gray-500'>
                                Habilidades Duras
                            </label>
                            <input
                                type='number'
                                placeholder={nota2}
                                value={performance}
                                onChange={(e) => setPerformance(e.target.value)}
                                className='w-3/4 rounded p-2 ml-2 border border-gray-300'
                            />
                        </div>
                    </div>

                    <div className='mb-4 rounded-lg border border-gray-400  bg-gray-100 px-2 py-1'>
                        <div className='flex items-center'>
                            <label className='w-2/4 text-gray-500'>
                                Desempeño
                            </label>
                            <input
                                type='number'
                                placeholder={nota3}
                                value={autoevaluation}
                                onChange={(e) =>
                                    setAutoevaluation(e.target.value)
                                }
                                className='w-3/4 rounded p-2 ml-2 border border-gray-300'
                            />
                        </div>
                    </div>

                    <div className='mb-4 rounded-lg border border-gray-400 bg-gray-100 px-2 py-1'>
                        <div className='flex items-center'>
                            <label className='w-2/4 text-gray-500'>
                                Autoevaluacion
                            </label>
                            <input
                                type='number'
                                placeholder={nota4}
                                value={hardskills}
                                onChange={(e) => setHardskills(e.target.value)}
                                className='w-3/4 rounded p-2 ml-2 border border-gray-300'
                            />
                        </div>
                    </div>

                    {error && <p className='text-red-500'>{error}</p>}

                    <p className='text-black text-right mb-4'>
                        Promedio:{' '}
                        {(
                            (parseFloat(softskills) +
                                parseFloat(performance) +
                                parseFloat(autoevaluation) +
                                parseFloat(hardskills)) /
                            4
                        ).toFixed(2)}
                    </p>
                    <hr className='my-4 border-t border-gray-400' />
                    <div className='flex justify-between'>
                        <button
                            onClick={clearForm}
                            className='bg-white border border-black text-black px-4 py-2 rounded-lg mr-2 hover:font-semibold'
                            style={{ backgroundColor: '#fcfcfc' }}>
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                validarFormulario()
                            }}
                            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:font-semibold'
                            style={{ backgroundColor: '#16232b' }}>
                            Guardar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal
