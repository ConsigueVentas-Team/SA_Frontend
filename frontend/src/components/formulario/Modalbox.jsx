import { useState } from "react";
import Input from "./Input";

const ModalBox = ({ holder, valueDefault, title, label }) => {
  const [palabra, setPalabra] = useState(valueDefault);

  return (
    <div className="flex w-full h-full justify-around items-center">
      <div className=" z-50  overflow-x-hidden overflow-y-auto  w-full h-full items-center flex ">
        <div className=" box-content relative w-full h-auto md:w-1/2 m-auto  border-2 border-white p-1 rounded-lg rotate-[5deg]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none rotate-[-5deg] p-2 md:p-0">
            <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-lg md:text-3xl font-semibold uppercase text-black">
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
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-slate-200 rounded-b gap-2 md:gap-4">
              <button
                className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl font-semibold uppercase active:scale-95 ease-in-out duration-300"
                type="button"
              >
                Cancelar
              </button>
              <button
                className="w-full py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase active:scale-95 ease-in-out duration-300"
                type="button"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
    </div>
  );
};

export default ModalBox;
