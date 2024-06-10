import React, { useEffect, useState } from 'react';
import getTokens from '../helpers/getTokens';

const useReportApi = (urlApi) => {
    const [report, setReport] = useState([]);
    const {token} = getTokens();

    const getReport = async ()=>{
        const url = new URL(import.meta.env.VITE_API_URL + `${urlApi}`);

        try {
            const res = await fetch(url, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });            
            
            if(!res.ok) throw new Error();
            
            const report = await res.json();                   
            setReport(report);
        }catch(error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getReport();
    }, []);

    return {report}
};

export default useReportApi;