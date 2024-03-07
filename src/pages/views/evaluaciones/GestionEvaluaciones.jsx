import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TablaEvaluaciones from '../../../components/evaluaciones/Evaluador/TablaEvaluaciones'
import { AES, enc } from 'crypto-js'
import Modal from '../../views/evaluaciones/Modal'
import Loading from '../../../components/essentials/Loading'

export const GestionEvaluaciones = () => {
    let { id, name } = useParams()
    const nombre = name.split('-')
    const nombreComputado = nombre.join(' ')
    const match = nombreComputado.match(
        /^(.*?)\s(Colaborador|Lider Nucleo|Gerencia)$/
    )
    const nombreCompleto = match[1]
    const rolUsuario = match[2]

    const [feching, setFeching] = useState(false)
    const [rol, setRol] = useState(rolUsuario)
    const [idd, setIdd] = useState(null)
    const [nota1, setNota1] = useState(null)
    const [nota2, setNota2] = useState(null)
    const [nota3, setNota3] = useState(null)
    const [nota4, setNota4] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [promedio, setPromedio] = useState([])

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const computarNombre = () => {
        return nombreCompleto
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

            if (data && data.length > 0) {
                const foundUser = data.find(
                    item => item.user === parseInt(id)
                )

                if (foundUser) {
                    setIdd(foundUser.id)
                } else {
                    console.error(
                        `No se encontró evaluaciones con el usuario con el ID ${id}.`
                    )
                }
            }

            setIsLoading(false)
        } catch (error) {
            console.error('Error al obtener el usuario:', error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                idd={idd}
                nota1={nota1}
                nota2={nota2}
                nota3={nota3}
                nota4={nota4}
                rol={rol}
                setFeching={setFeching}
            />

            <div className='flex flex-col gap-4'>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <div className='w-full rounded-lg bg-cv-primary py-4 px-8'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-gray-400 font-medium'>
                                    Nombre:
                                </p>
                                <p className='text-gray-400 font-medium'>
                                    Nota Final:
                                </p>
                            </div>

                            <div className='flex flex-row justify-between font-medium'>
                                <p>{computarNombre()}</p>
                                <p>{promedio}</p>
                            </div>
                        </div>
                        <TablaEvaluaciones
                            setPromedio={setPromedio}
                            id={id}
                            setIdd={setIdd}
                            setIsModalOpen={setIsModalOpen}
                            setNota1={setNota1}
                            setNota2={setNota2}
                            setNota3={setNota3}
                            setNota4={setNota4}
                            rol={rol}
                            feching={feching}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
