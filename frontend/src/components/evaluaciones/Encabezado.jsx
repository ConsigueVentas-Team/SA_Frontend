import PropTypes from "prop-types";

function Encabezado({ notaFinal }) {

  // Obtiene el nombre del colaborador desde el almacenamiento local
  const nombre = localStorage.getItem("name") + " " + localStorage.getItem("surname");


  return (
    <>





      {/* Encabezado de la sección de evaluaciones */}
      <div className="top-[130px] md:left-[148px] text-[1rem] text-center pb-3 pl-2">
        DETALLES DE EVALUACIÓN
      </div>

      {/* Sección que muestra el nombre y la nota final */}
      <div className="col-span-1 md:col-span-3 row-span-5 bg-cv-primary rounded-2xl p-5 order-2 md:order-1 pb-6">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <td className="font-bold text-sm text-gray-400">Nombre:</td>
              <td className="font-bold text-right text-sm text-gray-400 md:ml-auto pr-5">Nota Final:</td>
            </tr>
            <tr>
              {/* Muestra el nombre del colaborador */}
              <td className="text-[20px] md:text-[30px]"> {nombre} </td>
              {/* Muestra la nota final calculada */}
              <td className="text-right text-[20px] md:text-[30px] md:ml-auto pr-5">{notaFinal} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}


Encabezado.propTypes = {
  notaFinal: PropTypes.number.isRequired,
};

export default Encabezado;