import React from "react";

import { Link } from "react-router-dom";
import ModalBox from "../../../components/formulario/Modalbox";
const Formulario = () => {
  return (
    <div className="w-full h-full flex items-center justify-around">
      <Link
        to="departamento"
        className="w-96 h-1/2 text-sm rounded-md hover:bg-slate-500 bg-neutral-900 flex justify-center items-center gap-2 p-1.5"
      >
        <h2>Registrar departamento</h2>
      </Link>

      <Link
        to="registrar"
        className="w-96 h-1/2  text-sm rounded-md hover:bg-slate-500 bg-neutral-900  justify-center flex items-center gap-2 p-1.5"
      >
        <h2>Registrar nucleo</h2>
      </Link>
      <ModalBox
        holder={"Sistemas"}
        valueDefault={"Sistemas"}
        title={"edite Departamento"}
        label={"Departamento: "}
      ></ModalBox>
      <ModalBox
        holder={"Ui Ux"}
        valueDefault={"Diseño"}
        title={"edite Nucleo"}
        label={"Núcleo: "}
      ></ModalBox>
    </div>
  );
};

export default Formulario;
