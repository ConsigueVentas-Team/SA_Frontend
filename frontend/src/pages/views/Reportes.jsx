import React, { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";
import SelectBox from "../../components/reportes/SelectBox";
import TarjetaAsistencia from "../../components/reportes/TarjetaAsistencia";
import BarraHor from "../../components/reportes/graficos/BarraHor";
import Barras from "../../components/reportes/graficos/Barras";
import BarrasAsistencia from "../../components/reportes/graficos/BarrasAsistencia";
import Circular from "../../components/reportes/graficos/Circular";
import Tarjeta from "../../components/reportes/Tarjeta";
import ObtenerDatos from "../../components/formulario/Helpers/hooks/ObtenerDatos";

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

  const [aceptado, setAceptado] = useState(0);
  const [enProceso, setEnProceso] = useState(0);
  const [rechazado, setRechazado] = useState(0);
  ////////////////////////////////
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
        setApiDataUser(data.reportes_usuarios.reporte_general)
        setApiDataAsis(data.reportes_asistencias)
        //----------------------------------------------
        setTotalUsuarios(data.reportes_usuarios.reporte_total.total_usuarios);
        setUsuariosActivos(data.reportes_usuarios.reporte_total.usuarios_activos);
        setIngresosMes(data.reportes_usuarios.reporte_total.ingresos_mes[0].count);

        /////
        setTotalAsistencias((data.reportes_asistencias[0].department_attendance_count)+(data.reportes_asistencias[12].department_attendance_count)+(data.reportes_asistencias[17].department_attendance_count) );
        setTotalTardanzas((data.reportes_asistencias[0].department_absence_count)+(data.reportes_asistencias[12].department_absence_count)+(data.reportes_asistencias[17].department_absence_count));
        setTotalFaltas((data.reportes_asistencias[0].department_delay_count)+(data.reportes_asistencias[12].department_delay_count)+(data.reportes_asistencias[17].department_delay_count));
        setTotalJustificaciones((data.reportes_asistencias[0].department_justification_count)+(data.reportes_asistencias[12].department_justification_count)+(data.reportes_asistencias[17].department_justification_count));
        ////
        setAceptado(data.reportes_justificacion[0].total_justification_aceptado);
        setRechazado(data.reportes_justificacion[0].total_justification_rechazado);
        setEnProceso(data.reportes_justificacion[0].total_justification_en_proceso);

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
        setApiDataAsistenciasSector(data.reportes_asistencias);
      } else {
        console.error("Error al obtener datos de informes");
      }
    }

    fetchData();
  }, [token]);

  ////////////////////////////////
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
    let datosFiltrados = apiDataUser;
    let datosFiltradoAsistencia = apiDataAsis;
    if (departamento == 1) {
      console.log("Operativo");
      datosFiltrados = apiDataUser.filter((dato) => {
        return dato.department_name == "Departamento Operativo";
      });
      datosFiltradoAsistencia = apiDataAsis.filter((dato) => {
        return dato.department_name == "Departamento Operativo";
      });
    } else if (departamento == 2) {
      console.log("Comercial");
      datosFiltrados = apiDataUser.filter((dato) => {
        return dato.department_name == "Departamento Comercial";
      });
      datosFiltradoAsistencia = apiDataAsis.filter((dato) => {
        return dato.department_name == "Departamento Comercial";
      });
    } else if (departamento == 3) {
      console.log("Estratégico");
      datosFiltrados = apiDataUser.filter((dato) => {
        return dato.department_name == "Departamento Estratégico";
      });
      datosFiltradoAsistencia = apiDataAsis.filter((dato) => {
        return dato.department_name == "Departamento Estratégico";
      });
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
        <h1 className="mb-4 text-3xl">Reportes</h1>
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
            <button className="p-2 rounded bg-cv-cyan " onClick={borrar}>
              Limpiar
            </button>
            <button className="p-2 rounded bg-cv-primary " onClick={filtrar}>
              Filtrar
            </button>
          </div>
        </div>
      </section>
      {mostrar ? (
        <>
          <section className="flex flex-wrap items-start justify-start w-full py-3 text-2xl border-t-2 ">
            <h1>Usuarios</h1>
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
              <Tarjeta
                titulo="SALIDAS ÚLTIMO MES"
                porcentaje={10}
                numero={20}
              />
            </div>
            <div className="box-border flex items-start justify-between w-full gap-7">
              <div className="flex flex-col items-start w-4/6 gap-4 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80 box ">
                <h1 className="text-lg font-medium ">
                  USUARIOS ACTIVOS POR SECTOR
                </h1>
                <Barras barras={apiDataUsuariosSector} />
              </div>
              <div className="box-border w-2/6 p-5 mt-4 -ml-3 text-sm rounded-lg bg-cv-primary h-80">
                <h1 className="text-lg font-medium ">TIPOS DE SALIDA</h1>
                <BarraHor titulo="FINALIZO CONVENIO" total={80} porcentaje={80} />
                <BarraHor titulo="SE RETIRÓ" total={20} porcentaje={20} />
              </div>
            </div>
          </section>
          <section className="w-full py-3 text-2xl border-t-2 ">
            <h1>Asistencias</h1>
            <article>
              <div className="box-content flex items-start justify-start w-full gap-4 ">
                <div className="box-border w-2/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                <TarjetaAsistencia
                    name1="Aistencias"
                    name2="Tardanzas"
                    name3="faltas"
                    name4="justificaciones"
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
            <h1>Justificaciones</h1>
            <div className="box-content flex items-start justify-start w-full gap-4 ">
            <div className="box-border flex flex-col justify-between w-5/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                <h1 className="text-lg font-medium ">
                  Estado de Justificaciones
                </h1>
                <div className="w-full h-full">
                <Circular primero={aceptado} segundo={enProceso} tercero={rechazado} />
                </div>
              </div>
              <div className="box-border w-2/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                  <TarjetaAsistencia
                    name1="Total justificaciones"
                    name2="Justifiaciones Aceptadas"
                    name3="Justificaciones Rechazadas"
                    name4="Justificaciones en Progreso"
                    asistencias={totalAsistencias}
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
