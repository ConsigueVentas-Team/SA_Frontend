import { useState } from "react";
import Input from "./Input";
import { Alert } from "@mui/material";

const ModalBox = ({
  holder,
  valueDefault,
  title,
  label,
  cerrarEditarModal,
  actualizarDepartamento,  
  idDepartamento,
  IdArea  
}) => {
  const [palabra, setPalabra] = useState(valueDefault);
  const [isShort, setIsShort] = useState(false);

  const enviarDatos = () => {
    if(palabra === '' || palabra === valueDefault) return setIsShort(true);
    cerrarEditarModal(false);
    actualizarDepartamento(palabra, IdArea, idDepartamento);
  };  

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto   ">
      <div className=" fixed top-0 left-0 z-50  overflow-x-hidden overflow-y-auto scale-90 w-full h-full items-center flex justify-center sm:scale-95  ">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-w-lg bg-white outline-none  p-2 md:p-0">
          <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-lg md:text-2xl font-semibold uppercase text-black">
              {title}
            </h3>
          </div>
          <div className="relative p-2 md:p-6 flex-auto space-y-4">                        
            <div className="w-full flex flex-col space-y-1">
              <Input
                label={label}
                textoHolder={holder}
                colorLetter={"text-black"}
                valor={palabra}
                actualizarValor={setPalabra}
              ></Input>
            </div>
            <p className="text-red-500 font-semibold"></p>
            {isShort &&
              <Alert className="w-fit mx-auto" variant="outlined" severity="error">
                Completa los campos                
              </Alert>
            }
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-slate-200 rounded-b gap-2 md:gap-4">
            <button
              className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-md font-semibold uppercase active:scale-95 ease-in-out duration-300"
              type="button"
              onClick={() => cerrarEditarModal(false)}
            >
              Cancelar
            </button>
            <button
              className="w-full py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-md uppercase active:scale-95 ease-in-out duration-300"
              type="button"
              onClick={enviarDatos}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
    </div>
  );
};

export default ModalBox;
