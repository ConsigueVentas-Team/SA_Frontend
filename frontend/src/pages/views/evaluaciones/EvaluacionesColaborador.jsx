import TablaNotas from "../../../components/evaluaciones/TablaNotas";


export const EvaluacionesColaborador = () => {
  // Determina si debes aplicar la escala
  const shouldApplyScale = window.innerWidth < 380 && window.innerHeight < 900;

  return (
    <div className={` ${shouldApplyScale ? 'scale-80' : ''}`}>
      {/* Sección que muestra la tabla de evaluaciones */}
      <TablaNotas />
    </div>
  );

};
