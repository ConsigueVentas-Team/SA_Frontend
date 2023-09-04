import Notas from "../../../components/evaluaciones/TablaReducida"

export const EvaluacionesColaborador = () => {
  return (
    <>
      <div className="top-[130px] left-[148px] text-[1rem] text-left pb-6">
        DETALLES DE EVALUACIÓN
      </div>

      <div className="col-span-1 md:col-span-3 row-span-5 bg-cv-primary rounded-2xl p-5 order-2 md:order-1 pb-6">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <td className="font-bold text-sm text-gray-400">Nombre:</td>
              <td className="font-bold text-rigth text-sm text-gray-400">Nota Final:</td>
            </tr>
            <tr>
              <td className="text-[30px]">Sebastián Alejandro Mendoza</td>
              <td className="text-rigth text-[30px]">16</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>


        <Notas />



      </div>
    </>
  )
}
