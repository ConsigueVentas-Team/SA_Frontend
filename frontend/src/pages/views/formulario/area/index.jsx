import { useEffect, useState } from "react";
import { Submit, InputArea } from "../../../../components/formulario";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";
import Tabla from "../../../../components/formulario/Tabla";
import { AES, enc } from "crypto-js";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
export const Area = () => {
  const [Users, setUsers] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterShift, setFilterShift] = useState("");
  const [palabra, setPalabra] = useState("");
  const [MostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [MostrarEliminarModal, setMostrarEliminarModal] = useState(false);
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.profile);
      } else {
        console.error("Error al obtener los usuarios:", data.error);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };
  const agregarUsuario = async () => {
    try {
      const formData = new FormData();
      formData.append("name", "Luis");
      formData.append("surname", "Lucho");
      formData.append("email", "pepe@hotmail.com");
      formData.append("profile_name", "el nuevo");
      formData.append("dni", "75024261");
      formData.append("department", "Sistemas");
      formData.append("area", "Backend");
      formData.append("shift", "Mañana");
      formData.append("birthday", "2023-08-15");
      formData.append("date_start", "2023-08-15");
      formData.append("date_end", "2023-08-15"); // Corregir esta fecha si es incorrecta
      // formData.append("responsible", ""); // Agregar responsable si es necesario
      // formData.append("cellphone", ""); // Agregar número de teléfono si es necesario
      formData.append(
        "avatar",
        "http://localhost:8000/storage/1/audience-1867754_1920.jpg"
      );

      const response = await fetch(
        import.meta.env.VITE_API_URL + "/users/register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Usuario agregado exitosamente");
        obtenerUsuarios();
      } else {
        console.error("Error al guardar los datos");
        const errorText = await response.text(); // Obtener el mensaje de error del servidor
        console.error(errorText);
      }
    } catch (error) {
      console.error(`Error al agregar usuario: ${error}`);
    }
  };
  const cerrarEditarModal = () => {
    setMostrarEditarModal(false);
  };
  const abrirEditarModal = () => {
    setMostrarEditarModal(true);
  };
  const manejarEnvio = (e) => {
    e.preventDefault();
    agregarUsuario();
  };
  const abrirEliminarModal = () => {
    setMostrarEliminarModal(true);
  };
  const cerrarEliminarModal = () => {
    setMostrarEliminarModal(false);
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

  if (Users === null) {
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
            holder={"Ui Ux"}
            valueDefault={"Diseño"}
            title={"Estás seguro?"}
            cerrarEliminarModal={cerrarEliminarModal}
          ></ModalBoxEliminar>
        )}
        <form
          className="w-full flex justify-center gap-11 flex-col md:flex-row  mt-7 items-center "
          onSubmit={manejarEnvio}
        >
          <InputArea valor={palabra} actualizarValor={setPalabra}></InputArea>
          <Submit></Submit>
        </form>
        <Tabla
          data={Users.data}
          filterName={filterName}
          filterDepartment={filterDepartment}
          filterDate={filterDate}
          filterShift={filterShift}
          abrirEditarModal={abrirEditarModal}
          abrirEliminarModal={abrirEliminarModal}
        ></Tabla>
      </div>
    </>
  );
};
