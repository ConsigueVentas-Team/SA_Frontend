import React from 'react';
import getTokens from '../helpers/getTokens';

const useNotificationActions = () => {
    const {token} = getTokens();            

    const addNewNotification = (event)=>{
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const message = formData.get('message');        

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
            console.log(data)
        })
    }    

    return {addNewNotification};
};

export default useNotificationActions;