import React, { useEffect, useState } from "react";
import { Submit } from "../../../../components/formulario";
import { AES, enc } from "crypto-js";
import Input from "../../../../components/formulario/Input";
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
import AlertMessage from "../../../../components/AlertMessage";
import { ACTIONSTATE } from "../../../../components/notificaciones/states/actionState";

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
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [isCreateDone, setIsCreateDone] = useState("");
  const [isUpdateDone, setIsUpdateDone] = useState("");

  useEffect(() => {                
    fetchData();    
  }, [isChecked]);

  async function fetchData() {    
    const list = await getTotalData("departments", setLoading);
    setDepartamentos(list)    
  }  

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

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    if (palabra === "") return;
    setLoading(true);

    try {
      await AgregarDato(token, palabra, "departments", "false", "false", setIsChecked);
      setPalabra("");      
      setIsCreateDone(ACTIONSTATE.SUCCESSFUL)
    } catch (error) {
      setIsCreateDone(ACTIONSTATE.ERROR);
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

  const updateData = async (valor)=>{
    try {      
      await ActualizarDato(
        token,
        valor,
        "departments",
        idActualizar,
        "false",
        "false",
        setIsChecked,
        setLoading
      );
      setIsUpdateDone(ACTIONSTATE.SUCCESSFUL);
    }
    catch {
      setIsUpdateDone(ACTIONSTATE.ERROR);
    }
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
              cargando={loading}
              actualizarDepartamento={(valor) => {
                setLoading(true);
                updateData(valor);
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

          <button onClick={openModal} className="w-50 py-2 px-5 mt-10 rounded-md text-white bg-cv-primary flex items-center justify-center text-l font-semibold">AGREGAR</button>
          {mostrarModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="modal max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={manejarEnvio}>
                  <h2 className="text-xl font-bold mb-4 text-black flex justify-center">AGREGAR DEPARTAMENTO</h2>
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
          <AlertMessage open={isCreateDone === ACTIONSTATE.SUCCESSFUL} setOpen={setIsCreateDone} text='El departamento ha sido creado correctamente' type='success'/>          
          <AlertMessage open={isCreateDone === ACTIONSTATE.ERROR} setOpen={setIsCreateDone} text='Error al crear departamento' type='warning'/>          

          <AlertMessage open={isUpdateDone === ACTIONSTATE.SUCCESSFUL} setOpen={setIsUpdateDone} text='El departamento ha sido modificado correctamente' type='success'/>          
          <AlertMessage open={isUpdateDone === ACTIONSTATE.ERROR} setOpen={setIsUpdateDone} text='Error al modificar el departamento' type='warning'/>          
          {loading ? <Loading /> : (            
            Departamentos.length > 0 ?
              <CustomTable 
                abrirEditarModal={abrirEditarModal}
                abrirEliminarModal={abrirEliminarModal} 
                data={Departamentos} 
              />
              : 
              <MessageNotFound/>
          )}
        </div>
      )}
    </>
  );
};
