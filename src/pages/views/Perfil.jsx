import {
  DatosAsistencia,
  DatosEmpresa,
  DatosPersonales,
  FotoPerfil,
} from "../../components/perfil";

import { useState, useEffect } from "react";

import { AES, enc } from "crypto-js";
import Loading from "../../components/essentials/Loading";

export const Perfil = () => {
  const [colaborador, setColaborador] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const userId = localStorage.getItem("iduser");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenD = AES.decrypt(
          localStorage.getItem("token"),
          import.meta.env.VITE_TOKEN_KEY
        );
        const token = tokenD.toString(enc.Utf8);
        const response = await fetch(
          import.meta.env.VITE_API_URL + `/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setColaborador(data);

          setIsChecked(true);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  if (colaborador === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
  }
  return (
    <>
      {colaborador && (
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-8 gap-4 text-white ">
          <DatosPersonales
            colaborador={colaborador}
            isChecked={isChecked}
          ></DatosPersonales>
          <FotoPerfil colaborador={colaborador}/>

          <DatosEmpresa
            colaborador={colaborador}
            isChecked={isChecked}
          ></DatosEmpresa>
          <DatosAsistencia colaborador={colaborador}></DatosAsistencia>
        </div>
      )}
    </>
  );
};
