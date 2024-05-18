import { useEffect, useState } from 'react';
import getTokens from '../helpers/getTokens';

const useNotifications = () => {
    const {token} = getTokens();
    const [data, setData] = useState([]);

    const getNotificationsPerPage = async (page)=>{        
        try {
            const url = new URL(import.meta.env.VITE_API_URL + `/notification/list?page=${page}`);
    
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error("Error en el fetch de notificaciones")
            
            return data;
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }    
    }

    const getAllData = async ()=>{
        let flag= "";
        let page = 1;
        let dataList = [];        
        while(flag != null) {
            const data = await getNotificationsPerPage(page)
            flag = data.next_page_url;
            dataList = dataList.concat(data.data);            
            page++;            
        }
        
        setData(dataList);
    }

    useEffect(()=>{
        getAllData();
    }, []);

    return {data, setData};
};

export default useNotifications;