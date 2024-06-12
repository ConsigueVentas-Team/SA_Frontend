import { useEffect, useState } from "react";
import { Submit, Inputs } from "../../../../components/formulario";
import { AES, enc } from "crypto-js";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";
import AgregarDato from "../../../../components/formulario/Helpers/hooks/AgregarDato";
import EliminarDato from "../../../../components/formulario/Helpers/hooks/EliminarDato";
import ActualizarDato from "../../../../components/formulario/Helpers/hooks/ActualizarDato";
import ActiveLastBreadcrumb from "../../../../components/formulario/Helpers/Seed";
import CustomTable from "../../../../components/formulario/CustomTable";
import { getTotalData } from "../../../../services/getTotalData";
import MessageNotFound from "../../../../components/MessageNotFound";
import { ACTIONSTATE } from "../../../../components/notificaciones/states/actionState";
import AlertMessage from "../../../../components/AlertMessage";
import { Alert } from "@mui/material";

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
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [isCreateDone, setIsCreateDone] = useState("");
  const [isUpdateDone, setIsUpdateDone] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {    
    fetchData();
  }, [isChecked]);
  
  async function fetchData() {
    const data = await getTotalData("cores", setLoading);
    const department = await getTotalData("departments", setLoading);

    setNucleos(data);
    setDepartments(department);
  }
  
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
    if (palabra == "") return setIsEmpty(true);
    setIsEmpty(false)
    setLoading(true);
    AgregarDato(
      token,
      palabra,
      "cores",
      department_id,
      "false",
      setIsChecked
    ).then(() => {
      setPalabra("");
      setLoading(false);
      setIsCreateDone(ACTIONSTATE.SUCCESSFUL)
      setMostrarModal(false);
    }).catch(setIsCreateDone(ACTIONSTATE.ERROR))
  };

  const openModal = () => {
    setMostrarModal(true);
  };

  const closeModal = () => {
    setMostrarModal(false);
  };

  if (Nucleos === null) {
    // Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
    return <Loading></Loading>;
  }

  const updateData = async (valor, area, Departamento)=>{
    try {      
      await ActualizarDato(
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
      setIsUpdateDone(ACTIONSTATE.SUCCESSFUL)
    }catch {
      setIsUpdateDone(ACTIONSTATE.ERROR)
    }
  }

  return (
    <>
      <div className="w-full">
        <ActiveLastBreadcrumb actual={"nucleo"}></ActiveLastBreadcrumb>
        {MostrarEditarModal && (
          <ModalBox
            holder={"Nucleo"}
            valueDefault={valueDefault}
            title={"edite Nucleo"}
            label={"Núcleo: "}
            cerrarEditarModal={cerrarEditarModal}
            actualizarDepartamento={(valor, area, Departamento) =>
              updateData(                
                valor,                                                                
                area,
                Departamento
              )
            }            
            data={Nucleos}
            IdArea={idDepartamento}
            idDepartamento={idDepartamento}                        
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

        <button onClick={openModal} className="w-50 py-2 px-5 mt-10 rounded-md text-cv-primary text-white bg-cv-primary flex items-center justify-center text-l font-semibold">AGREGAR</button>
        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="modal w-[400px] max-w-2xl mx-auto bg-white px-5 py-5 pb-6 rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <form
                className="w-full flex justify-center gap-5 flex-col md:flex-col items-center "
                onSubmit={manejarEnvio}
              >
                <h2 className="font-medium text-2xl text-black">Agregar</h2>
                <hr className="w-full border-gray-300"/>
                <div className="w-50 flex w-full flex-col sm:flex-row items-start">                  
                  <Inputs
                    valor={palabra}
                    actualizarValor={setPalabra}
                    setDepartment_id={setDepartment_id}
                    token={token}
                  ></Inputs>
                </div>
                {
                  isEmpty && <Alert severity="error">Completa los campos</Alert>
                }
                <hr className=" border-gray-300 my-1 w-full"/>
                <div className="flex justify-center gap-4">
                  <Submit></Submit>
                  <button onClick={closeModal} className="w-50 py-1 px-5 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-l font-semibold uppercase active:scale-95 ease-in-out duration-300">Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <AlertMessage open={isCreateDone === ACTIONSTATE.SUCCESSFUL} setOpen={setIsCreateDone} text='El núcleo ha sido creado correctamente' type='success'/>          
        <AlertMessage open={isCreateDone === ACTIONSTATE.ERROR} setOpen={setIsCreateDone} text='Error al crear núcleo' type='warning'/>          

        <AlertMessage open={isUpdateDone === ACTIONSTATE.SUCCESSFUL} setOpen={setIsUpdateDone} text='El núcleo ha sido modificado correctamente' type='success'/>          
        <AlertMessage open={isUpdateDone === ACTIONSTATE.ERROR} setOpen={setIsUpdateDone} text='Error al modificar el núcleo' type='warning'/>          
        {loading ? <Loading /> : (
            Nucleos.length > 0 ?
              <CustomTable
                data={Nucleos}
                abrirEliminarModal={abrirEliminarModal}
                abrirEditarModal={abrirEditarModal}
                nucleo={"Núcleo"}
              />
              :
              <MessageNotFound/>
        )}
      </div >
    </>
  );
};
