import React, { useEffect, useState } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import ObtenerDatos from "./Helpers/hooks/ObtenerDatos";

export const Inputs = ({ actualizarValor, valor, setDepartment_id, token }) => {
  const [filterShift, setFilterShift] = useState("Selecciona");
  const [Areas, setAreas] = useState([]);
  const [habilitar, setHabilidar] = useState(false);
  const handleFilterShiftChange = (e) => {
    const selectedValue = e.target.value;
    setFilterShift(selectedValue);
    setDepartment_id(selectedValue);
    if (selectedValue === "Selecciona") {
      actualizarValor("");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await ObtenerDatos(token, "departments");
      setAreas(data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-start w-full gap-5 sm:items-center sm:flex-col text-black ">
      <label htmlFor="names" className="block text-black w-full font-medium">
        Departamento:
      </label>      
      <div className="w-full ">
        <select
          id="filerRole"
          value={filterShift}
          onChange={handleFilterShiftChange}
          placeholder="Selecciona"
          className="w-full p-2 font-semibold bg-white rounded-md outline-none text-cv-primary drop-shadow-md sm:text-md placeholder-cv-primary"
        >
          <option>Selecciona</option>{" "}
          {/* Esta es la opción de marcador de posición */}
          {Areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full gap-4">
        <Input
          actualizarValor={actualizarValor}
          valor={valor}
          filterShift={filterShift}
          label={"Núcleo:"}
          textoHolder={"Ingresa núcleo"}
        ></Input>
      </div>
    </div>
  );
};
Inputs.propTypes = {
  valor: PropTypes.string.isRequired,
  actualizarValor: PropTypes.func.isRequired,
};
