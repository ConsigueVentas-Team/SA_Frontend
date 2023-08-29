import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
const tokenD = AES.decrypt(
  localStorage.getItem("token"),
  import.meta.env.VITE_TOKEN_KEY
);
const token = tokenD.toString(enc.Utf8);

const EnviarDepartamentos = () => {
  const [Departamentos, setDepartamentos] = useState(null);
  // let data = [];
  const ObtenerDatos = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/departments/list`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setDepartamentos(data);
    } catch (error) {
      console.error("Error al obtener los departamentos:", error);
    }
  };
  return Departamentos;
};

export default EnviarDepartamentos;
