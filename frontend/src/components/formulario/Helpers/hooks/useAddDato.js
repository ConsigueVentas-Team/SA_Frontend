import { useState } from "react";
import AgregarDato from "./AgregarDato"; // Ajusta la ruta a la ubicación correcta
import ObtenerDatos from "./ObtenerDatos"; // Ajusta la ruta a la ubicación correcta

export const useAgregarYObtenerDepartamento = () => {
  const [departamentos, setDepartamentos] = useState([]);

  const agregarYObtenerDepartamento = async (nuevoDepartamento) => {
    await AgregarDato(nuevoDepartamento, "departments");
    const nuevosDatos = await ObtenerDatos("departments");
    setDepartamentos(nuevosDatos);
  };

  return [departamentos, agregarYObtenerDepartamento];
};
