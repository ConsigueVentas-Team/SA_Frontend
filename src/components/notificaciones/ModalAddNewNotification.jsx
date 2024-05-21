import { Box, Modal } from '@mui/material';
import React from 'react';
import useNotificationActions from './hooks/useNotificationActions';

const ModalAddNewNotification = ({openModal, setOpenModal}) => {
    const { addNewNotification } = useNotificationActions();

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
        <Box className=''>
            <div className='bg-white px-4 py-6 w-96 rounded-md overflow-hidden'>
            <span className='font-medium text-black text-xl block m-auto w-fit'>Crear Notificación</span>
            <form className='mt-8' onSubmit={(event)=>{addNewNotification(event)}} action="">
                <textarea className='h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2 outline-none' placeholder='Escribe la notificación...' ></textarea>
                <div className='m-auto block mt-8 w-fit flex gap-5'>
                <button onClick={()=>{setOpenModal(false)}} className='uppercase border-2 border-cv-primary hover:bg-cv-primary hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300 text-black'>
                    cancelar
                </button>
                <button className='uppercase text-white border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'>
                    Agregar
                </button>
                </div>
            </form>
            </div>        
        </Box>
        </Modal>
    );
};

export default ModalAddNewNotification;