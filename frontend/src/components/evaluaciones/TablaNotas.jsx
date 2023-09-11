import { useState, useEffect } from 'react';
import Encabezado from './Encabezado';
import FilaNota from './FilaNota';

function TablaNotas() {
  // Datos de ejemplo para evaluaciones
  const evaluaciones = [
    {
      title: "Habilidades Blandas",
      meses: ["Junio", "Julio", "Agosto", "Setiembre"],
      registros: [
        [10, 10, 12, 14],
        [8, 9, 14, 18],
        [7, 12, 15, 22],
        [9, 11, 13, 19],
      ],
    },
    {
      title: "Desempeño",
      meses: ["Junio", "Julio", "Agosto", "Setiembre"],
      registros: [
        [5, 9, 11, 21],
        [7, 10, 12, 20],
        [6, 11, 14, 18],
        [8, 10, 13, 19],
      ],
    },
    // Puedes agregar más evaluaciones aquí en el futuro
  ];

  // Función para calcular el promedio general de una evaluación
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

  // Estado para almacenar los promedios generales de las evaluaciones
  const [promediosGenerales, setPromediosGenerales] = useState([]);

  // Efecto para calcular los promedios generales al cargar el componente
  useEffect(() => {
    const promedios = evaluaciones.map((evaluacion) =>
      parseFloat(calcularPromedioGeneral(evaluacion.registros))
    );
    setPromediosGenerales(promedios);
  }, []);

  // Calcular la Nota Final en función de todos los promedios generales
  const notaFinal = (
    promediosGenerales.reduce((total, promedio) => total + parseFloat(promedio), 0) /
    promediosGenerales.length
  );

  // Función para renderizar una tabla de evaluación
  const renderTabla = ({ title, meses, registros, promedioGeneral }) => {
    const numNotas = registros[0].length;

    // Clase para centrar texto en celdas
    const centerTextClass = "text-center p-2";

    // Generar encabezados de notas
    const notasHeader = Array.from({ length: numNotas }, (_, index) => (
      <th key={index} className={`${centerTextClass} border-r`}>{`Nota ${index + 1}`}</th>
    ));

    return (
      <div className="mb-7  sm:w-auto sm:h-auto ">
        <table className="text-xs md:text-[1rem] lg:text-[1rem] w-full table-auto bg-cv-primary rounded-2xl">
          <thead className='border-b'>
            <tr>
              <th className={`${centerTextClass} uppercase sm:px-auto`} colSpan={numNotas + 2}>
                {title}
              </th>
            </tr>
            <tr className='border-t'>
              <th className={`${centerTextClass} border-r border-l`}>MES</th>
              {notasHeader}
              <th className={`${centerTextClass} border-r`}>Promedio</th>
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
            <tr className='border-t '>
              <th className={`${centerTextClass} border-r`} colSpan={numNotas + 1}>
                Promedio General
              </th>
              <td className="font-bold text-center bg-cv-light p-2 rounded-br-2xl">
                {promedioGeneral}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Obtener el nombre del usuario desde localStorage
  const nombre = `${localStorage.getItem("name")} ${localStorage.getItem("surname")}`;

  return (
    <div className='border overflow-x-auto'>
      {/* Encabezado de la sección de evaluaciones */}
      <Encabezado nombre={nombre} notaFinal={notaFinal} />

      <div className='pb-5 pt-3'>
        {/* Renderiza las tablas de evaluaciones */}
        {evaluaciones.map((evaluacion, index) => (
          <div key={index}>
            {renderTabla({ ...evaluacion, promedioGeneral: promediosGenerales[index] })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TablaNotas;
