import PropTypes from 'prop-types'

function FilaNota({ mes, notas }) {
  // Verificar que haya al menos 4 valores y que sean números
  if (notas.length >= 4 && notas.every(nota => typeof nota === 'number')) {
    // Calcular el promedio
    const promedio = notas.reduce((total, nota) => total + nota, 0) / notas.length;

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

FilaNota.propTypes = {
  mes: PropTypes.string.isRequired, // 'mes' debe ser una cadena requerida
  notas: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired, // 'notas' debe ser un array de números requerido
};

export default FilaNota;
