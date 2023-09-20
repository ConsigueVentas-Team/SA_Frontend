import PropTypes from "prop-types";
import { CajaDatos } from "./CajaDatos/CajaDatos";

export const DatosEmpresa = ({ colaborador }) => {
  const colaboradorInfo = [
    {
      label: "Departamento:",
      value: colaborador && colaborador.usuario.position[0].core.department.name,
    },
    {
      label: "Núcleo:",
      value: colaborador && colaborador.usuario.position[0].core.name,
    },
    {
      label: "Perfil:",
      value: colaborador && colaborador.usuario.position[0].name,
    },
    {
      label: "Rol:",
      value: colaborador.usuario.roles[0].name,
    },
    {
      label: "Fecha de ingreso:",
      value: colaborador && colaborador.usuario.date_start,
    },
    {
      label: "Fecha de salida:",
      value: colaborador.usuario.date_end,
    },
    {
      label: "Turno:",
      value: colaborador && colaborador.usuario.shift,
    },
    {
      label: "Estado:",
      value: colaborador.usuario.status === 1 ? "Activo" : "Inactivo",
    },
  ];

  const chunkSize = 2;
  const chunks = [];
  for (let i = 0; i < colaboradorInfo.length; i += chunkSize) {
    chunks.push(colaboradorInfo.slice(i, i + chunkSize));
  }

  return (
    <div className="order-3 col-span-1 row-span-3 p-5 md:col-span-3 md:row-start-6 bg-cv-primary rounded-2xl md:order-3">
      <h2 className="mb-5 text-xl font-semibold text-center uppercase">
        Datos de la empresa
      </h2>
      <div className="space-y-5">
        {chunks.map((chunk, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full gap-5"
          >
            {chunk.map((info) => (
              <CajaDatos
                key={info.label}
                label={info.label}
                estilos={"text-base md:text-lg font-semibold leading-tight"}
                colaborador={info.value}
              ></CajaDatos>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

DatosEmpresa.propTypes = {
  colaborador: PropTypes.object.isRequired,
};
