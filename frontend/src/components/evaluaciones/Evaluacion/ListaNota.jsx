import { useEffect, useState } from "react";
import { useEvaluationApi } from "../hooks/EvaluationApi";

function ListaNotas({ filters }) {
  const { notas, isLoading: apiIsLoading } = useEvaluationApi(filters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(apiIsLoading);
  }, [apiIsLoading]);

  useEffect(() => {
    console.log("notassssssss:", notas);
    setIsLoading(false);
  }, [notas]);

  return (
    <div>
      <h1>Notas de Evaluación</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {notas && notas.length > 0 ? (
            notas.map((nota) => (
              <li key={nota.id}>
                ID: {nota.id}
                <br />
                User ID: {nota.user_id}
                <br />
                Tipo de Evaluación: {nota.evaluation_type ? nota.evaluation_type.name : "N/A"}
                <br />
                Fecha: {nota.date}
              </li>
            ))
          ) : (
            <li>No hay notas disponibles.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default ListaNotas;