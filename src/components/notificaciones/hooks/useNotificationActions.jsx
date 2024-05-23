import getTokens from '../helpers/getTokens';
import { ACTIONSTATE } from '../states/actionState';

const useNotificationActions = () => {
    const {token} = getTokens();            

    const updateNotification = (message, notification) => {
        const { id } = notification;
        const data = {...notification, message}        
        
        fetch(import.meta.env.VITE_TOKEN_KEY + `/notification/list/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) throw new Error("Error al actualizar la notificación");
            //Codigo para mostrar message que todo salio bien
        })
        .catch(err=> console.log(err))
    }

    const removeNotification = (id, setIsDeleteDone)=>{                
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
        })        
        .catch(err=>{
            setIsDeleteDone(ACTIONSTATE.ERROR);                        
            console.log(err)
        })
    }

    const addNewNotification = (event, setIsEmpty, setAlert)=>{
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);           
        const message = formData.get('message');
        const loggedId = localStorage.getItem('iduser');
        
        formData.append("user", loggedId)        
        
        if(!message) return setIsEmpty(true);

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
        })        
        .catch(err=> {            
            setAlert(ACTIONSTATE.ERROR)            
            console.log(err)
        })        
    }    

    return {addNewNotification, removeNotification, updateNotification};
};

export default useNotificationActions;