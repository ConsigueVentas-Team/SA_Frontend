import { Box, Modal } from '@mui/material';
import React from 'react';
import useNotificationActions from './hooks/useNotificationActions';
import EditIcon from "@mui/icons-material/Edit"; 

const ModalEditNotification = ({notification, setOpenEditModal, openEditModal, setIsModifyDone}) => {
    const { updateNotification } = useNotificationActions();    // const currentMessage = notification.message;
    
    const handleUpdate = (e)=>{                
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newMessage = formData.get('message')
        
        updateNotification(newMessage, notification, setIsModifyDone);
    }

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
                <div className='bg-white py-6 w-96 rounded-md overflow-hidden'>
                    <div className='flex gap-1 mx-auto w-fit items-center'>
                        <EditIcon/>
                        <span className='font-medium text-black text-xl block m-auto w-fit'>Modificar Notificación</span>
                    </div>
                    <hr className='border-slate-300 w-full mt-5'/>
                    <form className='mt-6' onSubmit={handleUpdate} action="">                    
                        <div className='px-4'>
                            <span>Actual notificación:</span>
                            <div className='h-auto mt-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2'>
                                {notification?.message}
                            </div>                    
                            <label className='mt-5 block' htmlFor="message">
                                <span>Notificación modificada:</span>
                                <textarea name='message' className='mt-2.5 h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2 outline-none' placeholder='Escribe la notificación...' ></textarea>
                            </label>
                        </div>
                        <hr className='border-slate-300 w-full mt-7'/>
                        <div className='px-4 m-auto block mt-7 w-fit flex gap-5'>
                            <button onClick={()=>{setOpenEditModal(false)}} className='uppercase border-2 border-cv-primary hover:bg-cv-primary hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300 text-black'>
                                cancelar
                            </button>
                            <button                             
                                className='uppercase text-white border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300'
                            >
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