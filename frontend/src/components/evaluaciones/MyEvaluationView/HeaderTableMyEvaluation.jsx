import { COLUMNS_TABLE_MY_EVALUATION } from "../../../constantes/evaluations/MyEvaluation";

const COLUMNAS = COLUMNS_TABLE_MY_EVALUATION.map((element) => element.value);

function HeaderTableMyEvaluation() {
  return (
    <thead className="text-base uppercase">
      <tr>
        {COLUMNAS.map((element, index) => (
          <th key={index} className="px-6 py-4 whitespace-nowrap">
            {element}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default HeaderTableMyEvaluation;
