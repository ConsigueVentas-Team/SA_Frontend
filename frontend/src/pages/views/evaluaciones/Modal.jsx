import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";

const Modal = ({ isOpen, onClose, idd }) => {
  const [softskills, setSoftskills] = useState("");
  const [performance, setPerformance] = useState("");
  const [autoevaluation, setAutoevaluation] = useState("");
  const [hardskills, setHardskills] = useState("");
  const [error, setError] = useState(null);

  const handleGuardar = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const tokenKey = import.meta.env.VITE_TOKEN_KEY;

      const url = new URL(`${apiUrl}/evaluation/notes/${idd}`);

      const tokenD = AES.decrypt(localStorage.getItem("token"), tokenKey);
      const token = tokenD.toString(enc.Utf8);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          softskills,
          performance,
          autoevaluation,
          hardskills,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar los datos: ${response.status}`);
      }

      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}>
      <div className="modal max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md" style={{ margin: "50px" }}>
        <h2 className=" font-bold text-center mb-4">HABILIDADES BLANDAS</h2>
        <h4 className="text-1xl font-bold text-center mb-4 text-gray-600">SETIEMBRE</h4>

        <div className="mb-4 rounded-lg border border-black bg-gray-100">
          <div className="flex items-center">
            <label className="w-1/4 text-black">ID:</label>
            <input
              type="text"
              placeholder="ID"
              value={idd}
              readOnly
              className="w-3/4 rounded p-2 ml-2 border border-gray-300"
            />
          </div>
        </div>

        <div className="mb-4 rounded-lg border border-black bg-gray-100">
          <div className="flex items-center">
            <label className="w-1/4 text-black">Nota 1:</label>
            <input
              type="number"
              placeholder="Nota 1"
              value={softskills}
              onChange={(e) => setSoftskills(e.target.value)}
              className="w-3/4 rounded p-2 ml-2 border border-gray-300"
            />
          </div>
        </div>

        <div className="mb-4 rounded-lg border border-black bg-gray-100">
          <div className="flex items-center">
            <label className="w-1/4 text-black">Nota 2:</label>
            <input
              type="number"
              placeholder="Nota 2"
              value={performance}
              onChange={(e) => setPerformance(e.target.value)}
              className="w-3/4 rounded p-2 ml-2 border border-gray-300"
            />
          </div>
        </div>

        <div className="mb-4 rounded-lg border border-black bg-gray-100">
          <div className="flex items-center">
            <label className="w-1/4 text-black">Nota 3:</label>
            <input
              type="number"
              placeholder="Nota 3"
              value={autoevaluation}
              onChange={(e) => setAutoevaluation(e.target.value)}
              className="w-3/4 rounded p-2 ml-2 border border-gray-300"
            />
          </div>
        </div>

        <div className="mb-4 rounded-lg border border-black bg-gray-100">
          <div className="flex items-center">
            <label className="w-1/4 text-black">Nota 4:</label>
            <input
              type="number"
              placeholder="Nota 4"
              value={hardskills}
              onChange={(e) => setHardskills(e.target.value)}
              className="w-3/4 rounded p-2 ml-2 border border-gray-300"
            />
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <p className="text-black text-right mb-4">
          Promedio: {((parseFloat(softskills) + parseFloat(performance) + parseFloat(autoevaluation) + parseFloat(hardskills)) / 4).toFixed(2)}
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
