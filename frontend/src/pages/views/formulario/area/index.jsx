import { useEffect, useState } from "react";
import { Submit, InputArea } from "../../../../components/formulario";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";
import Tabla from "../../../../components/formulario/Tabla";
import { AES, enc } from "crypto-js";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
import ObtenerDatos from "../../../../components/formulario/Helpers/hooks/ObtenerDatos";
import AgregarDato from "../../../../components/formulario/Helpers/hooks/AgregarDato";
import EliminarDato from "../../../../components/formulario/Helpers/hooks/EliminarDato";
export const Area = () => {
  const [Position, setPosition] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [department_id, setDepartment_id] = useState("");
  const [coreId, setCoreId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterShift, setFilterShift] = useState("");
  const [idEliminar, setIdEliminar] = useState("");
  const [palabra, setPalabra] = useState("");
  const [idActualizar, setIdActualizar] = useState("");
  const [MostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [MostrarEliminarModal, setMostrarEliminarModal] = useState(false);
  // const tokenD = AES.decrypt(
  //   localStorage.getItem("token"),
  //   import.meta.env.VITE_TOKEN_KEY
  // );
  // const token = tokenD.toString(enc.Utf8);

  ObtenerDatos("position", setPosition);

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
    AgregarDato(palabra, "position", department_id, coreId);
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

  if (Position === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="w-full ">
        {MostrarEditarModal && (
          <ModalBox
            holder={"Area"}
            valueDefault={"FrontEnd"}
            title={"edite Area"}
            label={"Area: "}
            cerrarEditarModal={cerrarEditarModal}
          ></ModalBox>
        )}
        {MostrarEliminarModal && (
          <ModalBoxEliminar
            title={"Estás seguro?"}
            eliminarDepartamento={() => EliminarDato(idEliminar, "position")}
            cerrarEliminarModal={cerrarEliminarModal}
          ></ModalBoxEliminar>
        )}
        <form
          className="w-full flex justify-center gap-11 flex-col md:flex-row  mt-7 items-center "
          onSubmit={manejarEnvio}
        >
          <InputArea
            valor={palabra}
            actualizarValor={setPalabra}
            setDepartment_id={setDepartment_id}
            setCoreId={setCoreId}
          ></InputArea>
          <Submit></Submit>
        </form>
        <Tabla
          data={Position}
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
