import React, { useEffect, useState } from "react";
import { Submit, InputArea } from "../../../../components/formulario";
import ModalBoxEliminar from "../../../../components/formulario/ModalBoxEliminar";
import { AES, enc } from "crypto-js";
import ModalBox from "../../../../components/formulario/Modalbox";
import Loading from "../../../../components/essentials/Loading";
import AgregarDato from "../../../../components/formulario/Helpers/hooks/AgregarDato";
import EliminarDato from "../../../../components/formulario/Helpers/hooks/EliminarDato";
import ActualizarDato from "../../../../components/formulario/Helpers/hooks/ActualizarDato";
import ActiveLastBreadcrumb from "../../../../components/formulario/Helpers/Seed";
import CustomTable from "../../../../components/formulario/CustomTable";
import { getTotalData } from "../../../../services/getTotalData";
import MessageNotFound from "../../../../components/MessageNotFound";
import { ACTIONSTATE } from "../../../../components/notificaciones/states/actionState";
import AlertMessage from "../../../../components/AlertMessage";

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
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [isCreateDone, setIsCreateDone] = useState("");
  const [isUpdateDone, setIsUpdateDone] = useState("");

  useEffect(() => {    
    fetchData();    
  }, [isChecked]);
  
  async function fetchData() {      
    let data = await getTotalData("position", setLoading);
    const department = await getTotalData("departments", setLoading);
    const core = await getTotalData("cores", setLoading);
    
    setCores(core);
    setPosition(data);
    setDepartments(department);
  }

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
      setMostrarModal(false);
      setIsCreateDone(ACTIONSTATE.SUCCESSFUL)
    }).catch(      
      setIsCreateDone(ACTIONSTATE.ERROR)
    )
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

  const updateData = async (valor, area, Departamento)=>{
    try {
      await ActualizarDato(
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
      setIsUpdateDone(ACTIONSTATE.SUCCESSFUL)
    }catch {
      setIsUpdateDone(ACTIONSTATE.ERROR)
    }
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
              updateData(                
                valor,                                
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

        <button onClick={openModal} className="w-50 py-2 px-5 mt-10 rounded-md text-white bg-cv-primary flex items-center justify-center text-l font-semibold">AGREGAR</button>
        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="modal max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
          </div>
        )}
        <AlertMessage open={isCreateDone === ACTIONSTATE.SUCCESSFUL} setOpen={setIsCreateDone} text='El perfil ha sido creado correctamente' type='success'/>          
        <AlertMessage open={isCreateDone === ACTIONSTATE.ERROR} setOpen={setIsCreateDone} text='Error al crear perfil' type='warning'/>          

        <AlertMessage open={isUpdateDone === ACTIONSTATE.SUCCESSFUL} setOpen={setIsUpdateDone} text='El perfil ha sido modificado correctamente' type='success'/>          
        <AlertMessage open={isUpdateDone === ACTIONSTATE.ERROR} setOpen={setIsUpdateDone} text='Error al modificar el perfil' type='warning'/>          
        {loading ? <Loading /> : (
          Position.length > 0 ? 
            <CustomTable
              data={Position}
              abrirEliminarModal={abrirEliminarModal}
              abrirEditarModal={abrirEditarModal}
              nucleo={"Núcleo"}
              perfil={"Perfil"}
            ></CustomTable>
            :
            <MessageNotFound/>
        )}
      </div>
    </>
  );
};
