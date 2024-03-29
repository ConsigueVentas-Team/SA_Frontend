import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/logo.png";
import "jspdf-autotable";

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

  const [loading, setLoading] = useState(true);
  const [isCore, seIsCore] = useState(false);
  const [isDepart, setIsDepart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const url = new URL(import.meta.env.VITE_API_URL + "/reports/list");
      url.searchParams.append("page", 0);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const {data} = await response.json();
        setApiDataUser(data.reportes_usuarios.reporte_general);
        setApiDataAsis(data.reportes_asistencias);

        //----------------------------------------------
        setTotalUsuarios(data.reportes_usuarios.reporte_total.total_usuarios);
        setUsuariosActivos(
          data.reportes_usuarios.reporte_total.usuarios_activos
        );
        setIngresosMes(
          data.reportes_usuarios.reporte_total.ingresos_mes.count
        );

        /////
        const sumUniqueValues = (data, property) => {
          const uniqueValues = [...new Set(data.map((item) => item[property]))];
          return uniqueValues.reduce((acc, count) => acc + count, 0);
        };

        const totalAsistencias = sumUniqueValues(data.reportes_asistencias,"department_attendance_count");
        const totalFaltas = sumUniqueValues(data.reportes_asistencias,"department_absence_count");
        const totalTardanzas = sumUniqueValues(data.reportes_asistencias,"department_delay_count");
        const totalJustificaciones = sumUniqueValues(data.reportes_asistencias,"department_justification_count");

        setTotalAsistencias(totalAsistencias);
        setTotalFaltas(totalFaltas);
        setTotalTardanzas(totalTardanzas);
        setTotalJustificaciones(totalJustificaciones);

        /////
        setAceptado(
          data.reportes_justificacion.total_justification_aceptado
        );
        setRechazado(
          data.reportes_justificacion.total_justification_rechazado
        );
        setEnProceso(
          data.reportes_justificacion.total_justification_en_proceso
        );
        setTotalJus(data.reportes_justificacion.total_justifications);

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
        setLoading(false);
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
      setNucleos(listaNucleos.data);
      setDepartamentos(listaDepartamentos.data);
    }
    fetchData();
  }, []);

  const filtrar = () => {
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
          33: "Marketing",
        },
      },
      2: {
        name: "Departamento Comercial",
        cores: {
          31: "Atencion al Cliente",
          32: "Ejecutivo de Cuentas",
          8: "Logística",
          9: "Comercial",
        },
      },
      3: {
        name: "Departamento Estratégico",
        cores: {
          34: "Analisis de Datos",
          4: "Publicidad Digital",
        },
      },
      15: {
        name: "Departamento Gestion",
        cores: {
          3: "Talento Humano",
          2: "Administracion",
        },
      },
      14: {
        name: "Departamento Automatizacion",
        cores: {
          1: "Sistemas",
          7: "Diseño Web",
        },
      },
    };

    const departamentoInfo = departamentoMappings[departamento];

    if (departamentoInfo) {
      datosFiltrados = apiDataUser.filter(
        (dato) => dato.department_name == departamentoInfo.name
      );
      datosFiltradoAsistencia = apiDataAsis.filter(
        (dato) => dato.department_name == departamentoInfo.name
      );
      setIsDepart(true);
      const coreName = departamentoInfo.cores[core];
      if (coreName) {
        datosFiltrados = apiDataUser.filter(
          (dato) => dato.core_name == coreName
        );
        datosFiltradoAsistencia = apiDataAsis.filter(
          (dato) => dato.core_name == coreName
        );
        seIsCore(true);
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

  const loadImage = async (imagePath) => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    // ------------------------------------------Logo
    const logoDataUrl = await loadImage(logo);
    const logoWidth = 30;
    const logoHeight = 30;
    const tHeight = 9;
    const logoX = 20; 
    const logoY = 20;
    doc.addImage(logoDataUrl, "JPEG", logoX, logoY, logoWidth, logoHeight);

    // -------------------------------------------titulo
    const titleText = "Agencia Consigue Ventas Online";
    const fontSize = 32;
    const titleX = logoX + logoWidth + 10; 
    const titleY = logoY + tHeight / 3 + fontSize * 0.35; 

    doc.setFontSize(fontSize);
    doc.setTextColor(0, 114, 177);

    const maxWidth = 150; 
    doc.text(titleText, titleX, titleY, { maxWidth });

    // --------------------------------------------------tabla usuarioss
    const tableData = [
      ["USUARIOS", "ASISTENCIAS", "JUSTIFICACIONES"],
      [
        `Total: ${totalUsuarios}\nActivos: ${usuariosActivos}\nIngresos último mes: ${ingresosMes}`,
        `Total: ${totalAsistencias}\nTardanzas: ${totalTardanzas}\nFaltas: ${totalFaltas}\nJustificaciones: ${totalJustificaciones}`,
        `Total: ${totalJus}\nAceptadas: ${aceptado}\nRechazadas: ${rechazado}\nEn proceso: ${enProceso}`,
      ],
    ];

    doc.autoTable({
      startY: 60,
      head: [
        [
          "",
          { content: "USUARIOS", colSpan: 3, styles: { halign: "left" } },
          "",
          "",
        ],
      ],
      body: tableData,
    });

    // --------------------------------------------------USUARIOS SECTORESSS

    doc.setFontSize(16);
    doc.text("USUARIOS POR SECTORES:", 14, 106);

    if (isDepart && !isCore) {
      const uniqueCoreNames = new Set();
      const usuariosSectorData = [];

      apiDataUsuariosSector.forEach((sector) => {
        const coreName = sector.core_name.toUpperCase();
        if (!uniqueCoreNames.has(coreName)) {
          uniqueCoreNames.add(coreName);
          usuariosSectorData.push([
            { content: coreName, styles: { fontStyle: "bold" } },
            { content: `Usuarios activos: ${sector.core_user_count}` },
          ]);
        }
      });

      doc.autoTable({
        startY: 110,
        head: [["Sector", "Usuarios Activos"]],
        body: usuariosSectorData,
      });
    } else if (isDepart && isCore) {
      const usuariosCoreData = apiDataUsuariosSector.map((sector) => [
        {
          content: sector.profile_name.toUpperCase(),
          styles: { fontStyle: "bold" },
        },
        { content: `Usuarios activos: ${sector.profile_user_count}` },
      ]);

      doc.autoTable({
        startY: 110,
        head: [["Sector", "Usuarios Activos"]],
        body: usuariosCoreData,
      });
    } else {
      const usuariosSectorData = apiDataUsuariosSector.map((sector) => [
        {
          content: sector.department_name.toUpperCase(),
          styles: { fontStyle: "bold" },
        },
        { content: `Usuarios activos: ${sector.department_user_count}` },
      ]);

      doc.autoTable({
        startY: 110,
        head: [["Sector", "Usuarios Activos"]],
        body: usuariosSectorData,
      });
    }
    // ------IMAGENS
    const usuariosActivosPorSector = document.querySelector(
      ".usuarios-activos-por-sector"
    );
    if (usuariosActivosPorSector) {
      const usuariosActivosCanvas = await html2canvas(usuariosActivosPorSector);
      const usuariosActivosDataUrl =
        usuariosActivosCanvas.toDataURL("image/png");
      doc.addImage(
        usuariosActivosDataUrl,
        "PNG",
        14,
        doc.autoTable.previous.finalY + 10,
        180,
        70
      );
    }

    // --------------------------------------------------ASISTENCIAS SECTORESSS
    if (apiDataAsistenciasSector.length > 0) {
      doc.addPage();
      doc.setFontSize(16);
      doc.text("ASISTENCIA POR SECTORES:", 14, 24);

      const processedNames = new Set();
      const asistenciasSectorData = [];

      apiDataAsistenciasSector.forEach((sector) => {
        let name, attendance, absence, delay, justification;

        if (isDepart && !isCore) {
          name = sector.core_name.toUpperCase();

          if (!processedNames.has(name)) {
            processedNames.add(name);
            attendance = sector.core_attendance_count;
            absence = sector.core_absence_count;
            delay = sector.core_delay_count;
            justification = sector.core_justification_count;

            asistenciasSectorData.push([
              { content: name, styles: { fontStyle: "bold" } },
              { content: attendance },
              { content: delay },
              { content: absence },
              { content: justification },
            ]);
          }
        } else if (isDepart && isCore) {
          name = sector.profile_name.toUpperCase();
          attendance = sector.profile_attendance_count;
          absence = sector.profile_absence_count;
          delay = sector.profile_delay_count;
          justification = sector.profile_justification_count;

          asistenciasSectorData.push([
            { content: name, styles: { fontStyle: "bold" } },
            { content: attendance },
            { content: delay },
            { content: absence },
            { content: justification },
          ]);
        } else {
          name = sector.department_name.toUpperCase();
          attendance = sector.department_attendance_count;
          absence = sector.department_absence_count;
          delay = sector.department_delay_count;
          justification = sector.department_justification_count;

          asistenciasSectorData.push([
            { content: name, styles: { fontStyle: "bold" } },
            { content: attendance },
            { content: delay },
            { content: absence },
            { content: justification },
          ]);
        }
      });

      doc.autoTable({
        startY: 30,
        head: [
          ["Sector", "Asistencias", "Tardanzas", "Faltas", "Justificaciones"],
        ],
        body: asistenciasSectorData,
      });

      // -------------------------------IMAGEN
      const asistenciaPorSector = document.querySelector(
        ".asistencia-por-sector"
      );
      if (asistenciaPorSector) {
        const asistenciaCanvas = await html2canvas(asistenciaPorSector);
        const asistenciaDataUrl = asistenciaCanvas.toDataURL("image/png");
        doc.addImage(
          asistenciaDataUrl,
          "PNG",
          14,
          doc.autoTable.previous.finalY + 10,
          180,
          80
        );
      }
    }

    doc.save("consigue_ventas_report.pdf");
  };

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
            <SelectBox
              label={"Núcleo"}
              data={nucleosFiltrados}
              valor={core}
              setSelectedValue={setCore}
            ></SelectBox>
          </div>
          <div className="flex gap-3">
            <button
              className="p-2 rounded pl-4 pr-4 text-gray-950 bg-red-500 flex items-center hover:bg-red-600"
              onClick={generatePDF}
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
                    <div className="flex flex-col items-start w-full gap-4 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80 box usuarios-activos-por-sector">
                      <h1 className="text-lg font-medium">
                        USUARIOS ACTIVOS POR SECTOR
                      </h1>
                      <Barras
                        barras={apiDataUsuariosSector}
                        isCore={isCore}
                        isDepart={isDepart}
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
                      <div className="box-border flex flex-col justify-between w-5/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80 asistencia-por-sector">
                        <h1 className="text-lg font-medium ">
                          ASISTENCIAS POR SECTORES
                        </h1>
                        <div className="w-full h-5/6">
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
