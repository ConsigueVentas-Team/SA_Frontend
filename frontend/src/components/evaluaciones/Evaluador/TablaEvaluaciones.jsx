import React, { useState, useEffect } from "react";

const TablaEvaluaciones = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [numFilas, setNumFilas] = useState(0);
    const fechaActual = new Date();


    const obtenerNombreDelMes = (fecha) => {
        const meses = [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE",
        ];
        return meses[fecha.getMonth()];
    };
    
    const mesActual = obtenerNombreDelMes(fechaActual);



    const agregarFila = () => {
        setNumFilas(numFilas + 1);
    };

    const renderTabla = () => {
        if (mostrarTabla) {
            return (
                <table className="w-full text-sm text-center text-white">
                    <thead>
                        <tr>
                            <th colSpan="6" className="px-6 py-4 whitespace-nowrap text-base uppercase">EVALUACIONES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-cv-primary">
                        <tr className="border-b border-cv-secondary">
                            <td className="px-6 py-4 whitespace-nowrap">MES</td>
                            <td className="px-6 py-4 whitespace-nowrap">HABILIDAD 1</td>
                            <td className="px-6 py-4 whitespace-nowrap">HABILIDAD 2</td>
                            <td className="px-6 py-4 whitespace-nowrap">HABILIDAD 3</td>
                            <td className="px-6 py-4 whitespace-nowrap">HABILIDAD 4</td>
                            <td className="px-6 py-4 whitespace-nowrap">PROMEDIO</td>
                        </tr>
                        <tr className="border-b border-cv-secondary">
                            <td className="px-6 py-4 whitespace-nowrap">{`${mesActual}`}</td>
                            <td className="px-6 py-4 whitespace-nowrap"></td>
                            <td className="px-6 py-4 whitespace-nowrap"></td>
                            <td className="px-6 py-4 whitespace-nowrap"></td>
                            <td className="px-6 py-4 whitespace-nowrap"></td>
                            <td className="px-6 py-4 whitespace-nowrap"></td>
                        </tr>
                        {renderFilasDeHabilidades()}
                        <tr className="border-b border-cv-secondary">
                            <td colSpan="6" className="px-6 py-4 whitespace-nowrap">
                                <button className="uppercase" onClick={agregarFila}>Agregar Evaluación +</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        } else {
            return (
                <table className="w-full text-sm text-center text-white">
                    <thead>
                        <tr>
                            <th colSpan="6" className="px-6 py-4 whitespace-nowrap text-base uppercase">EVALUACIONES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-cv-primary">
                        <tr>
                            <td colSpan="6" className="px-6 py-4 whitespace-nowrap">
                                <button className="uppercase" onClick={() => setMostrarTabla(true)}>
                                    Agregar Evaluación +
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    };

    const renderFilasDeHabilidades = () => {
        const filas = [];
        for (let i = 0; i < numFilas; i++) {
            filas.push(
                <tr key={i} className="border-b border-cv-secondary">
                    <td className="px-6 py-4 whitespace-nowrap">{`${mesActual}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                </tr>
            );
        }
        return filas;
    };

    return <div className="w-full bg-[#0e161b] shadow-md rounded-t overflow-hidden overflow-x-auto scrollbar">{renderTabla()}</div>;
};

export default TablaEvaluaciones;
