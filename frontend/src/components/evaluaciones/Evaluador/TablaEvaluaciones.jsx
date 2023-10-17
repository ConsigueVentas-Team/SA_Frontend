import { useState, useEffect } from 'react'
import ModalConfirmacion from './Modals/ModalConfirmacion'
import { AES, enc } from 'crypto-js'

const TablaEvaluaciones = ({ rol, id, setIdd, setIsModalOpen }) => {
    const [numFilas, setNumFilas] = useState(0)
    const [mostrarModal, setMostrarModal] = useState(false)
    const [mostrarEncabezados, setMostrarEncabezados] = useState(false)
    const [evaluacion, setEvaluacion] = useState([])

    const obtenerNombreDelMes = fecha => {
        const meses = [
            'ENERO',
            'FEBRERO',
            'MARZO',
            'ABRIL',
            'MAYO',
            'JUNIO',
            'JULIO',
            'AGOSTO',
            'SEPTIEMBRE',
            'OCTUBRE',
            'NOVIEMBRE',
            'DICIEMBRE',
        ]
        return meses[fecha.getMonth()]
    }

    const fechaActual = new Date()
    const mesActual = obtenerNombreDelMes(fechaActual)

    const agregarFila = () => {
        setMostrarModal(true)
    }

    const confirmarAgregarFila = async () => {
        setNumFilas(numFilas)
        setMostrarModal(false)
        if (numFilas === 0) {
            setMostrarEncabezados(true)
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const tokenKey = import.meta.env.VITE_TOKEN_KEY
            const url = new URL(`${apiUrl}/evaluation/create`)

            const tokenD = AES.decrypt(localStorage.getItem('token'), tokenKey)
            const token = tokenD.toString(enc.Utf8)

            const data = {
                user_id: id,
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error(
                    `Error al agregar evaluación: ${response.status}`
                )
            }

            const nuevaFila = {
                date: mesActual,
                softskills: 'N/A',
                performance: 'N/A',
                autoevaluation: 'N/A',
                hardskills: 'N/A',
                promedio: 'N/A',
            }

            const result = await response.json()
            setIdd(result.data.id)

            setEvaluacion([...evaluacion, nuevaFila])
        } catch (error) {
            console.error('Error al agregar la evaluación:', error.message)
        }
    }

    const cancelarAgregarFila = () => {
        setMostrarModal(false)
    }

    const filaClase = 'border-b border-cv-secondary'
    const celdaClase = 'px-6 py-4 whitespace-nowrap'

    useEffect(() => {
        const obtenerEvaluacion = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const tokenKey = import.meta.env.VITE_TOKEN_KEY
                const url = new URL(`${apiUrl}/evaluation/user/${id}`)

                const tokenD = AES.decrypt(
                    localStorage.getItem('token'),
                    tokenKey
                )
                const token = tokenD.toString(enc.Utf8)

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error(
                        `Error al obtener la evaluación: ${response.status}`
                    )
                }

                const data = await response.json()

                setEvaluacion(data.data)
            } catch (error) {
                console.error('Error al obtener la evaluación:', error.message)
            }
        }

        obtenerEvaluacion()
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const tokenKey = import.meta.env.VITE_TOKEN_KEY

                const url = new URL(`${apiUrl}/evaluation/list`)

                const tokenD = AES.decrypt(
                    localStorage.getItem('token'),
                    tokenKey
                )
                const token = tokenD.toString(enc.Utf8)

                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error(
                        `Error al obtener datos: ${response.status}`
                    )
                }
                //   setIsLoading(false)

                const data = await response.json()

                if (data) {
                    const dataMisEvaluaciones = data.filter(
                        element => element.user_id == parseInt(id)
                    )
                    setEvaluacion([...dataMisEvaluaciones])
                    if (dataMisEvaluaciones.length > 0) {
                        //   setEvaluacionEstado(true)
                    }
                }
            } catch (error) {
                console.error('Error al obtener el usuario:', error.message)
                //   setIsLoading(false);
            }
        }

        fetchUser()
    })

    return (
        <div>
            <ModalConfirmacion
                isOpen={mostrarModal}
                onConfirm={confirmarAgregarFila}
                onClose={cancelarAgregarFila}
            />
            <table className='w-full text-sm text-center text-white'>
                <thead>
                    <tr>
                        <th
                            colSpan={
                                rol === 'Lider Nucleo' || rol === 'Gerencia'
                                    ? 6
                                    : 7
                            }
                            className=' py-4 whitespace-nowrap text-base uppercase'>
                            {rol === 'Lider Nucleo' || rol === 'Gerencia'
                                ? 'EVALUACIONES LIDER'
                                : 'EVALUACIONES COLABORADOR'}
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-cv-primary'>
                    {mostrarEncabezados && (
                        <tr className={`${filaClase} bg-[#0e161b]`}>
                            <td className={celdaClase}>MES</td>
                            <td className={celdaClase}>NOTA 1</td>
                            <td className={celdaClase}>NOTA 2</td>
                            {rol === 'Colaborador' && (
                                <td className={celdaClase}>NOTA 3</td>
                            )}
                            <td className={celdaClase}>NOTA 4</td>
                            <td className={celdaClase}>PROMEDIO</td>
                        </tr>
                    )}

                    {evaluacion.map((evaluacionItem, index) => (
                        <tr
                            key={index}
                            className={`${filaClase} hover:bg-gray-700`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setIdd(evaluacionItem.id)
                                setIsModalOpen(true)
                            }}>
                            <td className={celdaClase}>
                                {evaluacionItem.date}
                            </td>
                            <td className={celdaClase}>
                                {evaluacionItem.softskills || 'N/A'}
                            </td>
                            <td className={celdaClase}>
                                {evaluacionItem.performance || 'N/A'}
                            </td>
                            {rol === 'Colaborador' && (
                                <td className={celdaClase}>
                                    {evaluacionItem.hardskills || 'N/A'}
                                </td>
                            )}
                            <td className={celdaClase}>
                                {rol === 'Colaborador'
                                    ? eval.autoevaluation || 'N/A'
                                    : eval.promedio || 'N/A'}
                            </td>
                            <td className={celdaClase}>
                                {evaluacionItem.promedio || 'N/A'}
                            </td>
                        </tr>
                    ))}

                    <tr className={filaClase}>
                        <td
                            colSpan={
                                rol === 'Lider Nucleo' || rol === 'Gerencia'
                                    ? 6
                                    : 7
                            }
                            className={celdaClase}>
                            <button className='uppercase' onClick={agregarFila}>
                                Agregar Evaluación
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TablaEvaluaciones
