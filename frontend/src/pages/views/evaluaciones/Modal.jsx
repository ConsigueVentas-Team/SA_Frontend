import { useState, useEffect } from 'react'
import { AES, enc } from 'crypto-js'
import Loading from '../../../components/essentials/Loading'

const Modal = ({ isOpen, onClose, idd, nota1, nota2, nota3, nota4 }) => {
    const [softskills, setSoftskills] = useState(nota1 || '')
    const [performance, setPerformance] = useState(nota2 || '')
    const [autoevaluation, setAutoevaluation] = useState(nota3 || '')
    const [hardskills, setHardskills] = useState(nota4 || '')
    const [error, setError] = useState(null)
    const [isSaving, setIsSaving] = useState(false)

    const clearForm = () => {
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
        } catch (error) {
            setError(error.message)
            setIsSaving(false)
        }
    }

    const validarFormulario = () => {
        if (
            (softskills.trim() === '' && nota1 === '') ||
            (performance.trim() === '' && nota2 === '') ||
            (autoevaluation.trim() === '' && nota3 === '') ||
            (hardskills.trim() === '' && nota4 === '')
        ) {
            setError('Todos los campos son obligatorios')
        } else if (
            softskills < 0 ||
            softskills > 20 ||
            performance < 0 ||
            performance > 20 ||
            autoevaluation < 0 ||
            autoevaluation > 20 ||
            hardskills < 0 ||
            hardskills > 20
        ) {
            setError('La nota debe estar entre 0 y 20')
        } else {
            handleGuardar()
            setIsSaving(true)
        }
    }

    useEffect(() => {
        if (isOpen) {
            // Realizar alguna acción cuando el modal se abre, como cargar las notas actuales
            setSoftskills(nota1 || '') // Cargar la nota1 actual si existe
            setPerformance(nota2 || '') // Cargar la nota2 actual si existe
            setAutoevaluation(nota3 || '') // Cargar la nota3 actual si existe
            setHardskills(nota4 || '') // Cargar la nota4 actual si existe
        }
    }, [isOpen, nota1, nota2, nota3, nota4])

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-black bg-opacity-50 ${
                isOpen ? 'block' : 'hidden'
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
                                value={softskills}
                                onChange={e => setSoftskills(e.target.value)}
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
                                value={performance}
                                onChange={e => setPerformance(e.target.value)}
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
                                value={autoevaluation}
                                onChange={e =>
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
                                value={hardskills}
                                onChange={e => setHardskills(e.target.value)}
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
