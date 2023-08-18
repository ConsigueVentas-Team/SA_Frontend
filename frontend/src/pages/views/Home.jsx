
import DescriptionIcon from "@mui/icons-material/Description";
import CakeIcon from "@mui/icons-material/Cake";

import { CardGrid, EstadisticasGrid, Saludo } from "../../components";

export const Home = () => {
  
  return (
    <>
      <section className="w-full flex flex-col justify-center items-center gap-4">
        <Saludo />
        <div className="w-full space-y-4">
          <div className="flex items-center justify-start text-white">
            <DescriptionIcon />
            <h3 className="text-xl ml-2">Resumen de Asistencia</h3>
          </div>
          <EstadisticasGrid />
        </div>
        <div className="w-full space-y-4">
          <div className="flex items-center text-white">
            <CakeIcon />
            <h3 className="text-xl ml-2">Próximos Cumpleaños</h3>
          </div>
          <CardGrid />
        </div>
      </section>
    </>
  )
}
