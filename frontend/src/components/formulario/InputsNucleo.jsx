import React, { useState } from "react";
import Input from "./Input";

export const Inputs = ({ actualizarValor, valor }) => {
  const [filterShift, setFilterShift] = useState("Selecciona");

  const handleFilterShiftChange = (e) => {
    const selectedValue = e.target.value;
    setFilterShift(selectedValue);
    if (selectedValue === "Selecciona") {
      actualizarValor(""); // Reset the name when "Selecciona" is selected
    }
  };

  return (
    <div className="flex gap-8 w-full sm:items-center flex-col sm:flex-row items-start ">
      <label htmlFor="names" className="block mb-1 font-medium text-gray-300">
        Departamento
      </label>
      <div className="w-full ">
        <select
          id="filerRole"
          value={filterShift}
          onChange={handleFilterShiftChange}
          placeholder="Seleccionasadas"
          className="w-full p-2 text-cv-primary rounded-md bg-white drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
        >
          <option>Selecciona</option>{" "}
          {/* Esta es la opción de marcador de posición */}
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
        </select>
      </div>
      <div className="flex gap-8 w-full sm:items-center flex-col sm:flex-row items-start ">
        <Input
          actualizarValor={actualizarValor}
          valor={valor}
          filterShift={filterShift}
          label={"Núcleo"}
          textoHolder={"Ingresa núcleo"}
        ></Input>
      </div>
    </div>
  );
};
