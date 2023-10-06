import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [nota, setNota] = useState("");
  const [promedio, setPromedio] = useState(null);

  const handleGuardar = () => {
    const notaFloat = parseFloat(nota);
    const promedioCalculado = isNaN(notaFloat) ? null : notaFloat;
    setPromedio(promedioCalculado);
    onClose();
  };

  return (
<div
  className={`fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-black bg-opacity-50 ${
    isOpen ? "block" : "hidden"
  }`}
>
<div
  className="modal max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md"
  style={{ margin: "50px" }}
>
        <h2 className="text-xl font-bold text-center mb-4">
          HABILIDADES BLANDAS
        </h2>
        <h4 className="text-1xl font-bold text-center mb-4 text-gray-600">
          SETIEMBRE
        </h4>
        <div className="mb-4 rounded-lg border border-black bg-gray-100 p-4">
          <div className="flex items-center mb-4">
            <label className="w-1/4 text-black">Nota:</label>
            <input
              type="number"
              placeholder="Nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              className="w-3/4 rounded p-2 ml-2 border border-gray-300"
            />
          </div>
          <p className="text-black text-right mb-4">
            Promedio: {promedio !== null ? promedio.toFixed(2) : "N/A"}
          </p>
          <hr className="my-4 border-t border-gray-400" /> {/* Línea aquí */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-white border border-black text-black px-4 py-2 rounded-lg mr-2"
              style={{ backgroundColor: "#fcfcfc" }}
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#16232b" }}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
