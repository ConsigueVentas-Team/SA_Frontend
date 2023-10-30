import { COLUMNS_TABLE_MY_EVALUATION } from "../../../constantes/evaluations/MyEvaluation";

const COLUMNAS = COLUMNS_TABLE_MY_EVALUATION.map((element) => element.value);

function HeaderTableMyEvaluation({headers}) {
  return (
    <thead className="text-base uppercase">
      <tr>
        {headers.map((element, index) => (
          <th key={index} className="px-6 py-4 whitespace-nowrap">
            {element}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default HeaderTableMyEvaluation;
