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

export const Nucleo = () => {
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);
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
  const [idActualizar, setIdActualizar] = useState("");
  const [idDepartamento, setIdDepartamento] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await ObtenerDatos(token, "cores");
      setNucleos(data);
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
    else
      AgregarDato(
        token,
        palabra,
        "cores",
        department_id,
        "false",
        setIsChecked
      );
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
            holder={"Nucleo"}
            valueDefault={valueDefault}
            title={"edite Nucleo"}
            label={"Núcleo: "}
            cerrarEditarModal={cerrarEditarModal}
            actualizarDepartamento={(valor) =>
              ActualizarDato(
                token,
                valor,
                "cores",
                idActualizar,
                idDepartamento,
                "false",
                setIsChecked
              )
            }
            checkbox={2}
            data={Nucleos}
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
        <Tabla
          data={Nucleos}
          abrirEliminarModal={abrirEliminarModal}
          abrirEditarModal={abrirEditarModal}
          nucleo={"Núcleo"}
        ></Tabla>
      </div>
    </>
  );
};
