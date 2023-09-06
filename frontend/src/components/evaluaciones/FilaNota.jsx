import PropTypes from 'prop-types';

/**
 * Componente que representa una fila de notas para un mes en la tabla de calificaciones.
 *
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.mes - El nombre del mes al que corresponden las notas (propiedad requerida).
 * @param {number[]} props.notas - Un arreglo de notas para el mes (propiedad requerida).
 *
 * @returns {JSX.Element} Elemento JSX que representa la fila de notas.
 */
function FilaNota({ mes, notas }) {
  /**
   * Función para calcular el promedio de un arreglo de notas.
   *
   * @param {number[]} notas - Arreglo de notas.
   * @returns {number} Promedio de las notas.
   */
  const calcularPromedio = (notas) => {
    const sumaTotal = notas.reduce((total, nota) => total + nota, 0);
    return sumaTotal / notas.length;
  };

  // Verificar que haya al menos 4 valores y que sean números
  if (notas.length >= 4 && notas.every(nota => typeof nota === 'number')) {
    // Calcular el promedio
    const promedio = calcularPromedio(notas);

    return (
      <tr>
        <td className="text-center p-2 border">{mes}</td>
        {notas.map((nota, index) => (
          <td key={index} className="text-center p-2 border">{nota}</td>
        ))}
        <td className="text-center p-2 border">{promedio.toFixed(2)}</td>
      </tr>
    );
  } else {
    // Si los datos no son válidos, puedes mostrar un mensaje de error o tomar otra acción
    return (
      <tr>
        <td className="text-center p-2 border">{mes}</td>
        <td className="text-center p-2 border" colSpan={notas.length + 1}>Datos de nota no válidos</td>
      </tr>
    );
  }
}

// Definir las propiedades requeridas y sus tipos
FilaNota.propTypes = {
  mes: PropTypes.string.isRequired, // 'mes' debe ser una cadena requerida
  notas: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired, // 'notas' debe ser un array de números requerido
};

export default FilaNota;
