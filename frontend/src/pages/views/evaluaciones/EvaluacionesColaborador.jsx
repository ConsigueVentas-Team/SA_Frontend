import TablaNotas from "../../../components/evaluaciones/TablaNotas";

/**
 * Componente que muestra las evaluaciones de un colaborador, incluyendo su nombre
 * y la nota final calculada desde el componente TablaNotas.
 *
 * Este componente se utiliza para visualizar las evaluaciones de un colaborador
 * y mostrar su nombre y la nota final en una tabla.
 *
 * @returns {JSX.Element} Componente de React que muestra las evaluaciones del colaborador.
 */
export const EvaluacionesColaborador = () => {
  // Obtiene el nombre del colaborador desde el almacenamiento local
  const nombre = localStorage.getItem("name") + " " + localStorage.getItem("surname");

  return (
    <>
      {/* Encabezado de la sección de evaluaciones */}
      <div className="top-[130px] left-[148px] text-[1rem] text-left pb-6">
        DETALLES DE EVALUACIÓN
      </div>

      {/* Sección que muestra el nombre y la nota final */}
      <div className="col-span-1 md:col-span-3 row-span-5 bg-cv-primary rounded-2xl p-5 order-2 md:order-1 pb-6">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <td className="font-bold text-sm text-gray-400">Nombre:</td>
              <td className="font-bold text-rigth text-sm text-gray-400">Nota Final:</td>
            </tr>
            <tr>
              {/* Muestra el nombre del colaborador */}
              <td className="text-[30px]"> {nombre} </td>
              {/* Muestra la nota final calculada desde TablaNotas */}
              <td className="text-rigth text-[30px]">{TablaNotas.sumaPromediosGenerales} </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sección que muestra la tabla de evaluaciones */}
      <div>
        <TablaNotas />
      </div>
    </>
  );
};
