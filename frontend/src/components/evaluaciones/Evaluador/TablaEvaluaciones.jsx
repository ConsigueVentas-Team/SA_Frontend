import React, { useState } from "react";
import ModalConfirmacion from "./Modals/ModalConfirmacion";
import { AES, enc } from "crypto-js";

const TablaEvaluaciones = ({ rol,id}) => {
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

  const confirmarAgregarFila = async () => {
    setNumFilas(numFilas + 1);
    setMostrarModal(false);
    if (numFilas === 0) {
      setMostrarEncabezados(true);
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const tokenKey = import.meta.env.VITE_TOKEN_KEY;

      const url = new URL(`${apiUrl}/evaluation/create`);

      const tokenD = AES.decrypt(localStorage.getItem("token"), tokenKey);
      const token = tokenD.toString(enc.Utf8);

      const data = {
        user_id: id,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al agregar evaluación: ${response.status}`);
      }

    } catch (error) {
      console.error("Error al agregar la evaluación:", error.message);
    }
  };

  const cancelarAgregarFila = () => {
    setMostrarModal(false);
  };

  const tablaClase = "w-full text-sm text-center text-white rounded-lg";
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
              colSpan={rol === "Lider Nucleo" || rol === "Gerencia" ? 5 : 6}
              className={encabezadosClase}
            >
              {rol === "Lider Nucleo" || rol === "Gerencia"
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
            (rol === "Lider Nucleo" || rol === "Gerencia") ? 3 : 4,
            mesActual
          )}
          <tr className={filaClase}>
            <td
              colSpan={rol === "Lider Nucleo" || rol === "Gerencia" ? 5 : 6}
              className={celdaClase}
            >
          <button className="uppercase" onClick={agregarFila}>
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
