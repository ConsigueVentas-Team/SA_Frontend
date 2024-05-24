import getTokens from '../helpers/getTokens';
import { ACTIONSTATE } from '../states/actionState';

const useNotificationActions = () => {
    const {token} = getTokens();            

    const updateNotification = (id, formData, setIsModifyDone, setUpdateTable) => {                
        const url = new URL(import.meta.env.VITE_API_URL + `/notification/update/${id}`);        

        fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            body: formData
        })
        .then(res => {
            if (!res.ok) throw new Error("Error al actualizar la notificación");
            setIsModifyDone(ACTIONSTATE.SUCCESSFUL)
            setUpdateTable(prevValue=>!prevValue);
        })
        .catch(err=> {
            setIsModifyDone(ACTIONSTATE.ERROR)
            console.log(err)
        })
    }

    const removeNotification = (id, setIsDeleteDone, setUpdateTable)=>{                
        const url = new URL(import.meta.env.VITE_API_URL + `/notification/delete/${id}`);            

        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }       
        })
        .then(res => {
            if(!res.ok) throw new Error("Error al eliminar la notificación");                        
            setIsDeleteDone(ACTIONSTATE.SUCCESSFUL);            
            setUpdateTable(prevValue=>!prevValue);
        })        
        .catch(err=>{
            setIsDeleteDone(ACTIONSTATE.ERROR);                        
            console.log(err)
        })
    }

    const addNewNotification = (formData, setAlert, setUpdateTable)=>{        
        const url = new URL(import.meta.env.VITE_API_URL + `/notification/list`);        

        fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
        })
        .then(res => {
            if(!res.ok) throw new Error("Error al crear notificación");
            setAlert(ACTIONSTATE.SUCCESSFUL)            
            setUpdateTable(prevValue=> !prevValue)
        })        
        .catch(err=> {            
            setAlert(ACTIONSTATE.ERROR)            
            console.log(err)
        })        
    }    

    return {addNewNotification, removeNotification, updateNotification};
};

export default useNotificationActions;