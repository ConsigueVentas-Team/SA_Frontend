import getTokens from '../helpers/getTokens';

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

    const removeNotification = (id, data, setData)=>{
        const list = data.filter(notification => notification.id !== id)
        setData(list);        
        //Falta id en la url
        const url = new URL(import.meta.env.VITE_API_URL + `/notification/list`);            

        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }       
        })
        .then(res => {
            if(!res.ok) throw new Error("Error al eliminar la notificación");
            //code
        })
        .catch(err=>console.log(err))
    }

    const addNewNotification = (event, setIsEmpty, setAlert, setOpenModal)=>{
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);           
        const message = formData.get('message');
        formData.append("user", 7)        
        
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
            setAlert(true)
            setOpenModal(false)            
        })        
        .catch(err=> console.log(err))        
    }    

    return {addNewNotification, removeNotification, updateNotification};
};

export default useNotificationActions;