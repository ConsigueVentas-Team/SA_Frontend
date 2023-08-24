import PropTypes from 'prop-types';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from '@mui/icons-material/Close';
import { InputText, Select } from './ModalElements';
import { useState } from 'react';

export const ModalAgregar = ({ close }) => {

  const departamentOptions = [
    { value: 'Administrativo', label: 'Administrativo' },
    { value: 'Comercial', label: 'Comercial' },
    { value: 'Operativo', label: 'Operativo' },
  ];

  const [departament, setDepartament] = useState('Hola')
  const handleDepartamentChange = (e) => {
    const selectedDepartament = e.target.value;
    setDepartament(selectedDepartament);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen overflow-y-auto p-2.5 md:py-4 flex flex-col items-center justify-center bg-cv-secondary/50">
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b border-cv-primary rounded-t">
              <h3 className="text-xl font-semibold text-cv-primary inline-flex items-center gap-2">
                <PersonAddIcon />
                Agregar Colaborador
              </h3>
              <button type="button" onClick={close} className="text-cv-secondary bg-transparent hover:bg-cv-primary hover:text-cv-cyan rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center active:scale-95 ease-in-out duration-300">
                <CloseIcon sx={{ fontSize: 32 }} />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="relative p-2 md:p-6 flex-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full flex flex-col space-y-1">
                  <InputText
                    label="Nombres completos"
                    type="text"
                    id="names"
                  // value={name}
                  // onChange={handleNameChange}
                  />
                  <InputText
                    label="Apellidos completos"
                    type="text"
                    id="surnames"
                  // value={name}
                  // onChange={handleNameChange}
                  />
                  <InputText
                    label="DNI"
                    type="number"
                    id="dni"
                  // value={name}
                  // onChange={handleNameChange}
                  />
                  <InputText
                    label="Fecha de nacimiento"
                    type="date"
                    id="birthday"
                  // value={name}
                  // onChange={handleNameChange}
                  />
                  <InputText
                    label="Correo electrónico"
                    type="email"
                    id="email"
                  // value={name}
                  // onChange={handleNameChange}
                  />
                  <InputText
                    label="Teléfono"
                    type="tel"
                    id="telephone"
                  // value={name}
                  // onChange={handleNameChange}
                  />
                </div>
                <div className="w-full flex flex-col space-y-1">
                  <Select
                    label="Departamento"
                    id="departament"
                    value={departament}
                    options={departamentOptions}
                    onChange={handleDepartamentChange}
                  />
                  <Select
                    label="núcleo"
                    id="departament"
                    value={departament}
                    options={departamentOptions}
                    onChange={handleDepartamentChange}
                  />
                  <Select
                    label="Perfil"
                    id="departament"
                    value={departament}
                    options={departamentOptions}
                    onChange={handleDepartamentChange}
                  />
                  <Select
                    label="Turno"
                    id="departament"
                    value={departament}
                    options={departamentOptions}
                    onChange={handleDepartamentChange}
                  />
                  <InputText
                    label="Fecha de ingreso"
                    type="date"
                    id="date_entry"
                  // value={name}
                  // onChange={handleNameChange}
                  />
                  <InputText
                    label="Fecha de finalización"
                    type="date"
                    id="date_finalization"
                  // value={name}
                  // onChange={handleNameChange}
                  />
                </div>

              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-cv-primary rounded-b gap-2 md:gap-4">
              <button
                className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl font-semibold uppercase active:scale-95 ease-in-out duration-300"
                type="button"
                onClick={close}
              >
                Cancelar
              </button>
              <button type="button" className="w-full py-2 px-8 rounded-md text-white bg-cv-primary border-2 border-cv-primary flex items-center justify-center text-xl uppercase active:scale-95 ease-in-out duration-300"
              // onClick={handleSubmit}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ModalAgregar.propTypes = {
  close: PropTypes.func.isRequired,
}
