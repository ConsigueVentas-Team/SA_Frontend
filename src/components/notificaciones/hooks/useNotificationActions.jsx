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

        fetch(import.meta.env.VITE_TOKEN_KEY + `/notification/list/${id}`, {
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

    const addNewNotification = (event)=>{
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);           

        fetch(import.meta.env.VITE_TOKEN_KEY + "/notificacion/create", {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
        })
        .then(res => {
            if(!res.ok) throw new Error("Error al crear notificación");
            return res.json();
        })
        .then(data => {
            //codigo para mostrar que todo sucedio correctamente.
        })
        .catch(err=> console.log(err))
    }    

    return {addNewNotification, removeNotification, updateNotification};
};

export default useNotificationActions;