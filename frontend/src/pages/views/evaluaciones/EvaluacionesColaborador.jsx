// import TablaNotas from "../../../components/evaluaciones/TablaNotas";

import { useParams } from 'react-router-dom';

export const EvaluacionesColaborador = () => {
  const { id } = useParams();


  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
};