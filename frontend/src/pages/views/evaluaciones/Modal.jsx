import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [notas, setNotas] = useState([null, null, null, null]);

  const handleGuardar = () => {
    // Calculate the average of the notes
    const sum = notas.reduce((acc, nota) => (nota !== null ? acc + nota : acc), 0);
    const validNotes = notas.filter((nota) => nota !== null).length;
    const promedioCalculado = validNotes === 0 ? null : sum / validNotes;

    // Set the average in the state
    setNotas(notas);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="modal max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md" style={{ margin: "50px" }}>
        <h2 className="text-xl font-bold text-center mb-4">HABILIDADES BLANDAS</h2>
        <h4 className="text-1xl font-bold text-center mb-4 text-gray-600">SETIEMBRE</h4>

        {notas.map((nota, index) => (
          <div className="mb-4 rounded-lg border border-black bg-gray-100 p-4" key={index}>
            <div className="flex items-center mb-4">
              <label className="w-1/4 text-black">Nota {index + 1}:</label>
              <input
                type="number"
                placeholder={`Nota ${index + 1}`}
                value={nota !== null ? nota : ""}
                onChange={(e) => {
                  const newNotas = [...notas];
                  newNotas[index] = e.target.value === "" ? null : parseFloat(e.target.value);
                  setNotas(newNotas);
                }}
                className="w-3/4 rounded p-2 ml-2 border border-gray-300"
              />
            </div>
          </div>
        ))}

        <p className="text-black text-right mb-4">
          Promedio: {notas.every((nota) => nota !== null) ? (notas.reduce((acc, nota) => acc + nota, 0) / 4).toFixed(2) : "N/A"}
        </p>
        <hr className="my-4 border-t border-gray-400" />
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
  );
};

export default Modal;
