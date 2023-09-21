import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import PropTypes from 'prop-types'

export const ModalAlert = ({ mostrarModalAgregar }) => {
    const onAceptTerminos = () => {
        mostrarModalAgregar((e) => !e)
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center z-10 max-w-sm m-auto'>
            {/* Modal */}
            <div className='relative  max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow '>
                    <div className='flex items-center justify-center p-4 border-b rounded-t '>
                        <h3 className='items-center'>
                            <ReportProblemIcon
                                sx={{ color: '#F3AE37', fontSize: 60 }}
                            />
                        </h3>
                    </div>
                    <div className='p-6 space-y-6'>
                        <p className='font-semibold text-center text-black'>
                            Solo se aceptan justificaciones de los tres días
                            atras hasta tres diás despúes.
                        </p>
                    </div>
                    <div className='flex  justify-evenly items-center p-2 border-t border-gray-200  '>
                        <button
                            className='text-white uppercase border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'
                            onClick={onAceptTerminos}>
                            ACEPTO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalAlert.propTypes = {
    mostrarModalAgregar: PropTypes.func.isRequired,
}
