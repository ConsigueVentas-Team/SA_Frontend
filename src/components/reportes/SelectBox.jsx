import { useEffect } from "react";
import { useState } from "react";

const SelectBox = ({ isActive, label, data, mostrarNucleo, valor, setSelectedValue }) => {
  const [departamento, setDepartamento] = useState(0);

  if (label === "Departamento") {
    useEffect(() => {      
      mostrarNucleo(departamento);
    }, [departamento]);
  }

  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;    
    setSelectedValue(selectedValue);
    setDepartamento(selectedValue);

    if (selectedValue === "") {
      window.location.reload();
    }
  };  

  return (
    <div className="flex gap-4 items-center w-3/12 mr-12">
      <label>{label}</label>
      <select
        value={valor}
        name=""
        id=""
        className="text-white rounded-lg pl-2 pr-1 py-1 bg-cv-primary outline-none w-96"
        disabled={isActive}
        onChange={handleDepartamentoChange}
      >
        <option value="">SELECCIONAR</option>
        {label === "Departamento" || label === "Núcleo"
          ? data.map((dato) => (
              <option value={dato.id} key={dato.id}>
                
            {dato.name.replace("Departamento", "")}
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
