import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TableNotifications from '../../../components/notificaciones/TableNotifications';
import useNotifications from '../../../components/notificaciones/hooks/useNotifications';
import MessageNotFound from '../../../components/MessageNotFound';
import Loading from '../../../components/essentials/Loading';
import ModalAddNewNotification from '../../../components/notificaciones/ModalAddNewNotification';
import AlertMessage from '../../../components/AlertMessage';
import { ACTIONSTATE } from '../../../components/notificaciones/states/actionState';
import useNotificationActions from '../../../components/notificaciones/hooks/useNotificationActions';

const Notifications = () => {  
    const [openModal, setOpenModal] = useState(false);//Estado para abrir o cerrar el modal crear notificación
    const {data, setUpdateTable, loading} = useNotifications();
    const [isCreateDone, setIsCreateDone] = useState("");
    const [isDeleteDone, setIsDeleteDone] = useState("");
    const [isModifyDone, setIsModifyDone] = useState("");
    const { addNewNotification, removeNotification, updateNotification } = useNotificationActions();

    const handleAddNewNotification = (formData)=>{
      addNewNotification(formData, setIsCreateDone, setUpdateTable);
    }

    const handleRemoveNotification = (id)=>{
      removeNotification(id, setIsDeleteDone, setUpdateTable)
    }

    const handleUpdateNotification = (id, formData)=>{
      updateNotification(id, formData, setIsModifyDone, setUpdateTable);
    }

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
      <ModalAddNewNotification addNewNotification={handleAddNewNotification} openModal={openModal} setOpenModal={setOpenModal}/>
      {loading ? <Loading/> :(
        data.length > 0 ?
          <TableNotifications updateNotification={handleUpdateNotification} removeNotification={handleRemoveNotification} setIsModifyDone={setIsModifyDone} data={data} setOpenModal={setOpenModal} openModal={openModal}/>
          :
          <MessageNotFound/>)
      }
      <div className='fixed top-6 left-1/2 -translate-x-1/2'>
        <AlertMessage type='success' text={'Notificación creada correctamente.'} open={isCreateDone === ACTIONSTATE.SUCCESSFUL ? true : false} setOpen={setIsCreateDone}/>
      </div>
      <div className='fixed top-6 left-1/2 -translate-x-1/2'>
        <AlertMessage type='warning' text={'Error al crear notificación.'} open={isCreateDone === ACTIONSTATE.ERROR ? true : false} setOpen={setIsCreateDone}/>
      </div>
      <div className='fixed top-6 left-1/2 -translate-x-1/2'>
        <AlertMessage type='success' text={'Notificación eliminada correctamente.'} open={isDeleteDone === ACTIONSTATE.SUCCESSFUL ? true : false} setOpen={setIsDeleteDone}/>
      </div>
      <div className='fixed top-6 left-1/2 -translate-x-1/2'>
        <AlertMessage type='warning' text={'Error al eliminar la notificación.'} open={isDeleteDone === ACTIONSTATE.ERROR ? true : false} setOpen={setIsDeleteDone}/>
      </div>      
      <div className='fixed top-6 left-1/2 -translate-x-1/2'>
        <AlertMessage type='success' text={'Notificación modificada correctamente.'} open={isModifyDone === ACTIONSTATE.SUCCESSFUL ? true : false} setOpen={setIsModifyDone}/>
      </div>
      <div className='fixed top-6 left-1/2 -translate-x-1/2'>
        <AlertMessage type='warning' text={'Error al eliminar la notificación.'} open={isModifyDone === ACTIONSTATE.ERROR ? true : false} setOpen={setIsModifyDone}/>
      </div>      
    </>
    );
};

export default Notifications;