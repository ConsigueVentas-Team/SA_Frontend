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

const tokenD = AES.decrypt(
  localStorage.getItem("token"),
  import.meta.env.VITE_TOKEN_KEY
);
const token = tokenD.toString(enc.Utf8);

export const Area = () => {
  const [Position, setPosition] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [department_id, setDepartment_id] = useState("");
  const [coreId, setCoreId] = useState("");

  const [idEliminar, setIdEliminar] = useState("");
  const [palabra, setPalabra] = useState("");
  const [idActualizar, setIdActualizar] = useState("");
  const [MostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [MostrarEliminarModal, setMostrarEliminarModal] = useState(false);
  const [valueDefault, setValueDefault] = useState("");
  const [idDepartamento, setIdDepartamento] = useState("");
  const [idArea, setIdArea] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await ObtenerDatos(token, "position");
      setPosition(data);
    }
    fetchData();
  }, [isChecked]);

  const abrirEditarModal = (departamento) => {
    setMostrarEditarModal(true);
    setValueDefault(departamento.name);
    setIdActualizar(departamento.id);
    setIdDepartamento(departamento.department_id);
    setIdArea(departamento.core_id);
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
      <div className="w-full ">
        {MostrarEditarModal && (
          <ModalBox
            holder={"Rol"}
            valueDefault={valueDefault}
            title={"edite Area"}
            label={"Area: "}
            actualizarDepartamento={(valor) =>
              ActualizarDato(
                token,
                valor,
                "position",
                idActualizar,
                idDepartamento,
                idArea,
                setIsChecked
              )
            }
            cerrarEditarModal={cerrarEditarModal}
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
        ></Tabla>
      </div>
    </>
  );
};
