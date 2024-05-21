import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TableNotifications from '../../../components/notificaciones/TableNotifications';
import useNotifications from '../../../components/notificaciones/hooks/useNotifications';
import MessageNotFound from '../../../components/MessageNotFound';

const Notifications = () => {  
    const [openModal, setOpenModal] = useState(false);            
    const {data, setData} = useNotifications();

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
        Agregar notificación
      </button>
      {data.length > 0 ?
        <TableNotifications data={data} setData={setData} setOpenModal={setOpenModal} openModal={openModal}/>
        :
        <MessageNotFound/>
      }
    </>
    );
};

export default Notifications;