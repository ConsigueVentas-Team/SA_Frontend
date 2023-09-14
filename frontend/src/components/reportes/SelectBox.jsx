import { useEffect } from "react";
import { useState } from "react";

const SelectBox = ({ label, data, mostrarNucleo, valor, setSelectedValue }) => {
  const [departamento, setDepartamento] = useState(0);
  if (label == "Departamento") {
    useEffect(() => {
      mostrarNucleo(departamento);
    }, [departamento]);
  }
  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;
    console.log(typeof setSelectedValue);
    setSelectedValue(selectedValue);
    setDepartamento(selectedValue);
  };
  return (
    <div className="flex gap-4 items-center w-3/12">
      <label>{label}</label>
      <select
        value={valor}
        name=""
        id=""
        className="text-white rounded-lg px-2 py-1  bg-cv-primary outline-none w-96"
        onChange={handleDepartamentoChange}
      >
        <option value="">---Seleccionar---</option>
        {label == "Departamento" || label == "Núcleo"
          ? data.map((dato) => (
              <option value={dato.id} key={dato.id}>
                {dato.name}
              </option>
            ))
          : data.map((dato) => (
              <option key={dato} value={dato}>
                {dato}
              </option>
            ))}
      </select>
    </div>
  );
};

export default SelectBox;
