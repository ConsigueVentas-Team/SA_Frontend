import { useEvaluationApi } from "../Evaluador/hooks/EvaluationApi";
import { useEffect } from "react";

function Nota({ filters }) {
    const [globalFilter, setGlobalFilter] = useState("");
    const { notas, isLoading, columnTitles } = useEvaluationApi(filters); // Puedes pasar los filtros que necesites

    useEffect(() => {
        console.log('Notas:', notas); // Imprimir datos de usuarios en la consola
        console.log('Títulos de columnas:', columnTitles); // Imprimir títulos de columnas en la consola
    }, [notas, columnTitles]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    // Renderiza tu tabla y otros componentes aquí utilizando los datos de 'users' y 'columnTitles'

    return (
        <div>
            {/* Tu JSX aquí */}
        </div>
    );
}

export default Nota;
