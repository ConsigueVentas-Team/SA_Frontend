import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export const DatosAsistencia = ({ colaborador }) => {

  return (
    <div className="col-span-1 md:col-span-2 row-span-3 md:col-start-4 md:row-start-6 bg-cv-primary rounded-2xl text-white p-5 order-4 md:order-4">
      <h2 className="text-xl mb-5 font-semibold text-center uppercase">
        Datos de Asistencia
      </h2>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={270} className="mx-auto">
          <BarChart
            data={[
              { name: "A", Asistencias: colaborador.Asistencia },
              { name: "T", Tardanzas: colaborador.Tardanzas },
              { name: "J", Justificaciones: colaborador.Justificaciones },
              { name: "F", Faltas: colaborador.Faltas },
            ]}
            barSize={40}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="0 1" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Asistencias" fill="#4CAF50" />
            <Bar dataKey="Tardanzas" fill="#FFC300" />
            <Bar dataKey="Justificaciones" fill="#36A2EB" />
            <Bar dataKey="Faltas" fill="#FF5733" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

DatosAsistencia.propTypes = {
  colaborador: PropTypes.object.isRequired,
};
