// import TablaNotas from "../../../components/evaluaciones/TablaNotas";
import { useParams } from 'react-router-dom';
import Nota from '../../../components/evaluaciones/Evaluacion/Nota';

export const EvaluacionesColaborador = () => {
  // const { id } = useParams();




  return (
    <div>
      {/* <h2>{id}</h2> */}
      <Nota />
    </div>
  );
};