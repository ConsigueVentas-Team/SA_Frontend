import { Box, Modal } from '@mui/material';
import React from 'react';

const ModalEditNotification = ({setOpenEditModal, openEditModal, currentMessage}) => {
    return (        
        <Modal
            open={openEditModal}
            onClose={()=>{
                setOpenEditModal(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-description"
            className='flex items-center justify-center'            
            >      
            <Box className=''>
                <div className='bg-white px-4 py-6 w-96 rounded-md overflow-hidden'>
                    <span className='font-medium text-black text-xl block m-auto w-fit'>Modificar Notificación</span>
                    <form className='mt-6' onSubmit={(event)=>{addNewNotification(event)}} action="">                    
                        <span>Actual notificación:</span>
                        <div className='h-auto mt-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2'>
                            {currentMessage}
                        </div>                    
                        <label className='mt-5 block' htmlFor="message">
                            <span>Notificación modificada:</span>
                            <textarea name='message' className='mt-2.5 h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2 outline-none' placeholder='Escribe la notificación...' ></textarea>
                        </label>
                        <div className='m-auto block mt-8 w-fit flex gap-5'>
                        <button onClick={()=>{setOpenEditModal(false)}} className='uppercase border-2 border-cv-primary hover:bg-cv-primary hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300 text-black'>
                            cancelar
                        </button>
                        <button className='uppercase text-white border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'>
                            Modificar
                        </button>
                        </div>
                    </form>
                </div>        
            </Box>
        </Modal>        
    );
};

export default ModalEditNotification;