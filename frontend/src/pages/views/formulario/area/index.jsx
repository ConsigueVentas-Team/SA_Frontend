import React, { useEffect, useState } from "react";
import { Submit, InputArea } from "../../../../components/formulario";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";
import Tabla from "../../../../components/formulario/Tabla";
import { AES, enc } from "crypto-js";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
import ObtenerDatos from "../../../../components/formulario/Helpers/hooks/ObtenerDatos";
import AgregarDato from "../../../../components/formulario/Helpers/hooks/AgregarDato";
import EliminarDato from "../../../../components/formulario/Helpers/hooks/EliminarDato";
import ActualizarDato from "../../../../components/formulario/Helpers/hooks/ActualizarDato";
import ActiveLastBreadcrumb from "../../../../components/formulario/Helpers/Seed";

export const Area = () => {
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);
  const [Position, setPosition] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [department_id, setDepartment_id] = useState("");
  const [coreId, setCoreId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [idEliminar, setIdEliminar] = useState("");
  const [palabra, setPalabra] = useState("");
  const [idActualizar, setIdActualizar] = useState("");
  const [MostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [MostrarEliminarModal, setMostrarEliminarModal] = useState(false);
  const [valueDefault, setValueDefault] = useState("");
  const [idDepartamento, setIdDepartamento] = useState("");
  const [idArea, setIdArea] = useState("");
  const [cores, setCores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCargando(false);
    async function fetchData() {
      const data = await ObtenerDatos(token, "position", setCargando);
      const department = await ObtenerDatos(token, "departments", setCargando);
      const core = await ObtenerDatos(token, "cores", setCargando);
      setCores(core);
      setPosition(data);
      setDepartments(department);
    }
    fetchData();
  }, [isChecked]);

  const abrirEditarModal = (departamento) => {
    setMostrarEditarModal(true);
    setValueDefault(departamento.name);
    setIdActualizar(departamento.id);
    setIdDepartamento(departamento.core.department.id);
    setIdArea(departamento.core.id);
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
    if (palabra === "") return;
    setLoading(true);
    AgregarDato(
      token,
      palabra,
      "position",
      department_id,
      coreId,
      setIsChecked
    ).then(() => {
      setPalabra("");
      setLoading(false);
    });
  };

  const openModal = () => {
    setMostrarModal(true);
  };

  const closeModal = () => {
    setMostrarModal(false);
  };

  if (Position === null) {
    return <Loading />;
  }

  return (
    <>
      <ActiveLastBreadcrumb actual={"perfil"}></ActiveLastBreadcrumb>
      <div className="w-full ">
        {MostrarEditarModal && (
          <ModalBox
            holder={"Rol"}
            valueDefault={valueDefault}
            title={"edite perfil"}
            label={"Perfil: "}
            actualizarDepartamento={(valor, area, Departamento) =>
              ActualizarDato(
                token,
                valor,
                "position",
                idActualizar,
                idDepartamento,
                idArea,
                setIsChecked,
                area,
                Departamento
              )
            }
            cerrarEditarModal={cerrarEditarModal}
            checkbox={3}
            departments={departments}
            cores={cores}
            idDepartamento={idDepartamento}
            IdArea={idArea}
          ></ModalBox>
        )}
        {MostrarEliminarModal && (
          <ModalBoxEliminar
            title={"Estás seguro?"}
            eliminarDepartamento={() =>
              EliminarDato(token, idEliminar, "position", setIsChecked)
            }
            cerrarEliminarModal={cerrarEliminarModal}
          ></ModalBoxEliminar>
        )}

        <button onClick={openModal} className="w-50 py-2 px-5 mt-10 rounded-md text-cv-primary text-white bg-cv-primary flex items-center justify-center text-l font-semibold">AGREGAR</button>
        {mostrarModal && (
          <div className="modal w-80 mx-auto bg-white p-4 rounded-lg shadow-md">
            <form onSubmit={manejarEnvio}>
              <div className="w-50 sm:items-center flex flex-col sm:flex-row items-start">
                <InputArea
                  valor={palabra}
                  actualizarValor={setPalabra}
                  setDepartment_id={setDepartment_id}
                  setCoreId={setCoreId}
                  token={token}
                ></InputArea>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <Submit></Submit>
                <button onClick={closeModal} className="w-50 py-1 px-5 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-l font-semibold uppercase active:scale-95 ease-in-out duration-300">Cerrar</button>
              </div>
            </form>
          </div>
        )}

        {loading ? <Loading /> : (
          <Tabla
            data={Position}
            abrirEliminarModal={abrirEliminarModal}
            abrirEditarModal={abrirEditarModal}
            nucleo={"Núcleo"}
            perfil={"Perfil"}
          ></Tabla>
        )}
      </div>
    </>
  );
};
