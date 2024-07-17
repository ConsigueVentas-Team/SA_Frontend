import { Alert, Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const ModalAddNewNotification = ({addNewNotification, openModal, setOpenModal}) => {    
    const [isLonger, setIsLonger] = useState(false);
    const [isShort, setIsShort] = useState(false);

    const handleCreateNotification = (event)=>{
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);                   
        const loggedId = localStorage.getItem('iduser');
        const message = formData.get('message');
        
        formData.append("user", loggedId)        

        if(message === '') return setIsShort(true);
        if(isLonger || isShort) return;

        addNewNotification(formData)
        setOpenModal(false);
    }

    const handleLongText = (e)=>{
        const message = e.target.value;
        
        if(message === " ") e.target.value = ""

        if(message.length > 250) setIsLonger(true)
        else setIsLonger(false)          

        if(message.length < 10) setIsShort(true);
        else setIsShort(false);
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
        <Box>            
            <div className='bg-white py-6 w-[450px] rounded-md overflow-hidden'>
                <div className='flex w-fit mx-auto items-center gap-1'>
                    <NoteAddIcon/>
                    <span className='font-medium text-black text-xl block m-auto w-fit'>Crear Notificación</span>
                </div>                
            <hr className='border-slate-300 w-full mt-5'/>
            <form className='mt-5' onSubmit={handleCreateNotification} action="">
                <div className='px-4'>
                    <label className='block mb-5' htmlFor="message">Notificación: </label>
                    <textarea onChange={handleLongText} name='message' className='h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2 outline-none' placeholder='Escribe la notificación...' ></textarea>                    
                    {
                        isLonger &&
                        <Alert className='mt-5 w-fit mx-auto flex items-center' variant="outlined" severity="error">                            
                            Max. caracteres: 250
                        </Alert>
                    }
                    {
                        isShort &&
                        <Alert className='mt-5 w-fit mx-auto flex items-center' variant="outlined" severity="error">                            
                            Min. caracteres: 10
                        </Alert>
                    }
                </div>
                <hr className='border-slate-300 w-full mt-7'/>
                <div className='px-4 m-auto mt-8 w-fit flex gap-5'>
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