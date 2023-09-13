import { useState } from "react";

import SelectBox from "../../components/reportes/SelectBox";
import TarjetaAsistencia from "../../components/reportes/TarjetaAsistencia";
import BarraHor from "../../components/reportes/graficos/BarraHor";
import Barras from "../../components/reportes/graficos/Barras";
import Circular from "../../components/reportes/graficos/Circular";
import Tarjeta from "../../components/reportes/tarjeta";
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
    <div className="flex items-center gap-4 flex-col w-full  ">
      <section className="flex gap-5 flex-col ">
        <h1 className="text-3xl mb-4">Reportes</h1>
        <div className="flex justify-between items-start">
          <div className="w-full flex flex-wrap gap-10">
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
            <button className="bg-cv-cyan p-2 rounded " onClick={borrar}>
              Limpiar
            </button>
            <button className="bg-cv-primary p-2 rounded " onClick={filtrar}>
              Filtrar
            </button>
          </div>
        </div>
      </section>
      {mostrar ? (
        <>
          <section className=" w-full border-t-2 text-2xl py-3 flex flex-wrap justify-start items-start ">
            <h1>Usuarios</h1>
            <div className="flex w-full justify-between gap-y-2 mt-4 gap-4 flex-wrap sm:flex-nowrap">
              {tarjetasData.map((tarjeta) => (
                <Tarjeta
                  titulo={tarjeta.titulo}
                  porcentaje={tarjeta.porcentaje}
                  numero={tarjeta.numero}
                ></Tarjeta>
              ))}
            </div>
            <div className="w-full gap-7 flex items-start box-border justify-between">
              <div className="mt-4 w-4/6 text-sm bg-cv-primary flex items-start flex-col p-5 rounded-lg gap-4 h-80 box ">
                <h1 className="text-lg font-medium ">
                  USUARIOS ACTIVOS POR SECTOR
                </h1>
                <Barras></Barras>
              </div>
              <div className="w-2/6 bg-cv-primary p-5 rounded-lg  mt-4 h-80 box-border -ml-3 text-sm">
                <BarraHor></BarraHor> <BarraHor></BarraHor>
              </div>
            </div>
          </section>
          <section className=" w-full border-t-2 text-2xl py-3 ">
            <h1>Asistencias</h1>
            <article>
              <div className="w-full flex justify-start items-start gap-4 box-content ">
                <div className="w-2/6 bg-cv-primary p-5 rounded-lg  mt-4 h-80 box-border  text-sm">
                  <TarjetaAsistencia></TarjetaAsistencia>
                </div>
                <div className="w-4/6 bg-cv-primary p-5 rounded-lg  mt-4 h-80 box-border  text-sm flex  flex-col justify-between">
                  <h1 className="text-lg font-medium ">
                    Asistencia por Sectores
                  </h1>
                  <div className="w-full h-5/6">
                    <Barras barras={3}></Barras>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-start items-start gap-4 box-content ">
                <div className="w-4/6 bg-cv-primary p-5 rounded-lg  mt-4 h-80 box-border  text-sm flex  flex-col justify-between">
                  <h1 className="text-lg font-medium ">Justificaciones</h1>
                  <div className="w-full h-5/6">
                    <Barras></Barras>
                  </div>
                </div>
                <div className="w-5/6 bg-cv-primary p-5 rounded-lg  mt-4 h-80 box-border  text-sm flex  flex-col justify-between">
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
        <section className="w-full h-full   flex justify-center items-center mt-20">
          <div className="h-96 w-96 bg-cv-primary rounded-lg p-5 flex items-center justify-center">
            <p>No hay registros</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Reportes;
