import { useState } from "react";
import ModalConfirmacion from "./Modals/ModalConfirmacion";

const TablaEvaluaciones = () => {
    const [numFilas, setNumFilas] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarEncabezados, setMostrarEncabezados] = useState(false);
    const fechaActual = new Date();

    const obtenerNombreDelMes = (fecha) => {
        const meses = [
            "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO",
            "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
        ];
        return meses[fecha.getMonth()];
    };

    const mesActual = obtenerNombreDelMes(fechaActual);

    const agregarFila = () => {
        setMostrarModal(true);
    };

    const confirmarAgregarFila = () => {
        setNumFilas(numFilas + 1);
        setMostrarModal(false);
        if (numFilas === 0) {
            setMostrarEncabezados(true);
        }
    };

    const cancelarAgregarFila = () => {
        setMostrarModal(false);
    };

    const tablaClase = "w-full text-sm text-center text-white";
    const encabezadosClase = "px-6 py-4 whitespace-nowrap text-base uppercase";
    const filaClase = "border-b border-cv-secondary";
    const botonClase = "uppercase";
    const celdaClase = "px-6 py-4 whitespace-nowrap";

    const renderTabla = () => {
        return (
            <div>
                <ModalConfirmacion
                    isOpen={mostrarModal}
                    onConfirm={confirmarAgregarFila}
                    onClose={cancelarAgregarFila}
                />
                <table className={tablaClase}>
                    <thead>
                        <tr>
                            <th colSpan="6" className={encabezadosClase}>
                                {mostrarEncabezados && "EVALUACIONES"}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-cv-primary">
                        {mostrarEncabezados && (
                            <tr className={filaClase}>
                                <td className={celdaClase}>MES</td>
                                <td className={celdaClase}>HABILIDAD 1</td>
                                <td className={celdaClase}>HABILIDAD 2</td>
                                <td className={celdaClase}>HABILIDAD 3</td>
                                <td className={celdaClase}>HABILIDAD 4</td>
                                <td className={celdaClase}>PROMEDIO</td>
                            </tr>
                        )}
                        {renderFilasDeHabilidades()}
                        <tr className={filaClase}>
                            <td colSpan="6" className={celdaClase}>
                                <button className={botonClase} onClick={agregarFila}>Agregar Evaluación +</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const renderFilasDeHabilidades = () => {
        const filas = [];
        for (let i = 0; i < numFilas; i++) {
            filas.push(
                <tr key={i} className={filaClase}>
                    <td className={celdaClase}>{mesActual}</td>
                    <td className={celdaClase}></td>
                    <td className={celdaClase}></td>
                    <td className={celdaClase}></td>
                    <td className={celdaClase}></td>
                    <td className={celdaClase}></td>
                </tr>
            );
        }
        return filas;
    };

    return (
        <div className="w-full bg-[#0e161b] shadow-md rounded-t overflow-hidden overflow-x-auto scrollbar">
            {renderTabla()}
        </div>
    );
};

export default TablaEvaluaciones;
