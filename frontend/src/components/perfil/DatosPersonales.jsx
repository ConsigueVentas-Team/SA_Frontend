import React from "react";
import moment from "moment/moment";
import { CajaDatos } from "./CajaDatos/CajaDatos";
export const DatosPersonales = ({ colaborador }) => {
  return (
    <div className="col-span-1 md:col-span-3 row-span-5 bg-cv-primary rounded-2xl p-5 order-2 md:order-1">
      <h2 className="text-xl mb-5 font-semibold text-center uppercase">
        Datos Personales
      </h2>
      <div className="space-y-5">
        <CajaDatos
          label={"Nombres completos:"}
          estilos={"text-base md:text-xl font-semibold leading-tight"}
          colaborador={
            colaborador.Usuario[0].user[0].name +
            " " +
            colaborador.Usuario[0].user[0].surname
          }
        ></CajaDatos>
        <div className="w-full flex items-center justify-center gap-5">
          <CajaDatos
            label={"DNI:"}
            estilos={"text-base md:text-xl font-semibold leading-tight"}
            colaborador={colaborador.Usuario && colaborador.Usuario[0].dni}
          ></CajaDatos>
          <CajaDatos
            label={"Fecha de nacimiento:"}
            estilos={"text-base md:text-xl font-semibold leading-tight"}
            colaborador={
              colaborador.Usuario &&
              moment(colaborador.Usuario[0].birthday).format("DD/MM/YYYY")
            }
          ></CajaDatos>
          <CajaDatos
            label={"Teléfono:"}
            estilos={"text-base md:text-xl font-semibold leading-tight"}
            colaborador={colaborador.Usuario[0].cellphone}
          ></CajaDatos>
        </div>
        <CajaDatos
          label={"Correo electrónico:"}
          estilos={"text-base md:text-xl font-semibold leading-tight"}
          colaborador={colaborador.Usuario[0].user[0].email}
        ></CajaDatos>
      </div>
    </div>
  );
};
