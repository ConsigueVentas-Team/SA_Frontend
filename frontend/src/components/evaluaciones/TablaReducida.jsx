// Función para calcular el promedio de un conjunto de notas.
function calcularPromedio(notas) {
    const notasNumericas = notas.map((nota) => parseFloat(nota));
    const sumaNotas = notasNumericas.reduce((total, nota) => total + nota, 0);
    const promedio = sumaNotas / notas.length;
    return isNaN(promedio) ? "" : promedio.toFixed(2);
}

// Función para calcular el promedio de los promedios generales.
function calcularPromedioGeneral(data) {
    const promediosGenerales = data.map((mes) => calcularPromedio(mes));
    const sumaPromediosGenerales = promediosGenerales.reduce((total, promedio) => total + parseFloat(promedio), 0);
    const promedioGeneral = sumaPromediosGenerales / promediosGenerales.length;
    return isNaN(promedioGeneral) ? "" : promedioGeneral.toFixed(2);
}

// Función para renderizar una tabla con información de habilidades y promedio general.
function TablaReducida({ title, data }) {
    // Obtiene las notas y meses de los datos proporcionados.
    const { meses, notas } = data;

    // Calcula el número total de columnas en la tabla.
    const columnas = notas.length + 2; // (MES + Notas) + (Promedio General)

    return (
        <table className="w-full table-auto bg-cv-primary rounded-2xl p-5 order-2 md:order-1 mt-4">
            <thead>
                <tr>
                    {/* Celda de título con borde completo, ocupando todas las columnas */}
                    <th className="text-center p-2 border" colSpan={columnas}>
                        {title}
                    </th>
                    {/* Celda para "Promedio General" */}
                    <th className="text-center border" rowSpan="2" style={{ borderWidth: '1px 0px' }}>
                        Promedio<br />General
                    </th>
                </tr>
                <tr>
                    {/* Encabezado de columna para "MES" */}
                    <th className="text-center p-2 border">MES</th>
                    {/* Mapea y muestra encabezados de columna para las notas */}
                    {notas.map((nota, index) => (
                        <th key={index} className="text-center p-2 border">
                            {nota}
                        </th>
                    ))}
                    {/* Celda para "Promedio" */}
                    <th className="text-center p-2 border">Promedio</th>
                </tr>
            </thead>
            <tbody>
                {/* Mapea y muestra las filas correspondientes a los meses */}
                {meses.map((mes, index) => (
                    <tr key={index}>
                        {/* Celda para mostrar el nombre del mes */}
                        <td className="text-center p-2 border">{mes}</td>
                        {/* Mapea y muestra las celdas de notas para este mes */}
                        {notas.map((nota, notaIndex) => (
                            <td key={notaIndex} className="text-center p-2 border">
                                {/* Muestra la nota correspondiente a este mes y esta nota */}
                                {data.registros[index][notaIndex]}
                            </td>
                        ))}
                        {/* Celda para "Promedio" */}
                        <td className="text-center p-2 border">
                            {/* Calcula y muestra el promedio de las notas de este mes */}
                            {calcularPromedio(data.registros[index])}
                        </td>
                    </tr>
                ))}
                {/* Casilla para mostrar el promedio de los promedios generales */}
                <tr>
                    <td className="text-center p-2 border" colSpan={columnas - 1}>
                        Promedio de Promedios Generales
                    </td>
                    <td className="text-center p-2 border">
                        {calcularPromedioGeneral(data.registros)}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

// Componente principal que muestra tablas de "Habilidades Blandas" y "Desempeño".
function Notas() {
    // Datos para "Habilidades Blandas"
    const habilidadesBlandas = {
        title: "Habilidades Blandas",
        data: {
            meses: ["Junio", "Julio", "Agosto", "Setiembre"],
            notas: ["Nota 1", "Nota 2", "Nota 3", "Nota 4"],
            registros: [
                [6, 10, 12, 20],
                [8, 9, 14, 18],
                [7, 12, 15, 22],
                [9, 11, 13, 19],
            ],
        },
    };

    // Datos para "Desempeño"
    const desempeno = {
        title: "Desempeño",
        data: {
            meses: ["Junio", "Julio", "Agosto", "Setiembre"],
            notas: ["Nota 1", "Nota 2", "Nota 3", "Nota 4"],
            registros: [
                [5, 9, 11, 21],
                [7, 10, 12, 20],
                [6, 11, 14, 18],
                [8, 10, 13, 19],
            ],
        },
    };

    return (
        <div>
            {/* Renderiza la tabla para "Habilidades Blandas" */}
            <TablaReducida {...habilidadesBlandas} />
            {/* Renderiza la tabla para "Desempeño" */}
            <TablaReducida {...desempeno} />
        </div>
    );
}

export default Notas;
