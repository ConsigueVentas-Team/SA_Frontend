import { useState, useEffect } from 'react'
import ModalConfirmacion from './Modals/ModalConfirmacion'
import { AES, enc } from 'crypto-js'
import { ModalSpinners } from './Modals/ModalSpinners'
import AddBoxIcon from '@mui/icons-material/AddBox'

const TablaEvaluaciones = ({
    id,
    setIdd,
    setIsModalOpen,
    setPromedio,
    setNota1,
    setNota2,
    setNota3,
    setNota4,
    rol,
    feching,
}) => {
    const [numFilas, setNumFilas] = useState(0)
    const [mostrarModal, setMostrarModal] = useState(false)
    const [evaluacion, setEvaluacion] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const calcularPromedio = () => {
        if (evaluacion.length > 0) {
            const promedio = evaluacion.reduce((acc, curr) => {
                return acc + curr.promedio
            }, 0)

            const prom = promedio / evaluacion.length

            return prom.toFixed(2)
        }
    }

    const agregarFila = () => {
        setMostrarModal(true)
    }

    const fetchUser = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const tokenKey = import.meta.env.VITE_TOKEN_KEY

            const url = new URL(`${apiUrl}/evaluation/list`)

            const tokenD = AES.decrypt(localStorage.getItem('token'), tokenKey)
            const token = tokenD.toString(enc.Utf8)

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error(`Error al obtener datos: ${response.status}`)
            }

            const data = await response.json()

            if (data) {
                const dataMisEvaluaciones = data.filter(
                    element => element.user == parseInt(id)
                )
                setEvaluacion([...dataMisEvaluaciones])
            }

            setIsLoading(false)
        } catch (error) {
            console.error('Error al obtener el usuario:', error.message)
            setIsLoading(false)
        }
    }

    const confirmarAgregarFila = async () => {
        setNumFilas(numFilas)
        setMostrarModal(false)
    
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const tokenKey = import.meta.env.VITE_TOKEN_KEY
            const url = new URL(`${apiUrl}/evaluation/create`)
    
            const tokenD = AES.decrypt(localStorage.getItem('token'), tokenKey)
            const token = tokenD.toString(enc.Utf8)
    
            const data = {
                user: parseInt(id),
                date: "2024-01-25",
                softskills: 0,
                performance: 0,
                hardskills: 0,
                autoevaluation: 0
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
            const result = await response.json()
            setIdd(result.id)
            setIsLoading(false)
            fetchUser()
        } catch (error) {
            setIsLoading(false)
            console.error(error.message)
        }
    }
    

    const cancelarAgregarFila = () => {
        setMostrarModal(false)
        setIsLoading(false)
    }

    const filaClase = 'rounded border-cv-secondary'
    const celdaClase = 'px-6 py-4 whitespace-nowrap'

    useEffect(() => {        
        fetchUser();                        
    }, [feching])
    
    useEffect(()=>{
        setPromedio(calcularPromedio());        
    }, [evaluacion]);

    return (
        <div>
            <ModalConfirmacion
                isOpen={mostrarModal}
                onConfirm={confirmarAgregarFila}
                onClose={cancelarAgregarFila}
                setIsLoading={setIsLoading}
            />

            <ModalSpinners isOpen={isLoading} />

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
                            {rol === 'Lider Nucleo' || rol === 'Gerencia' || rol === 'Lider Departamento'
                                ? 'EVALUACIONES LIDER'
                                : 'EVALUACIONES COLABORADOR'}
                            {/* EVALUACIONES */}
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-cv-primary rounded-tl-lg rounded-tr-lg border-b border-cv-secondary'>
                    <tr className={`${filaClase} bg-[#0e161b]`}>
                        <td
                            className={celdaClase}
                            style={{ fontWeight: 'bold' }}>
                            FECHA
                        </td>

                        {rol === 'Lider Nucleo' || rol === 'Gerencia' || rol === 'Lider Departamento' ? (
                            <td
                                className={celdaClase}
                                style={{ fontWeight: 'bold' }}>
                                AUTOEVALUACIÓN
                            </td>
                        ) : (
                            <>
                                <td
                                    className={celdaClase}
                                    style={{ fontWeight: 'bold' }}>
                                    HABILIDADES BLANDAS
                                </td>
                                <td
                                    className={celdaClase}
                                    style={{ fontWeight: 'bold' }}>
                                    HABILIDADES DURAS
                                </td>
                                <td
                                    className={celdaClase}
                                    style={{ fontWeight: 'bold' }}>
                                    DESEMPEÑO
                                </td>
                            </>
                        )}

                        <td
                            className={celdaClase}
                            style={{ fontWeight: 'bold' }}>
                            PROMEDIO
                        </td>
                    </tr>

                    {evaluacion.map((evaluacionItem, index) => (
                        <tr
                            key={index}
                            className={`${filaClase} hover:bg-gray-700`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setIdd(evaluacionItem.id)
                                setNota1(evaluacionItem.softskills)
                                setNota2(evaluacionItem.performance)
                                setNota3(evaluacionItem.hardskills)
                                setNota4(evaluacionItem.autoevaluation)
                                setIsModalOpen(true)
                            }}>
                            <td className={celdaClase}>
                                {evaluacionItem.date}
                            </td>
                            {rol === 'Lider Nucleo' || rol === 'Gerencia' || rol === 'Lider Departamento' ? (
                                <td className={celdaClase}>
                                    {evaluacionItem.autoevaluation || 'N/A'}
                                </td>
                            ) : (
                                <>
                                    <td className={celdaClase}>
                                        {evaluacionItem.softskills || 'N/A'}
                                    </td>
                                    <td className={celdaClase}>
                                        {evaluacionItem.performance || 'N/A'}
                                    </td>
                                    <td className={celdaClase}>
                                        {evaluacionItem.hardskills || 'N/A'}
                                    </td>
                                </>
                            )}

                            <td className={celdaClase}>
                                {evaluacionItem.promedio || 'N/A'}
                            </td>
                        </tr>
                    ))}

                    <tr className=''>
                        <td
                            colSpan={
                                rol === 'Lider Nucleo' || rol === 'Gerencia'
                                    ? 6
                                    : 7
                            }
                            className='px-6 py-4 whitespace-nowrap bg-cv-primary'>
                            <button
                                className=' text-cv-cyan uppercase font-semibold'
                                onClick={agregarFila}>
                                <AddBoxIcon /> Agregar Evaluacion
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TablaEvaluaciones
