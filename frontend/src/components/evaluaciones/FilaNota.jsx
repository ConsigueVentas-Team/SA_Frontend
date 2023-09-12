import PropTypes from 'prop-types';

function FilaNota({ mes, notas }) {
  const calcularPromedio = (notas) => {
    const sumaTotal = notas.reduce((total, nota) => total + nota, 0);
    return sumaTotal / notas.length;
  };

  const isValidData = notas.length >= 4 && notas.every(nota => typeof nota === 'number');

  return (
    <tr className={isValidData ? 'border-t' : ''}>
      <td className="text-center p-2 uppercase  border-r">{mes}</td>
      {notas.map((nota, index) => (
        <td key={index} className={`text-center p-2  border-r`}>
          {isValidData ? nota : 'Datos de nota no válidos'}
        </td>
      ))}
      {isValidData && (
        <td className="text-center p-2 ">{calcularPromedio(notas).toFixed(2)}</td>
      )}
    </tr>
  );
}

FilaNota.propTypes = {
  mes: PropTypes.string.isRequired,
  notas: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default FilaNota;
