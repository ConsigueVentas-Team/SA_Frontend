import { useEffect, useState } from "react";
import { Submit } from "../../../../components/formulario";
import Tabla from "../../../../components/formulario/Tabla";
import { AES, enc } from "crypto-js";
import Input from "../../../../components/formulario/Input";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";

import AgregarDato from "../../../../components/formulario/Helpers/hooks/AgregarDato";
import EliminarDato from "../../../../components/formulario/Helpers/hooks/EliminarDato";
import ActualizarDato from "../../../../components/formulario/Helpers/hooks/ActualizarDato";
import ObtenerDatos from "../../../../components/formulario/Helpers/hooks/ObtenerDatos";
import ActiveLastBreadcrumb from "../../../../components/formulario/Helpers/Seed";
export const Departamento = () => {
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  const [Departamentos, setDepartamentos] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [valueDefault, setValueDefault] = useState("");
  const [idEliminar, setIdEliminar] = useState("");
  const [palabra, setPalabra] = useState("");
  const [idActualizar, setIdActualizar] = useState("");
  const [MostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [MostrarEliminarModal, setMostrarEliminarModal] = useState(false);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setCargando(false);
    async function fetchData() {
      const data = await ObtenerDatos(token, "departments", setCargando);
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
    setPalabra("");
  };

  if (Departamentos === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
  }

  return (
    <>
      {Departamentos && (
        <div className="w-full">
          <ActiveLastBreadcrumb actual={"departamento"}></ActiveLastBreadcrumb>
          {MostrarEditarModal && (
            <ModalBox
              holder={"Departamento"}
              valueDefault={valueDefault}
              title={"edite departamento"}
              label={"Departamento: "}
              cerrarEditarModal={cerrarEditarModal}
              cargando={cargando}
              actualizarDepartamento={(valor) => {
                setCargando(true);
                ActualizarDato(
                  token,
                  valor,
                  "departments",
                  idActualizar,
                  "false",
                  "false",
                  setIsChecked,
                  setCargando
                );
              }}
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
            <div className="flex gap-8 w-10/12 sm:items-center flex-col sm:flex-row items-start ">
              <Input
                valor={palabra}
                actualizarValor={setPalabra}
                label={"Departamento"}
                textoHolder={"Ingresa departamento"}
              ></Input>
            </div>
            <Submit></Submit>
          </form>
          {cargando ? (
            <Tabla
              data={Departamentos}
              abrirEliminarModal={abrirEliminarModal}
              abrirEditarModal={abrirEditarModal}
            ></Tabla>
          ) : (
            <div className="w-full h-96 flex justify-center items-center ">
              <Loading></Loading>
            </div>
          )}
        </div>
      )}
    </>
  );
};
