import PropTypes from "prop-types";
function Encabezado({ notaFinal }) {
  const nombre = `${localStorage.getItem("name")} ${localStorage.getItem("surname")}`;

  return (
    <>
      <div>
        <div className="text-gray-400 text-left uppercase text-sm md:text-lg pb-3 font-medium ">
          DETALLES DE EVALUACIÓN
        </div>
        <div>
          <table className=" w-full table-auto col-span-1 bg-cv-primary rounded-2xl p-5">
            <tbody>
              <tr>
                <td className="font-bold text-sm text-gray-400 pl-5 pt-2">Nombre:</td>
                <td className="font-bold text-right text-sm text-gray-400 md:ml-auto pr-5 pt-2">Nota Final:</td>
              </tr>
              <tr>
                <td className="text-2xl md:text-3xl pl-5 pb-2"> {nombre} </td>
                <td className="text-right text-2xl md:text-3xl md:ml-auto pr-5 pb-2">{notaFinal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

Encabezado.propTypes = {
  notaFinal: PropTypes.number.isRequired,
};
export default Encabezado;
