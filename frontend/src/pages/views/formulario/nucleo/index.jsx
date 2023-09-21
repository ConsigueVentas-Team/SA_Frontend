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
import ActualizarDato from "../../../../components/formulario/Helpers/hooks/ActualizarDato";
import ActiveLastBreadcrumb from "../../../../components/formulario/Helpers/Seed";
export const Nucleo = () => {
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);
  const [Nucleos, setNucleos] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [valueDefault, setValueDefault] = useState("");
  const [departments, setDepartments] = useState([]);

  const [idEliminar, setIdEliminar] = useState("");
  const [palabra, setPalabra] = useState("");
  const [department_id, setDepartment_id] = useState("");
  const [MostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [MostrarEliminarModal, setMostrarEliminarModal] = useState(false);
  const [idActualizar, setIdActualizar] = useState("");
  const [idDepartamento, setIdDepartamento] = useState("");
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setCargando(false);
    async function fetchData() {
      const data = await ObtenerDatos(token, "cores", setCargando);
      const department = await ObtenerDatos(token, "departments", setCargando);

      setNucleos(data);
      setDepartments(department);
    }
    fetchData();
  }, [isChecked]);

  const abrirEditarModal = (departamento) => {
    setMostrarEditarModal(true);
    setValueDefault(departamento.name);
    setIdActualizar(departamento.id);
    setIdDepartamento(departamento.department_id);
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
        "cores",
        department_id,
        "false",
        setIsChecked
      );
    }
    setPalabra("");
  };

  if (Nucleos === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="w-full ">
        <ActiveLastBreadcrumb actual={"nucleo"}></ActiveLastBreadcrumb>
        {MostrarEditarModal && (
          <ModalBox
            holder={"Nucleo"}
            valueDefault={valueDefault}
            title={"edite Nucleo"}
            label={"Núcleo: "}
            cerrarEditarModal={cerrarEditarModal}
            actualizarDepartamento={(valor, area, Departamento) =>
              ActualizarDato(
                token,
                valor,
                "cores",
                idActualizar,
                idDepartamento,
                "false",
                setIsChecked,
                area,
                Departamento
              )
            }
            checkbox={2}
            data={Nucleos}
            IdArea={idDepartamento}
            idDepartamento={idDepartamento}
            departments={departments}
          ></ModalBox>
        )}
        {MostrarEliminarModal && (
          <ModalBoxEliminar
            title={"Estás seguro?"}
            eliminarDepartamento={() =>
              EliminarDato(token, idEliminar, "cores", setIsChecked)
            }
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
            token={token}
          ></Inputs>

          <Submit></Submit>
        </form>
        {cargando ? (
          <Tabla
            data={Nucleos}
            abrirEliminarModal={abrirEliminarModal}
            abrirEditarModal={abrirEditarModal}
            nucleo={"Núcleo"}
          ></Tabla>
        ) : (
          <div className="w-full h-96 flex justify-center items-center ">
            <Loading></Loading>
          </div>
        )}
      </div>
    </>
  );
};
