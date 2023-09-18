import { useState } from "react";

import SelectBox from "../../components/reportes/SelectBox";
import TarjetaAsistencia from "../../components/reportes/TarjetaAsistencia";
import BarraHor from "../../components/reportes/graficos/BarraHor";
import Barras from "../../components/reportes/graficos/Barras";
import Circular from "../../components/reportes/graficos/Circular";
import Tarjeta from "../../components/reportes/Tarjeta";
import { useEffect } from "react";
import ObtenerDatos from "../../components/formulario/Helpers/hooks/ObtenerDatos";
import { AES, enc } from "crypto-js";
const Reportes = () => {
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);
  const [departamentos, setDepartamentos] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [nucleosFiltrados, setNucleosFiltrados] = useState([]);
  //crear para un useState para cada valor de cada select
  const [core, setCore] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [turno, setTurno] = useState("");
  const [mes, setMes] = useState("");
  const [year, setYear] = useState("");
  useEffect(() => {
    async function fetchData() {
      const listaDepartamentos = await ObtenerDatos(token, "departments");
      const listaNucleos = await ObtenerDatos(token, "cores");
      setNucleos(listaNucleos);
      setDepartamentos(listaDepartamentos);
    }
    fetchData();
  }, []);

  const tarjetasData = [
    { titulo: "Total Usuarios", porcentaje: 15, numero: 465165 },
    { titulo: "Total Usuarios", porcentaje: 2, numero: 465165 },
    { titulo: "Total Usuarios", porcentaje: 20, numero: 465165 },
    { titulo: "Total Usuarios", porcentaje: 5, numero: 465165 },
  ];
  const [mostrar, setMostrar] = useState(false);
  const filtrar = () => {
    setMostrar(true);
  };
  const borrar = () => {
    setMostrar(false);

    setCore("");
    setDepartamento("");
    setTurno("");
    setMes("");
    setYear("");
  };
  const mostrarNucleo = (id_departamento) => {
    console.log(" estoy aqui, mi id es ", id_departamento);
    const filtrado = nucleos.filter(
      (nucleo) => id_departamento == nucleo.department.id
    );
    setNucleosFiltrados(filtrado);
    console.log(nucleosFiltrados);
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
            <SelectBox
              setSelectedValue={setMes}
              valor={mes}
              label={"Mes"}
              data={[
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
              ]}
            ></SelectBox>
            <SelectBox
              setSelectedValue={setYear}
              valor={year}
              label={"Año"}
              data={[2023]}
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
              {tarjetasData.map((tarjeta) => (
                <Tarjeta
                  titulo={tarjeta.titulo}
                  porcentaje={tarjeta.porcentaje}
                  numero={tarjeta.numero}
                ></Tarjeta>
              ))}
            </div>
            <div className="box-border flex items-start justify-between w-full gap-7">
              <div className="flex flex-col items-start w-4/6 gap-4 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80 box ">
                <h1 className="text-lg font-medium ">
                  USUARIOS ACTIVOS POR SECTOR
                </h1>
                <Barras></Barras>
              </div>
              <div className="box-border w-2/6 p-5 mt-4 -ml-3 text-sm rounded-lg bg-cv-primary h-80">
                <BarraHor></BarraHor> <BarraHor></BarraHor>
              </div>
            </div>
          </section>
          <section className="w-full py-3 text-2xl border-t-2 ">
            <h1>Asistencias</h1>
            <article>
              <div className="box-content flex items-start justify-start w-full gap-4 ">
                <div className="box-border w-2/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                  <TarjetaAsistencia></TarjetaAsistencia>
                </div>
                <div className="box-border flex flex-col justify-between w-4/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                  <h1 className="text-lg font-medium ">
                    Asistencia por Sectores
                  </h1>
                  <div className="w-full h-5/6">
                    <Barras barras={3}></Barras>
                  </div>
                </div>
              </div>
              <div className="box-content flex items-start justify-start w-full gap-4 ">
                <div className="box-border flex flex-col justify-between w-4/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                  <h1 className="text-lg font-medium ">Justificaciones</h1>
                  <div className="w-full h-5/6">
                    <Barras></Barras>
                  </div>
                </div>
                <div className="box-border flex flex-col justify-between w-5/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80">
                  <h1 className="text-lg font-medium ">
                    Estado de Justificaciones
                  </h1>
                  <div className="w-full h-full">
                    <Circular></Circular>
                  </div>
                </div>
              </div>
            </article>
          </section>
          <section></section>
        </>
      ) : (
        <section className="flex items-center justify-center w-full h-full mt-20">
          {/* hola */}
          <img src="./2Q.png" alt="" className="w-1/4 rounded-2xl " />
        </section>
      )}
    </div>
  );
};

export default Reportes;
