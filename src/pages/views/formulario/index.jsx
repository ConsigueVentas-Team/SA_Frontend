import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import { Link } from "react-router-dom";

const Formulario = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-wrap gap-x-48  sm:gap-y-14 gap-y-6 content-center">
      <Link
        to="departamento"
        className="sm:w-[18rem] sm:h-[15rem] w-44 h-40   text-sm rounded-md hover:bg-slate-500 bg-cv-primary flex justify-center items-center "
      >
        <div className=" w-3/4 h-1/2 flex justify-center items-center flex-col scale-125">
          <BusinessOutlinedIcon
            fontSize="large"
            className="scale-150 mb-3"
          ></BusinessOutlinedIcon>

          <h2 className="text-center">Administrar Departamento</h2>
        </div>
      </Link>

      <Link
        to="nucleo"
        className="sm:w-[18rem]  sm:h-[15rem] w-44 h-40  text-sm rounded-md hover:bg-slate-500 bg-cv-primary  justify-center flex items-center "
      >
        <div className=" w-1/2 h-1/2 flex justify-center items-center flex-col scale-125">
          <Diversity3OutlinedIcon
            fontSize="large"
            className="scale-150 mb-3"
          ></Diversity3OutlinedIcon>

          <h2 className="text-center">Administrar Núcleo</h2>
        </div>
      </Link>

      <Link
        to="perfil"
        className="sm:w-[18rem] sm:h-[15rem] w-44 h-40  flex-col text-sm rounded-md hover:bg-slate-500 bg-cv-primary  justify-center flex items-center  "
      >
        <div className=" w-1/2 h-1/2 flex justify-center items-center flex-col scale-125">
          <PortraitOutlinedIcon
            fontSize="large"
            className="scale-150 mb-3"
          ></PortraitOutlinedIcon>

          <h2 className="text-center">Administrar Perfil</h2>
        </div>
      </Link>
    </div>
  );
};

export default Formulario;
