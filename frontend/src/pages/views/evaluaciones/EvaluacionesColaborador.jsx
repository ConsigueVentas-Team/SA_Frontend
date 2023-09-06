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


  return (
    <>

    
      {/* Sección que muestra la tabla de evaluaciones */}
        <TablaNotas />
    </>
  );
};
