import { Alert, Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import useNotificationActions from './hooks/useNotificationActions';
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const ModalAddNewNotification = ({setAlert, openModal, setOpenModal}) => {
    const { addNewNotification } = useNotificationActions();
    const [isEmpty, setIsEmpty] = useState(null);

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
            <div className='bg-white py-6 w-96 rounded-md overflow-hidden'>
                <div className='flex w-fit mx-auto items-center gap-1'>
                    <NoteAddIcon/>
                    <span className='font-medium text-black text-xl block m-auto w-fit'>Crear Notificación</span>
                </div>                
            <hr className='border-slate-300 w-full mt-5'/>
            <form className='mt-5' onSubmit={(event)=>{addNewNotification(event, setIsEmpty, setAlert, setOpenModal)}} action="">
                <div className='px-4'>
                    <label className='block mb-5' htmlFor="message">Notificación: </label>
                    <textarea name='message' className='h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2 outline-none' placeholder='Escribe la notificación...' ></textarea>
                    {
                        isEmpty &&
                        <Alert className='mt-5 w-fit mx-auto' variant="outlined" severity="error">
                            Escribe tu notificación
                        </Alert>
                    }
                </div>
                <hr className='border-slate-300 w-full mt-7'/>
                <div className='px-4 m-auto block mt-8 w-fit flex gap-5'>
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