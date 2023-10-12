import React, { useState } from "react";
import ModalConfirmacion from "./Modals/ModalConfirmacion";

const TablaEvaluaciones = ({ rol }) => {
  const [numFilas, setNumFilas] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarEncabezados, setMostrarEncabezados] = useState(false);

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

  const fechaActual = new Date();
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
  const filaClase = "border-b border-cv-secondary ";
  const botonClase = "uppercase";
  const celdaClase = "px-6 py-4 whitespace-nowrap";

  const renderFilasDeHabilidades = (numFilas, numColumnas, mes) => {
    const filas = [];
    for (let i = 0; i < numFilas; i++) {
      const celdas = [];
      for (let j = 0; j < numColumnas; j++) {
        celdas.push(<td key={j} className={celdaClase}></td>);
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
      <ModalConfirmacion
        isOpen={mostrarModal}
        onConfirm={confirmarAgregarFila}
        onClose={cancelarAgregarFila}
      />
      <table className={tablaClase}>
        <thead>
          <tr>
            <th
              colSpan={rol == "Lider Nucleo" ? 5 : 6}
              className={encabezadosClase}
            >
              {rol == "Lider Nucleo"
                ? "EVALUACIONES LIDER"
                : "EVALUACIONES COLABORADOR"}
            </th>
          </tr>
        </thead>
        <tbody className="bg-cv-primary">
          {mostrarEncabezados && (
            <tr className={`${filaClase} bg-[#0e161b]`}>
              <td className={celdaClase}>MES</td>
              <td className={celdaClase}>HABILIDAD 1</td>
              <td className={celdaClase}>HABILIDAD 2</td>
              {rol === "Colaborador" && (
                <td className={celdaClase}>HABILIDAD 3</td>
              )}
              <td className={celdaClase}>PROMEDIO</td>
            </tr>
          )}

          {renderFilasDeHabilidades(
            numFilas,
            rol == "Lider Nucleo" ? 3 : 4,
            mesActual
          )}
          <tr className={filaClase}>
            <td colSpan={rol == "Lider Nucleo" ? 5 : 6} className={celdaClase}>
              <button className={botonClase} onClick={agregarFila}>
                Agregar Evaluación +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaEvaluaciones;
