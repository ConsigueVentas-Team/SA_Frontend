import { useState } from "react";
import Input from "./Input";

export const InputArea = ({ actualizarValor, valor }) => {
  const [habilitar, setHabilitar] = useState(true);
  const [filterShift, setFilterShift] = useState("Selecciona");
  const [filterShift2, setFilterShift2] = useState("Selecciona");
  const handleFilterShiftChange = (e) => {
    const selectedValue = e.target.value;
    setFilterShift(selectedValue);
    setHabilitar(false);
    if (selectedValue === "Selecciona") {
      setHabilitar(true);
      handleFilterShift2Change(e);
    }
  };

  const handleFilterShift2Change = (e) => {
    const selectedValue = e.target.value;
    setFilterShift2(selectedValue);
    if (selectedValue === "Selecciona") {
      actualizarValor("");
    }
  };
  return (
    <div className="flex gap-4 w-full sm:items-center flex-col sm:flex-row items-start ">
      <label htmlFor="names" className="block mb-1 font-medium text-gray-300">
        Departamento
      </label>
      <div className="w-full ">
        <select
          onChange={handleFilterShiftChange}
          value={filterShift}
          id="filerRole"
          className="w-full p-2 text-cv-primary rounded-md bg-white drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
        >
          <option>Selecciona</option> <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
        </select>
      </div>
      <label htmlFor="names" className="block mb-1 font-medium text-gray-300">
        Nucleo
      </label>
      <div className="w-full ">
        <select
          disabled={habilitar}
          id="filerRole"
          value={filterShift2}
          onChange={handleFilterShift2Change}
          className="w-full p-2 text-cv-primary rounded-md bg-white drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
        >
          <option>Selecciona</option> <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
        </select>
      </div>
      <div className="flex gap-4 w-full sm:items-center flex-col sm:flex-row items-start ">
        <Input
          actualizarValor={actualizarValor}
          valor={valor}
          filterShift={filterShift2}
          label={"Area"}
          textoHolder={"Ingresa Area"}
        ></Input>
      </div>
    </div>
  );
};
