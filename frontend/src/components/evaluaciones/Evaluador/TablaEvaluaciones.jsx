import { useState } from "react";
import ModalConfirmacion from "./Modals/ModalConfirmacion";

const TablaEvaluaciones = () => {
    const [numFilas1, setNumFilas1] = useState(0);
    const [mostrarModal1, setMostrarModal1] = useState(false);
    const [mostrarEncabezados1, setMostrarEncabezados1] = useState(false);

    const [numFilas2, setNumFilas2] = useState(0);
    const [mostrarModal2, setMostrarModal2] = useState(false);
    const [mostrarEncabezados2, setMostrarEncabezados2] = useState(false);

    const fechaActual = new Date();

    const obtenerNombreDelMes = (fecha) => {
        const meses = [
            "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO",
            "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
        ];
        return meses[fecha.getMonth()];
    };

    const mesActual = obtenerNombreDelMes(fechaActual);

    const agregarFila1 = () => {
        setMostrarModal1(true);
    };

    const confirmarAgregarFila1 = () => {
        setNumFilas1(numFilas1 + 1);
        setMostrarModal1(false);
        if (numFilas1 === 0) {
            setMostrarEncabezados1(true);
        }
    };

    const cancelarAgregarFila1 = () => {
        setMostrarModal1(false);
    };

    const agregarFila2 = () => {
        setMostrarModal2(true);
    };

    const confirmarAgregarFila2 = () => {
        setNumFilas2(numFilas2 + 1);
        setMostrarModal2(false);
        if (numFilas2 === 0) {
            setMostrarEncabezados2(true);
        }
    };

    const cancelarAgregarFila2 = () => {
        setMostrarModal2(false);
    };

    const tablaClase = "w-full text-sm text-center text-white";
    const encabezadosClase = "px-6 py-4 whitespace-nowrap text-base uppercase";
    const filaClase = "border-b border-cv-secondary";
    const botonClase = "uppercase";
    const celdaClase = "px-6 py-4 whitespace-nowrap";

    const renderTabla1 = () => {
        return (
            <div>
                <ModalConfirmacion
                    isOpen={mostrarModal1}
                    onConfirm={confirmarAgregarFila1}
                    onClose={cancelarAgregarFila1}
                />
                <table className={tablaClase}>
                    <thead>
                        <tr>
                            <th colSpan="5" className={encabezadosClase}>
                                EVALUACIONES COLABORADOR
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-cv-primary">
                        {mostrarEncabezados1 && (
                            <tr className={filaClase}>
                                <td className={celdaClase}>MES</td>
                                <td className={celdaClase}>HABILIDAD 1</td>
                                <td className={celdaClase}>HABILIDAD 2</td>
                                <td className={celdaClase}>HABILIDAD 3</td>
                                <td className={celdaClase}>PROMEDIO</td>
                            </tr>
                        )}
                        {renderFilasDeHabilidades(numFilas1, 4, mesActual)}
                        <tr className={filaClase}>
                            <td colSpan="5" className={celdaClase}>
                                <button className={botonClase} onClick={agregarFila1}>Agregar Evaluación +</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const renderTabla2 = () => {
        return (
            <div>
                <ModalConfirmacion
                    isOpen={mostrarModal2}
                    onConfirm={confirmarAgregarFila2}
                    onClose={cancelarAgregarFila2}
                />
                <table className={tablaClase}>
                    <thead>
                        <tr>
                            <th colSpan="4" className={encabezadosClase}>
                                EVALUACIONES LIDER
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-cv-primary">
                        {mostrarEncabezados2 && (
                            <tr className={filaClase}>
                                <td className={celdaClase}>MES</td>
                                <td className={celdaClase}>HABILIDAD 1</td>
                                <td className={celdaClase}>HABILIDAD 2</td>
                                <td className={celdaClase}>PROMEDIO</td>
                            </tr>
                        )}
                        {renderFilasDeHabilidades(numFilas2, 3, mesActual)}
                        <tr className={filaClase}>
                            <td colSpan="4" className={celdaClase}>
                                <button className={botonClase} onClick={agregarFila2}>Agregar Evaluación +</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const renderFilasDeHabilidades = (numFilas, numColumnas, mes) => {
        const filas = [];
        for (let i = 0; i < numFilas; i++) {
            const celdas = [];
            for (let j = 0; j < numColumnas; j++) {
                celdas.push(
                    <td key={j} className={celdaClase}></td>
                );
            }
            filas.push(
                <tr key={i} className={filaClase}>
                    <td className={celdaClase}>{mes}</td>
                    {celdas}
                </tr>
            );
        }
        return filas;
    };

    return (
        <div>
            <div className="w-full bg-[#0e161b] shadow-md rounded-t overflow-hidden overflow-x-auto scrollbar">
                {renderTabla1()}
            </div>

            <div className="w-full bg-[#0e161b] shadow-md rounded-t overflow-hidden overflow-x-auto scrollbar">
                {renderTabla2()}
            </div>
        </div>
    );
};

export default TablaEvaluaciones;
