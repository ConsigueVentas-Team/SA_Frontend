import { useEffect, useState } from "react";
import { Submit, Inputs } from "../../../../components/formulario";
import Tabla from "../../../../components/formulario/Tabla";
import { AES, enc } from "crypto-js";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";
import ObtenerDatos from "../../../../components/formulario/Helpers/hooks/ObtenerDatos";
import AgregarDato from "../../../../components/formulario/Helpers/hooks/AgregarDato";
import EliminarDato from "../../../../components/formulario/Helpers/hooks/EliminarDato";
export const Nucleo = () => {
  const [Nucleos, setNucleos] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [valueDefault, setValueDefault] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterShift, setFilterShift] = useState("");
  const [idEliminar, setIdEliminar] = useState("");
  const [palabra, setPalabra] = useState("");
  const [department_id, setDepartment_id] = useState("");
  const [MostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [MostrarEliminarModal, setMostrarEliminarModal] = useState(false);

  ObtenerDatos("cores", setNucleos);

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
    AgregarDato(palabra, "cores", department_id);
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

  if (Nucleos === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="w-full ">
        {MostrarEditarModal && (
          <ModalBox
            holder={"Ui Ux"}
            valueDefault={"Diseño"}
            title={"edite Nucleo"}
            label={"Núcleo: "}
            cerrarEditarModal={cerrarEditarModal}
          ></ModalBox>
        )}
        {MostrarEliminarModal && (
          <ModalBoxEliminar
            holder={"Ui Ux"}
            valueDefault={"Diseño"}
            title={"Estás seguro?"}
            eliminarDepartamento={() => EliminarDato(idEliminar, "cores")}
            cerrarEliminarModal={cerrarEliminarModal}
          ></ModalBoxEliminar>
        )}
        <form
          className="w-full flex justify-center gap-11 flex-col md:flex-row  mt-7 items-center "
          onSubmit={manejarEnvio}
        >
          <Inputs
            valor={palabra}
            actualizarValor={setPalabra}
            setDepartment_id={setDepartment_id}
          ></Inputs>
          <Submit></Submit>
        </form>
        <Tabla
          data={Nucleos}
          filterName={filterName}
          filterDepartment={filterDepartment}
          filterDate={filterDate}
          abrirEliminarModal={abrirEliminarModal}
          abrirEditarModal={abrirEditarModal}
        ></Tabla>
      </div>
    </>
  );
};
