import { useEffect, useState } from "react";
import { Submit } from "../../../../components/formulario";
import Tabla from "../../../../components/formulario/Tabla";
import { AES, enc } from "crypto-js";
import Input from "../../../../components/formulario/Input";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";
// import {ObtenerDatos,EliminarDato,AgregarDato,} from "../../../../components/formulario/Helpers/hooks"
import ObtenerDatos from "../../../../components/formulario/Helpers/hooks/ObtenerDatos";
import AgregarDato from "../../../../components/formulario/Helpers/hooks/AgregarDato";
import EliminarDato from "../../../../components/formulario/Helpers/hooks/EliminarDato";
export const Departamento = () => {
  const [Departamentos, setDepartamentos] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [valueDefault, setValueDefault] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterShift, setFilterShift] = useState("");
  const [idEliminar, setIdEliminar] = useState("");
  const [palabra, setPalabra] = useState("");
  const [idActualizar, setIdActualizar] = useState("");
  const [MostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [MostrarEliminarModal, setMostrarEliminarModal] = useState(false);

  ObtenerDatos("departments", setDepartamentos);

  const abrirEditarModal = (name, id) => {
    setMostrarEditarModal(true);
    setValueDefault(name);
    setIdActualizar(id);
  };
  const cerrarEditarModal = () => {
    setMostrarEditarModal(false);
  };
  const abrirEliminarModal = (id) => {
    setMostrarEliminarModal(true);
    setIdEliminar(id);
  };
  const cerrarEliminarModal = () => {
    setMostrarEliminarModal(false);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    AgregarDato(
      palabra,
      "departments",
      ObtenerDatos("departments", setDepartamentos)
    );
  };

  const clearFilterDate = () => {
    setFilterDate("");
  };
  const clearFilterShift = () => {
    setFilterShift("");
  };
  const clearFilterDepartment = () => {
    setFilterDepartment("");
  };
  const clearFilterName = () => {
    setFilterName("");
  };

  if (Departamentos === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="w-full">
        {MostrarEditarModal && (
          <ModalBox
            holder={"Ui Ux"}
            valueDefault={valueDefault}
            title={"edite Nucleo"}
            label={"Núcleo: "}
            cerrarEditarModal={cerrarEditarModal}
            actualizarDepartamento={actualizarDepartamento}
          ></ModalBox>
        )}
        {MostrarEliminarModal && (
          <ModalBoxEliminar
            title={"Estás seguro?"}
            eliminarDepartamento={() => EliminarDato(idEliminar, "departments")}
            cerrarEliminarModal={cerrarEliminarModal}
          ></ModalBoxEliminar>
        )}
        <form
          className="w-full flex justify-center gap-11 flex-col md:flex-row  mt-7 items-center "
          onSubmit={manejarEnvio}
        >
          <div className="flex gap-8 w-full sm:items-center flex-col sm:flex-row items-start ">
            <Input
              valor={palabra}
              actualizarValor={setPalabra}
              label={"Departamento"}
              textoHolder={"Ingresa departamento"}
            ></Input>
          </div>

          <Submit></Submit>
        </form>
        <Tabla
          data={Departamentos}
          filterName={filterName}
          filterDepartment={filterDepartment}
          filterDate={filterDate}
          filterShift={filterShift}
          abrirEliminarModal={abrirEliminarModal}
          abrirEditarModal={abrirEditarModal}
        ></Tabla>
      </div>
    </>
  );
};
