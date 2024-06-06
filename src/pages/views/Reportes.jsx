import { useState, useEffect } from "react";
import SelectBox from "../../components/reportes/SelectBox";
import TarjetaAsistencia from "../../components/reportes/TarjetaAsistencia";
import Barras from "../../components/reportes/graficos/Barras";
import BarrasAsistencia from "../../components/reportes/graficos/BarrasAsistencia";
import Circular from "../../components/reportes/graficos/Circular";
import Tarjeta from "../../components/reportes/Tarjeta";
import ObtenerDatos from "../../components/formulario/Helpers/hooks/ObtenerDatos";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import SortIcon from "@mui/icons-material/Sort";
import Loading from "../../components/essentials/Loading";
import useDepartmentReport from "../../components/reportes/hooks/useReportApi";
import useReportList from "../../components/reportes/hooks/useReportList";
import getTokens from "../../components/reportes/helpers/getTokens";
import generatePDF from "../../components/reportes/helpers/generatePDF";

const Reportes = () => {  
  const [departamentos, setDepartamentos] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [nucleosFiltrados, setNucleosFiltrados] = useState([]);
  const [core, setCore] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [mostrar, setMostrar] = useState(true);
  const [isCore, seIsCore] = useState(false);
  const [isDepart, setIsDepart] = useState(false);
  const {report: reportDeparment} = useDepartmentReport('/departments/statistics');
  const {report: reportCore} = useDepartmentReport('/cores/statistics');
  const [activeNucleoOption, setActiveNucleoOption] = useState(true); 
  const [userDataBySector, setUserDataBySector] = useState([]);
  const {totalUsuarios,usuariosActivos,ingresosMes,totalAsistencias,totalTardanzas,totalFaltas,
         totalJustificaciones,totalJus,aceptado,enProceso,rechazado,apiDataAsistenciasSector,
         loading, setLoading
        } = useReportList();
  const {token} = getTokens();

  const handleGeneratePDF = ()=>{
    generatePDF(totalUsuarios,usuariosActivos,ingresosMes,totalAsistencias,totalTardanzas,totalFaltas,totalJustificaciones,totalJus,aceptado,rechazado,enProceso,departamento,reportDeparment,userDataBySector,apiDataAsistenciasSector)
  }

  useEffect(()=>{
    setUserDataBySector(reportDeparment);
  },[reportDeparment])

  useEffect(() => {
    async function fetchData() {
      const listaDepartamentos = await ObtenerDatos(token, "departments", setLoading,1);
      const listaNucleos = await ObtenerDatos(token, "cores", setLoading,1);
      setNucleos(listaNucleos.data);      
      setDepartamentos(listaDepartamentos.data);
    }
    fetchData();
  }, []);

  const borrar = () => {
    window.location.reload();
  };

  const mostrarNucleo = (id_departamento) => {
    const filtrado = nucleos.filter(
      (nucleo) => id_departamento == nucleo.department.id
    );
    setNucleosFiltrados(filtrado);
  };

  const filtrar = ()=>{           
    let filteredData = [];

    //Si no se ha seleccionado el departamento y/o el núcleo no se ejecuta el filtro
    if(core === '' && departamento === '') return;

    if(core) {
      //Validación para porte de los nucleos
      filteredData = reportCore.filter(_core => _core.id == core);                
    }else {
      //Validación para porte de los departamentos
      filteredData = reportDeparment.filter(department => department.id == departamento);    
    }   
    setUserDataBySector(filteredData)
  }    
  
  //Codigo para que se desactive o active el select de los nucleos 
  //cada vez que se cambie el select departamento
  useEffect(()=>{    
    if(departamento == '') return setActiveNucleoOption(true)
    setActiveNucleoOption(false)
    setCore('');
  },[departamento])

  return (
    <div className="flex flex-col items-center w-full gap-10 ">
      <section className="flex flex-col gap-5 ">
        <h1 className="inline-flex items-center w-full text-base font-medium text-white uppercase">
          <AssessmentIcon />
          <span className="ml-1 text-base font-medium md:ml-2">REPORTES</span>
        </h1>
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap w-full gap-10">
            <SelectBox
              label={"Departamento"}
              data={departamentos}
              mostrarNucleo={mostrarNucleo}
              valor={departamento}
              setSelectedValue={setDepartamento}
            ></SelectBox>       
            <div>   </div>     
            <SelectBox          
              label={"Núcleo"}
              data={nucleosFiltrados}
              valor={core}
              setSelectedValue={setCore}
              isActive={activeNucleoOption}
            ></SelectBox>
          </div>
          <div className="flex gap-3">
            <button
              className="p-2 rounded pl-4 pr-4 text-gray-950 bg-red-500 flex items-center hover:bg-red-600"
              onClick={handleGeneratePDF}
            >
              <PictureAsPdfIcon className="mr-2" />
              <strong>Reporte</strong>
            </button>

            <button
              className="p-2 rounded pl-4 pr-4 text-gray-950 bg-cv-cyan ml-4 flex items-center hover:bg-cv-cyan-dark"
              onClick={filtrar}
            >
              <SortIcon className="mr-2" />
              <strong>Filtrar</strong>
            </button>

            <button
              className="p-2 pl-3 pr-3 rounded bg-cv-primary ml-4 flex items-center hover:bg-cv-primary-dark"
              onClick={borrar}
            >
              <DeleteIcon className="mr-2" />
              <strong>Limpiar</strong>
            </button>
          </div>
        </div>
      </section>
      {mostrar ? (
        <div
          id="report-container"
          className="flex flex-col items-center w-full gap-10"
        >
          <>
            {loading ? (
              <Loading />
            ) : (
              <section>
                <section className="flex flex-wrap items-start justify-start w-full py-3 text-2xl border-t-2 ">
                  <h1 className="inline-flex items-center w-full text-base font-medium text-white uppercase">
                    <PeopleAltIcon />
                    <span className="ml-1 text-base font-medium md:ml-2">
                      USUARIOS
                    </span>
                  </h1>
                  <div className="flex flex-wrap justify-between w-full gap-4 mt-4 gap-y-2 sm:flex-nowrap">
                    <Tarjeta
                      titulo="TOTAL DE USUARIOS"
                      porcentaje={100}
                      numero={totalUsuarios}
                    />
                    <Tarjeta
                      titulo="USUARIOS ACTIVOS"
                      porcentaje={90}
                      numero={usuariosActivos}
                    />
                    <Tarjeta
                      titulo="INGRESOS ÚLTIMO MES"
                      porcentaje={10}
                      numero={ingresosMes}
                    />
                  </div>
                  <div className="box-border flex items-start justify-between w-full gap-7">
                    <div className="flex flex-col items-start w-full gap-4 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-[370px] box usuarios-activos-por-sector">
                      <h1 className="text-lg font-medium">
                        USUARIOS ACTIVOS POR SECTOR
                      </h1>
                      <Barras
                        barras={userDataBySector}                        
                      />                        
                    </div>
                  </div>
                </section>
                <section className="w-full py-3 text-2xl border-t-2 ">
                  <h1 className="inline-flex items-center w-full text-base font-medium text-white uppercase">
                    <PlaylistAddIcon />
                    <span className="ml-1 text-base font-medium md:ml-2">
                      ASISTENCIAS
                    </span>
                  </h1>
                  <article>
                    <div className="box-content flex items-start justify-start w-full gap-4 ">
                      <div className="box-border w-2/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-[360px]">
                        <TarjetaAsistencia
                          name1="Asistencias"
                          name2="Tardanzas"
                          name3="Faltas"
                          name4="Justificaciones"
                          asistencias={totalAsistencias}
                          faltas={totalFaltas}
                          justificaciones={totalJustificaciones}
                          tardanzas={totalTardanzas}
                        />
                      </div>
                      <div className="box-border flex flex-col justify-between w-5/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-[360px] asistencia-por-sector">
                        <h1 className="text-lg font-medium ">
                          ASISTENCIAS POR SECTORES
                        </h1>
                        <div className="w-full mt-5 h-[360px]">
                          <BarrasAsistencia
                            barras={apiDataAsistenciasSector}
                            isCore={isCore}
                            isDepart={isDepart}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </section>
                <section className="flex flex-wrap items-start justify-start w-full py-3 text-2xl border-t-2 ">
                  <h1 className="inline-flex items-center w-full text-base font-medium text-white uppercase">
                    <AddModeratorIcon />
                    <span className="ml-1 text-base font-medium md:ml-2">
                      JUSTIFICACIONES
                    </span>
                  </h1>
                  <div className="box-content flex items-start justify-start w-full gap-4 ">
                    <div className="box-border flex flex-col justify-between w-3/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                      <h1 className="text-lg font-medium ">
                        Estado de Justificaciones
                      </h1>
                      <div className="w-full h-full">
                        <Circular
                          primero={aceptado}
                          segundo={enProceso}
                          tercero={rechazado}
                        />
                      </div>
                    </div>
                    <div className="box-border w-3/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                      <TarjetaAsistencia
                        name1="Total de justificaciones"
                        name2="Justifiaciones Aceptadas"
                        name3="Justificaciones Rechazadas"
                        name4="Justificaciones en Progreso"
                        asistencias={totalJus}
                        faltas={rechazado}
                        justificaciones={enProceso}
                        tardanzas={rechazado}
                      />
                    </div>
                  </div>
                </section>
              </section>
            )}
          </>
        </div>
      ) : (
        <section className="flex items-center justify-center w-full h-full mt-20">
          <img src="./2Q.png" alt="" className="w-1/4 rounded-2xl " />
        </section>
      )}
    </div>
  );
};

export default Reportes;
