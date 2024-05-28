import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const ModalConfirmacion = ({ isOpen, onConfirm, onClose, setIsLoading }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-black bg-opacity-50 ${
                isOpen ? 'block' : 'hidden'
            }`}
            onClick={onClose}>
            <div
                className='modal max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md'
                style={{ margin: '50px' }}
                onClick={e => e.stopPropagation()} // Evitar que el clic dentro del modal lo cierre
            >
                <div className='flex pt-0 items-center justify-center p-4 border-b rounded-t '>
                            <h3 className='items-center'>
                                <ReportProblemIcon
                                    sx={{ color: '#F3AE37', fontSize: 60 }}
                                />
                            </h3>
                        </div>
                <p className='text-black text-center font-medium  mb-4 p-10'>
                    ¿Estás seguro de que deseas crear una evaluación?
                </p>
                <hr className='mb-4'/>
                <div className='flex justify-center'>
                    <button
                        onClick={() => {
                            onConfirm()
                            onClose()
                            setIsLoading(true)
                        }}
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                        style={{ backgroundColor: '#16232b' }}>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmacion
