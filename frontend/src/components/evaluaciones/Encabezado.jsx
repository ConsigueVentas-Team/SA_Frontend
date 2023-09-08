import PropTypes from "prop-types";
function Encabezado({ notaFinal }) {
  const nombre = `${localStorage.getItem("name")} ${localStorage.getItem("surname")}`;

  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="top-[130px] md:left-[148px] text-[1rem] text-center pb-3 pl-2 font-bold ">
          DETALLES DE EVALUACIÓN
        </div>
        <div className="">
          <table className="col-span-1 md:col-span-3 row-span-5 bg-cv-primary rounded-2xl p-5 order-2 md:order-1 pb-6 w-full table-auto">
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
