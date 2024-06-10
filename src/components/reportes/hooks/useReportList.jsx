import React, { useEffect, useState } from 'react';
import getTokens from '../helpers/getTokens';

const useReportList = () => {
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [usuariosActivos, setUsuariosActivos] = useState(0);
    const [ingresosMes, setIngresosMes] = useState(0);
    const [totalAsistencias, setTotalAsistencias] = useState(0);
    const [totalTardanzas, setTotalTardanzas] = useState(0);
    const [totalFaltas, setTotalFaltas] = useState(0);
    const [totalJustificaciones, setTotalJustificaciones] = useState(0);

    const [totalJus, setTotalJus] = useState(0);
    const [aceptado, setAceptado] = useState(0);
    const [enProceso, setEnProceso] = useState(0);
    const [rechazado, setRechazado] = useState(0);
    const [apiDataAsistenciasSector, setApiDataAsistenciasSector] = useState([]);  
    const [loading, setLoading] = useState(true);
    const {token} = getTokens();

    const fetchData = async () => {
        setLoading(true);
        const url = new URL(import.meta.env.VITE_API_URL + "/reports/list");
        url.searchParams.append("page", 0);
  
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const {data} = await response.json();                
  
          //----------------------------------------------
          setTotalUsuarios(data.reportes_usuarios.reporte_total.total_usuarios);
          setUsuariosActivos(
            data.reportes_usuarios.reporte_total.usuarios_activos
          );
          setIngresosMes(
            data.reportes_usuarios.reporte_total.ingresos_mes.count
          );
  
          /////
          const sumUniqueValues = (data, property) => {
            const uniqueValues = [...new Set(data.map((item) => item[property]))];
            return uniqueValues.reduce((acc, count) => acc + count, 0);
          };
  
          //------------------------------------------------
          const totalAsistencias = sumUniqueValues(data.reportes_asistencias,"department_attendance_count");
          const totalFaltas = sumUniqueValues(data.reportes_asistencias,"department_absence_count");
          const totalTardanzas = sumUniqueValues(data.reportes_asistencias,"department_delay_count");
          const totalJustificaciones = sumUniqueValues(data.reportes_asistencias,"department_justification_count");
  
          setTotalAsistencias(totalAsistencias);
          setTotalFaltas(totalFaltas);
          setTotalTardanzas(totalTardanzas);
          setTotalJustificaciones(totalJustificaciones);
  
          //Setteando datos para los estados de las justificaciones
          setAceptado(
            data.reportes_justificacion.total_justification_aceptado
          );
          setRechazado(
            data.reportes_justificacion.total_justification_rechazado
          );
          setEnProceso(
            data.reportes_justificacion.total_justification_en_proceso
          );
          setTotalJus(data.reportes_justificacion.total_justifications);        
          
          //Datos para barra de asistencias
          const filteredAsisData = data.reportes_asistencias        
          setApiDataAsistenciasSector(filteredAsisData);
          setLoading(false);
        } else {
          console.error("Error al obtener datos de informes");
        }
    }

    useEffect(()=>{
        fetchData();
    },[])
    
    return { 
        totalUsuarios,
        usuariosActivos,
        ingresosMes,
        totalAsistencias,
        totalTardanzas,
        totalFaltas,
        totalJustificaciones,
        totalJus,
        aceptado,
        enProceso,
        rechazado,
        apiDataAsistenciasSector,
        loading, setLoading
    }
};

export default useReportList;