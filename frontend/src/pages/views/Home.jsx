import DescriptionIcon from "@mui/icons-material/Description";

import { CardGrid, EstadisticasGrid, Saludo } from "../../components/home";

export const Home = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <Saludo />
        <div className="w-full space-y-4">
          <div className="flex items-center justify-start text-white">
            <DescriptionIcon />
            <h3 className="ml-2 text-xl">Resumen de Asistencia</h3>
          </div>
          <EstadisticasGrid />
        </div>
        <CardGrid />
      </section>
    </>
  );
};
