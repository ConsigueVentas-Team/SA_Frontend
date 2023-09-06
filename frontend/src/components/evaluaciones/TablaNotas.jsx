import { useState, useEffect } from 'react';
import FilaNota from './FilaNota';

/**
 * El componente `TablaNotas` muestra una tabla con registros de notas y calcula promedios generales.
 * @component
 */
function TablaNotas() {
    // Datos de ejemplo para habilidades blandas y desempeño
    const habilidadesBlandas = {
        title: "Habilidades Blandas",
        meses: ["Junio", "Julio", "Agosto", "Setiembre"],
        registros: [
            [10, 10, 12, 14],
            [8, 9, 14, 18],
            [7, 12, 15, 22],
            [9, 11, 13, 19],
        ],
    };

    const desempeno = {
        title: "Desempeño",
        meses: ["Junio", "Julio", "Agosto", "Setiembre"],
        registros: [
            [5, 9, 11, 21],
            [7, 10, 12, 20],
            [6, 11, 14, 18],
            [8, 10, 13, 19],
        ],
    };

    /**
     * Función que calcula el promedio general a partir de una matriz de registros.
     * @param {number[][]} registros - Matriz de registros de notas.
     * @returns {string} - Promedio general formateado como cadena.
     */
    const calcularPromedioGeneral = (registros) => {
        const numMeses = registros.length;
        const numNotas = registros[0].length;

        let sumaTotal = 0;

        for (let i = 0; i < numMeses; i++) {
            for (let j = 0; j < numNotas; j++) {
                sumaTotal += registros[i][j];
            }
        }

        return (sumaTotal / (numMeses * numNotas)).toFixed(2);
    };

    // Estado para almacenar los promedios generales
    const [promedioGeneralHabilidades, setPromedioGeneralHabilidades] = useState(0);
    const [promedioGeneralDesempeno, setPromedioGeneralDesempeno] = useState(0);

    // Efecto para calcular los promedios generales al cargar el componente
    useEffect(() => {
        setPromedioGeneralHabilidades(calcularPromedioGeneral(habilidadesBlandas.registros));
        setPromedioGeneralDesempeno(calcularPromedioGeneral(desempeno.registros));
    }, []);

    // Calcular la suma de promedios generales
    const sumaPromediosGenerales = parseFloat(promedioGeneralHabilidades) + parseFloat(promedioGeneralDesempeno);

    /**
     * Renderiza una tabla de notas y promedio general.
     * @param {Object} datos - Datos de la tabla (title, meses, registros, promedioGeneral).
     * @returns {JSX.Element} - Tabla de notas y promedio general.
     */
    const renderTabla = ({ title, meses, registros, promedioGeneral }) => {
        const numNotas = registros[0].length;

        const notasHeader = Array.from({ length: numNotas }, (_, index) => (
            <th key={index} className="text-center p-2 border">{`Nota ${index + 1}`}</th>
        ));

        return (
            <div key={title}>
                <table className="w-full table-auto bg-cv-primary rounded-2xl p-5 order-2 md:order-1 mt-4">
                    <thead>
                        <tr>
                            <th className="text-center p-2 border" colSpan={numNotas + 2}>{title}</th>
                            <th className="text-center p-2 border" rowSpan="2">Promedio <br />General</th>
                        </tr>
                        <tr>
                            <th className="text-center p-2 border">MES</th>
                            {notasHeader}
                            <th className="text-center p-2 border">Promedio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meses.map((mes, index) => (
                            <FilaNota
                                key={mes}
                                mes={mes}
                                notas={registros[index]}
                                numNotas={numNotas}
                            />
                        ))}
                        <tr>
                            <td className="text-center p-2 border promedioGeneral" colSpan={numNotas}>{promedioGeneral}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            {/* Renderiza la tabla para habilidades blandas con su promedio general */}
            {renderTabla({ ...habilidadesBlandas, promedioGeneral: promedioGeneralHabilidades })}
            {/* Renderiza la tabla para desempeño con su promedio general */}
            {renderTabla({ ...desempeno, promedioGeneral: promedioGeneralDesempeno })}
        </div>
    );
}

export default TablaNotas;
