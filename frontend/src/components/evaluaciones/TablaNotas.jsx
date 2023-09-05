import FilaNota from './FilaNota';

function TablaNotas() {
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

  const renderTabla = ({ title, meses, registros }) => {
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
            <td className="text-center p-2 border" rowSpan="4">10</td>
            </tr>
            

          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {renderTabla(habilidadesBlandas)}
      {renderTabla(desempeno)}
    </div>
  );
}

export default TablaNotas;

