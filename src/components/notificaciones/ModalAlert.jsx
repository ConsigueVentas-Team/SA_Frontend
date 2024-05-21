import { Modal } from '@mui/material';
import React from 'react';
import useNotificationActions from './hooks/useNotificationActions';
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const ModalAlert = ({id, setOpenModal, openModal, setData, data}) => {
    const { removeNotification } = useNotificationActions();

    const handleDelete = ()=>{
        setOpenModal(false)
        removeNotification(id, data, setData)
    }

    return (
        <Modal
            open={openModal}
            onClose={()=>{
                setOpenModal(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-description"
            className='flex items-center justify-center'
        >      
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
                                ¿Estas seguro que quieres eliminar esta notificación?
                            </p>
                        </div>
                        <div className='flex py-5 justify-evenly items-center p-2 border-t border-gray-200  '>
                            <button
                                className='text-cv-primary hover:text-white uppercase border-2 border-cv-primary hover:bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'
                                onClick={()=> setOpenModal(false)}
                                >
                                CANCELAR
                            </button>
                            <button
                                className='text-white uppercase border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'
                                onClick={handleDelete}
                                >
                                ELIMINAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAlert;