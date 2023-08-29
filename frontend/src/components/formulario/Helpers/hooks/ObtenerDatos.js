import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
const tokenD = AES.decrypt(
  localStorage.getItem("token"),
  import.meta.env.VITE_TOKEN_KEY
);
const token = tokenD.toString(enc.Utf8);

const EnviarDatos = (url, setDepartamentos) => {
  const ObtenerDatos = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/${url}/list`,
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

  useEffect(() => {
    ObtenerDatos();
    console.log("envié datos");
  }, []);
};

export default EnviarDatos;
