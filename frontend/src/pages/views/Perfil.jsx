import {
  DatosAsistencia,
  DatosEmpresa,
  DatosPersonales,
  FotoPerfil,
} from "../../components/perfil";

import { React, useState, useEffect } from "react";

import { AES, enc } from "crypto-js";

export const Perfil = () => {
  const [colaborador, setColaborador] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenD = AES.decrypt(
          localStorage.getItem("token"),
          import.meta.env.VITE_TOKEN_KEY
        );
        const token = tokenD.toString(enc.Utf8);
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setColaborador(data);

          console.log(data.Usuario.user);
          console.log(data.Usuario.user);
          setIsChecked(data?.Usuario[0]?.user[0]?.status === 1);
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

  return (
    <>
      {colaborador && colaborador.Usuario && colaborador.Usuario[0] && (
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-8 gap-4 text-white ">
          <DatosPersonales
            colaborador={colaborador}
            isChecked={isChecked}
          ></DatosPersonales>
          <FotoPerfil colaborador={colaborador}></FotoPerfil>

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
