import { useEffect, useState } from "react";
import { Submit } from "../../../../components/formulario";
import Tabla from "../../../../components/formulario/Tabla";
import { AES, enc } from "crypto-js";
import Input from "../../../../components/formulario/Input";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";
// import {ObtenerDatos,EliminarDato,AgregarDato,} from "../../../../components/formulario/Helpers/hooks"
import AgregarDato from "../../../../components/formulario/Helpers/hooks/AgregarDato";
import EliminarDato from "../../../../components/formulario/Helpers/hooks/EliminarDato";
import ActualizarDato from "../../../../components/formulario/Helpers/hooks/ActualizarDato";
import ObtenerDatos from "../../../../components/formulario/Helpers/hooks/ObtenerDatos";

export const Departamento = () => {
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);
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

  useEffect(() => {
    async function fetchData() {
      const data = await ObtenerDatos(token, "departments");
      setDepartamentos(data);
    }
    fetchData();
  }, [isChecked]);

  const abrirEditarModal = (departamento) => {
    setMostrarEditarModal(true);
    setValueDefault(departamento.name);
    setIdActualizar(departamento.id);
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
    if (palabra == "") return;
    else {
      AgregarDato(
        token,
        palabra,
        "departments",
        "false",
        "false",
        setIsChecked
      );
    }
  };

  if (Departamentos === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
  }

  return (
    <>
      {Departamentos && (
        <div className="w-full">
          {MostrarEditarModal && (
            <ModalBox
              holder={"Departamento"}
              valueDefault={valueDefault}
              title={"edite Nucleo"}
              label={"Núcleo: "}
              cerrarEditarModal={cerrarEditarModal}
              actualizarDepartamento={(valor) =>
                ActualizarDato(
                  token,
                  valor,
                  "departments",
                  idActualizar,
                  "false",
                  "false",
                  setIsChecked
                )
              }
              checkbox={1}
            ></ModalBox>
          )}
          {MostrarEliminarModal && (
            <ModalBoxEliminar
              title={"Estás seguro?"}
              eliminarDepartamento={() =>
                EliminarDato(token, idEliminar, "departments", setIsChecked)
              }
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
      )}
    </>
  );
};
