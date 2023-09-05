import Notas from "../../../components/evaluaciones/TablaReducida"
import TablaNotas from "../../../components/evaluaciones/TablaNotas"


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
        {/* <Notas /> */}
        <TablaNotas />

      </div>

      <table className="w-full table-auto bg-cv-primary rounded-2xl p-5 order-2 md:order-1 mt-4">
          <thead>
            <tr>
              <th className="text-center p-2 border" colSpan="6">Habilidades Blandas</th>
              <th className="text-center p-2 border" rowSpan="2">Promedio<br />General</th>
            </tr>
            <tr>
              <th className="text-center p-2 border">MES</th>
              <th className="text-center p-2 border">Nota 1</th>
              <th className="text-center p-2 border">Nota 2</th>
              <th className="text-center p-2 border">Nota 3</th>
              <th className="text-center p-2 border">Nota 4</th>
              <th className="text-center p-2 border">Promedio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center p-2 border">Junio</td>
              <td className="text-center p-2 border">1</td>
              <td className="text-center p-2 border">2</td>
              <td className="text-center p-2 border">3</td>
              <td className="text-center p-2 border">4</td>
              <td className="text-center p-2 border">5</td>
              <td className="text-center p-2 border" rowSpan="4">10</td>
            </tr>
            <tr>
              <td className="text-center p-2 border">Julio</td>
              <td className="text-center p-2 border">1</td>
              <td className="text-center p-2 border">2</td>
              <td className="text-center p-2 border">3</td>
              <td className="text-center p-2 border">4</td>
              <td className="text-center p-2 border">5</td>
            </tr>
            <tr>
              <td className="text-center p-2 border">Agosto</td>
              <td className="text-center p-2 border">1</td>
              <td className="text-center p-2 border">2</td>
              <td className="text-center p-2 border">3</td>
              <td className="text-center p-2 border">4</td>
              <td className="text-center p-2 border">5</td>
            </tr>
            <tr>
              <td className="text-center p-2 border">Setiembre</td>
              <td className="text-center p-2 border">1</td>
              <td className="text-center p-2 border">2</td>
              <td className="text-center p-2 border">3</td>
              <td className="text-center p-2 border">4</td>
              <td className="text-center p-2 border">5</td>
            </tr>
          </tbody>
        </table>


    </>
  )
}
