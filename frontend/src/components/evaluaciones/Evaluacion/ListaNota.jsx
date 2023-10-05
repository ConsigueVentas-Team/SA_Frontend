import { useEffect } from "react";
import { useEvaluationApi } from "../hooks/EvaluationApi";
function ListaNotas({ filters }) {
    const { notas, isLoading } = useEvaluationApi(filters);
    useEffect(() => {
        console.log("notas:", notas); // Esto imprimirá los datos de la API en la consola
    }, [notas]);


    return (
        <div>
            <h1>Notas de Evaluación</h1>
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <ul>
                    {notas.map((nota) => (
                        <>
                            <li key={nota.id}>{nota.id}</li>
                            <li key={nota.id}>{nota.user_id}</li>
                            <li key={nota.id}>{nota.evaluation_type}</li>
                            <li key={nota.id}>{nota.date}</li>
                        </>

                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListaNotas;
