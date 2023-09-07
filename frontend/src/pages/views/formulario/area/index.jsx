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
  useEffect(() => {
    async function fetchData() {
      const data = await ObtenerDatos(token, "position");
      const department = await ObtenerDatos(token, "departments");
      const core = await ObtenerDatos(token, "cores");
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
    // console.log(departamento.core_id + " nucleo");
    // console.log(departamento.core.department.id);
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
    else
      AgregarDato(
        token,
        palabra,
        "position",
        department_id,
        coreId,
        setIsChecked
      );
  };

  if (Position === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
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
        <form
          className="w-full flex justify-center gap-11 flex-col md:flex-row  mt-7 items-center "
          onSubmit={manejarEnvio}
        >
          <InputArea
            valor={palabra}
            actualizarValor={setPalabra}
            setDepartment_id={setDepartment_id}
            setCoreId={setCoreId}
            token={token}
          ></InputArea>
          <Submit></Submit>
        </form>
        <Tabla
          data={Position}
          abrirEliminarModal={abrirEliminarModal}
          abrirEditarModal={abrirEditarModal}
          nucleo={"Núcleo"}
          perfil={"Perfil"}
        ></Tabla>
      </div>
    </>
  );
};
