import { useState } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import ObtenerDatos from "./Helpers/hooks/ObtenerDatos";
export const InputArea = ({
  actualizarValor,
  valor,
  setDepartment_id,
  setCoreId,
}) => {
  const [habilitar, setHabilitar] = useState([]);
  const [filterShift, setFilterShift] = useState("Selecciona");
  const [filterShift2, setFilterShift2] = useState("Selecciona");
  const [Nucleo, setNucleo] = useState([]);
  const [Areas, setAreas] = useState([]);
  const handleFilterShiftChange = (e) => {
    const selectedValue = e.target.value;
    setFilterShift(selectedValue);
    setDepartment_id(selectedValue);
    console.log(selectedValue);
    if (selectedValue === 0) {
      actualizarValor(""); // Reset the name when "Selecciona" is selected
    }
    setHabilitar(true);
  };
  ObtenerDatos("departments", setAreas);
  ObtenerDatos("cores", setNucleo);
  const handleFilterShift2Change = (e) => {
    const selectedValue = e.target.value;
    setFilterShift2(selectedValue);
    setCoreId(selectedValue);
    console.log(selectedValue);
    if (selectedValue === 0) {
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
          <option value={0}>Selecciona</option>{" "}
          {Areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
      <label htmlFor="names" className="block mb-1 font-medium text-gray-300">
        Nucleo
      </label>
      <div className="w-full ">
        <select
          // disabled={habilitar}
          id="filerRole"
          value={filterShift2}
          onChange={handleFilterShift2Change}
          className="w-full p-2 text-cv-primary rounded-md bg-white drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
        >
          <option value={0}>Selecciona</option>{" "}
          {Nucleo.map((core) => (
            <option key={core.id} value={core.id}>
              {core.name}
            </option>
          ))}
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

InputArea.propTypes = {
  valor: PropTypes.string.isRequired,
  actualizarValor: PropTypes.func.isRequired,
};
