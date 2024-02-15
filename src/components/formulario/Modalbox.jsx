import { useState } from "react";
import Input from "./Input";

const ModalBox = ({
  holder,
  valueDefault,
  title,
  label,
  cerrarEditarModal,
  actualizarDepartamento,
  checkbox,
  departments,
  cores,
  idDepartamento,
  IdArea,
  cargando,
}) => {
  const [palabra, setPalabra] = useState(valueDefault);
  const enviarDatos = () => {
    cerrarEditarModal(false);
    actualizarDepartamento(palabra, area, Departamento);
  };
  const [area, setArea] = useState(IdArea);
  const [Departamento, setDepartamento] = useState(idDepartamento);

  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;

    setDepartamento(selectedValue);
  };
  const AreaShiftChange = (e) => {
    const selectedValue = e.target.value;

    setArea(selectedValue);
  };
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto   ">
      <div className=" fixed top-0 left-0 z-50  overflow-x-hidden overflow-y-auto scale-90 w-full h-full items-center flex justify-center sm:scale-95  ">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-w-lg bg-white outline-none  p-2 md:p-0">
          <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-lg md:text-3xl font-semibold uppercase text-black">
              {title}
            </h3>
          </div>
          <div className="relative p-2 md:p-6 flex-auto space-y-4">
            {checkbox > 2 && (
              <div className="">
                <label
                  htmlFor="names"
                  className="block mb-1 font-medium text-cv-primary"
                >
                  Departamento:
                </label>
                <div className="w-full ">
                  <select
                    id="filerRole"
                    value={Departamento}
                    onChange={handleDepartamentoChange}
                    placeholder="Seleccionasadas"
                    className="w-full p-2 text-cv-primary rounded-md bg-white drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                  >
                    <option>Selecciona</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {checkbox > 1 && (
              <div className="">
                <label
                  htmlFor="names"
                  className="block mb-1 font-medium text-cv-primary"
                >
                  {checkbox == 2 ? "Departamento" : "Núcleo:"}
                </label>
                <div className="w-full ">
                  <select
                    id="filerRole"
                    value={area}
                    onChange={AreaShiftChange}
                    placeholder="Selecciona"
                    className="w-full p-2 text-cv-primary rounded-md bg-white drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                  >
                    <option>Selecciona</option>

                    {cores
                      ? cores.map((core) => {
                          if (core.department_id == Departamento) {
                            return (
                              <option key={core.id} value={core.id}>
                                {core.name}
                              </option>
                            );
                          }
                        })
                      : // Aquí puedes colocar el código que deseas ejecutar cuando cores es null
                        departments.map((core) => {
                          return (
                            <option key={core.id} value={core.id}>
                              {core.name}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>
            )}
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
              onClick={() => cerrarEditarModal(false)}
            >
              Cancelar
            </button>
            <button
              className="w-full py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase active:scale-95 ease-in-out duration-300"
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
