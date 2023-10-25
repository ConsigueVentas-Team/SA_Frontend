import React, { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";
import SelectBox from "../../components/reportes/SelectBox";
import TarjetaAsistencia from "../../components/reportes/TarjetaAsistencia";
import Barras from "../../components/reportes/graficos/Barras";
import BarrasAsistencia from "../../components/reportes/graficos/BarrasAsistencia";
import Circular from "../../components/reportes/graficos/Circular";
import Tarjeta from "../../components/reportes/Tarjeta";
import ObtenerDatos from "../../components/formulario/Helpers/hooks/ObtenerDatos";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

const Reportes = () => {
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );

  const token = tokenD.toString(enc.Utf8);
  const [apiDataUsuariosSector, setApiDataUsuariosSector] = useState([]);
  const [apiDataAsistenciasSector, setApiDataAsistenciasSector] = useState([]);
  const [apiDataUser, setApiDataUser] = useState([]);
  const [apiDataAsis, setApiDataAsis] = useState([]);

  const [departamentos, setDepartamentos] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [nucleosFiltrados, setNucleosFiltrados] = useState([]);
  const [core, setCore] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [turno, setTurno] = useState("");
  const [mostrar, setMostrar] = useState(true);

  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [usuariosActivos, setUsuariosActivos] = useState(0);
  const [ingresosMes, setIngresosMes] = useState(0);

  const [totalAsistencias, setTotalAsistencias] = useState(0);
  const [totalTardanzas, setTotalTardanzas] = useState(0);
  const [totalFaltas, setTotalFaltas] = useState(0);
  const [totalJustificaciones, setTotalJustificaciones] = useState(0);

  const [totalJus, setTotalJus] = useState(0);
  const [aceptado, setAceptado] = useState(0);
  const [enProceso, setEnProceso] = useState(0);
  const [rechazado, setRechazado] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const url = new URL(import.meta.env.VITE_API_URL + "/reports/list");
      url.searchParams.append("page", 0);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApiDataUser(data.reportes_usuarios.reporte_general);
        setApiDataAsis(data.reportes_asistencias);

        //----------------------------------------------
        setTotalUsuarios(data.reportes_usuarios.reporte_total.total_usuarios);
        setUsuariosActivos(
          data.reportes_usuarios.reporte_total.usuarios_activos
        );
        setIngresosMes(
          data.reportes_usuarios.reporte_total.ingresos_mes[0].count
        );

        /////
        const sumUniqueValues = (data, property) => {
          const uniqueValues = [...new Set(data.map((item) => item[property]))];
          return uniqueValues.reduce((acc, count) => acc + count, 0);
        };

        const totalAsistencias = sumUniqueValues(
          data.reportes_asistencias,
          "department_attendance_count"
        );
        const totalFaltas = sumUniqueValues(
          data.reportes_asistencias,
          "department_absence_count"
        );
        const totalTardanzas = sumUniqueValues(
          data.reportes_asistencias,
          "department_delay_count"
        );
        const totalJustificaciones = sumUniqueValues(
          data.reportes_asistencias,
          "department_justification_count"
        );

        setTotalAsistencias(totalAsistencias);
        setTotalFaltas(totalFaltas);
        setTotalTardanzas(totalTardanzas);
        setTotalJustificaciones(totalJustificaciones);

        /////
        setAceptado(
          data.reportes_justificacion[0].total_justification_aceptado
        );
        setRechazado(
          data.reportes_justificacion[0].total_justification_rechazado
        );
        setEnProceso(
          data.reportes_justificacion[0].total_justification_en_proceso
        );
        setTotalJus(data.reportes_justificacion[0].total_justifications);

        //----------------------------------------------
        const filteredData = data.reportes_usuarios.reporte_general.reduce(
          (acc, current) => {
            if (
              !acc.find(
                (item) => item.department_name === current.department_name
              )
            ) {
              acc.push(current);
            }
            return acc;
          },
          []
        );
        setApiDataUsuariosSector(filteredData);
        const filteredAsisData = data.reportes_asistencias.filter(
          (item, index, self) => {
            return (
              self.findIndex(
                (el) => el.department_name === item.department_name
              ) === index
            );
          }
        );
        setApiDataAsistenciasSector(filteredAsisData);
      } else {
        console.error("Error al obtener datos de informes");
      }
    }

    fetchData();
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      const listaDepartamentos = await ObtenerDatos(token, "departments");
      const listaNucleos = await ObtenerDatos(token, "cores");
      setNucleos(listaNucleos);
      setDepartamentos(listaDepartamentos);
    }
    fetchData();
  }, []);

  const filtrar = () => {
    console.log(core);
    let datosFiltrados = [];
    let datosFiltradoAsistencia = [];

    const departamentoMappings = {
      1: {
        name: "Departamento Operativo",
        cores: {
          5: "Creativo",
          6: "Audiovisual",
          10: "Marca Cliente",
          11: "Marca Proyecto",
        },
      },
      2: {
        name: "Departamento Comercial",
        cores: {
          31: "Atencion al Cliente",
          1: "Sistemas",
          7: "Diseño Web",
          8: "Logística",
          9: "Comercial",
        },
      },
      3: {
        name: "Departamento Estratégico",
        cores: {
          2: "Administrativo",
          3: "Talento Humano",
          4: "Publicidad Digital",
        },
      },
    };

    const departamentoInfo = departamentoMappings[departamento];

    if (departamentoInfo) {
      console.log(departamentoInfo.name);
      datosFiltrados = apiDataUser.filter(
        (dato) => dato.department_name == departamentoInfo.name
      );
      datosFiltradoAsistencia = apiDataAsis.filter(
        (dato) => dato.department_name == departamentoInfo.name
      );

      const coreName = departamentoInfo.cores[core];
      if (coreName) {
        datosFiltrados = apiDataUser.filter(
          (dato) => dato.core_name == coreName
        );
        datosFiltradoAsistencia = apiDataAsis.filter(
          (dato) => dato.core_name == coreName
        );
      }
    }

    setApiDataUsuariosSector(datosFiltrados);
    setApiDataAsistenciasSector(datosFiltradoAsistencia);
    setMostrar(true);
  };

  const borrar = () => {
    window.location.reload();
  };

  const mostrarNucleo = (id_departamento) => {
    const filtrado = nucleos.filter(
      (nucleo) => id_departamento == nucleo.department.id
    );
    setNucleosFiltrados(filtrado);
  };

  return (
    <div className="flex flex-col items-center w-full gap-4 ">
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
            <SelectBox
              setSelectedValue={setCore}
              valor={core}
              label={"Núcleo"}
              data={nucleosFiltrados}
            ></SelectBox>
            <SelectBox
              setSelectedValue={setTurno}
              valor={turno}
              label={"Turno"}
              data={["Mañana", "Tarde"]}
            ></SelectBox>
          </div>
          <div className="flex gap-3">
            <button
              className="px-5 rounded text-gray-950 bg-cv-cyan"
              onClick={borrar}
            >
              <strong>Limpiar</strong>
            </button>

            <button className="p-2 rounded bg-cv-primary  " onClick={filtrar}>
              Filtrar
            </button>
          </div>
        </div>
      </section>
      {mostrar ? (
        <>
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
                porcentaje={70}
                numero={usuariosActivos}
              />
              <Tarjeta
                titulo="INGRESOS ÚLTIMO MES"
                porcentaje={20}
                numero={ingresosMes}
              />
            </div>
            <div className="box-border flex items-start justify-between w-full gap-7">
              <div className="flex flex-col items-start w-full gap-4 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80 box">
                <h1 className="text-lg font-medium">
                  USUARIOS ACTIVOS POR SECTOR
                </h1>
                <Barras barras={apiDataUsuariosSector} />
              </div>
            </div>
          </section>
          <section className="w-full py-3 text-2xl border-t-2 ">
            <h1 className="inline-flex items-center w-full text-base font-medium text-white uppercase">
              <AddIcon />
              <span className="ml-1 text-base font-medium md:ml-2">
                ASISTENCIAS
              </span>
            </h1>
            <article>
              <div className="box-content flex items-start justify-start w-full gap-4 ">
                <div className="box-border w-2/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
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
                <div className="box-border flex flex-col justify-between w-4/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                  <h1 className="text-lg font-medium ">
                    ASISTENCIAS POR SECTORES
                  </h1>
                  <div className="w-full h-5/6">
                    <BarrasAsistencia data={apiDataAsistenciasSector} />
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
                  faltas={aceptado}
                  justificaciones={enProceso}
                  tardanzas={rechazado}
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="flex items-center justify-center w-full h-full mt-20">
          <img src="./2Q.png" alt="" className="w-1/4 rounded-2xl " />
        </section>
      )}
    </div>
  );
};

export default Reportes;
