import React, { useEffect, useState } from "react";
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
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  

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

  const closeAlert = () => {
    setAlertMessage(false);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (palabra === "") return;
    setLoading(true);
    try {
      await AgregarDato(token, palabra, "departments", "false", "false", setIsChecked);
      setPalabra("");
      setAlertMessage(true);
    } catch (error) {
    } finally {
      setLoading(false);
      setMostrarModal(false);
    }
  };

  if (Departamentos === null) {
    return <Loading></Loading>;
  }

  const openModal = () => {
    setMostrarModal(true);
  };

  const closeModal = () => {
    setMostrarModal(false);
  };

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

          <button onClick={openModal} className="w-50 py-2 px-5 mt-10 rounded-md text-cv-primary text-white bg-cv-primary flex items-center justify-center text-l font-semibold">AGREGAR</button>
          {mostrarModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="modal max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={manejarEnvio}>
                  <div className="flex gap-12 w-12/12 sm:items-center flex-col sm:flex-row items-start text-black">
                    <Input
                      valor={palabra}
                      actualizarValor={setPalabra}
                      label={"Departamento"}
                      textoHolder={"Ingresa departamento"}
                    ></Input>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <Submit></Submit>
                    <button onClick={closeModal} className="w-50 py-1 px-5 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-l font-semibold uppercase active:scale-95 ease-in-out duration-300">Cerrar</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {alertMessage && (
            <div className="bg-green-200 border-green-400 text-green-700 border px-4 py-3 rounded relative mt-4" role="alert">
              <strong className="font-bold">¡Éxito!</strong>
              <span className="block sm:inline">El envío se ha completado con éxito.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <button onClick={closeAlert} className="text-green-700">
                  <span className="text-green-400">×</span>
                </button>
              </span>
            </div>
          )}
          {loading ? <Loading /> : (
            <Tabla
              data={Departamentos}
              abrirEliminarModal={abrirEliminarModal}
              abrirEditarModal={abrirEditarModal}
            ></Tabla>
          )}
        </div>
      )}
    </>
  );
};
