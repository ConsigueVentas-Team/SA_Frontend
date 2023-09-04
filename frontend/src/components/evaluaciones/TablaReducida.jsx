
function TablaReducida({ title, meses, notas, promedioGeneral }) {
  const columnas = notas.length + 2; // MES + Notas + Promedio General

  return (
    <table className="w-full table-auto bg-cv-primary rounded-2xl p-5 order-2 md:order-1 mt-4">
      <thead>
        <tr>
          <th className="text-center p-2 border" colSpan={columnas}>
            {title}
          </th>
          <th className="text-center p-2 border" rowSpan="2">
            Promedio General
          </th>
        </tr>
        <tr>
          <th className="text-center p-2 border">MES</th>
          {notas.map((nota, index) => (
            <th key={index} className="text-center p-2 border">
              {nota}
            </th>
          ))}
          <th className="text-center p-2 border">Promedio</th>
        </tr>
      </thead>
      <tbody>
        {meses.map((mes, index) => (
          <tr key={index}>
            <td className="text-center p-2 border">{mes}</td>
            {notas.map((_, notaIndex) => (
              <td key={notaIndex} className="text-center p-2 border">
                {index === 0 ? notaIndex + 1 : ""}
              </td>
            ))}
            <td className="text-center p-2 border">
              {index === 0 ? promedioGeneral : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Notas() {
  const habilidadesBlandas = {
    title: "Habilidades Blandas",
    meses: ["Junio", "Julio", "Agosto", "Setiembre"],
    notas: ["Nota 1", "Nota 2", "Nota 3", "Nota 4"],
    promedioGeneral: "10",
  };

  const desempeno = {
    title: "Desempeño",
    meses: ["Octubre", "Noviembre", "Diciembre", "Enero"],
    notas: ["Nota 1", "Nota 2", "Nota 3", "Nota 4"],
    promedioGeneral: "8",
  };

  return (
    <div>
      <TablaReducida {...habilidadesBlandas} />
      <TablaReducida {...desempeno} />
    </div>
  );
}

export default Notas;
