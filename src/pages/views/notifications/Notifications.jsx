import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TableNotifications from '../../../components/notificaciones/TableNotifications';

const Notifications = () => {  
    const [openModal, setOpenModal] = useState(false);            
  
    return (
    <>
      <h1 className='flex w-fit gap-1 items-center text-2xl mt-2'>            
        <NotificationsIcon/>
        <span>Notificaciones</span>
      </h1>    
      <button 
        onClick={()=> setOpenModal(value=>!value)} 
        className="mt-8 border-cv-cyan border h-fit hover:bg-transparent hover:text-cv-cyan w-fit text-cv-primary outline-none px-3 py-1.5 font-semibold text-center bg-cv-cyan rounded-md active:scale-95 ease-in-out duration-300 uppercase text-base"
      >
        Agregar nueva notificación
      </button>
      <TableNotifications setOpenModal={setOpenModal} openModal={openModal}/>
    </>
    );
};

export default Notifications;