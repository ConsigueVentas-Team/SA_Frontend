import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../../assets/logo.png";
import "jspdf-autotable";

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

const generatePDF = async (
    totalUsuarios,
    usuariosActivos,
    ingresosMes,
    totalAsistencias,
    totalTardanzas,
    totalFaltas,
    totalJustificaciones,
    totalJus,
    aceptado,
    rechazado,
    enProceso,
    departamento,
    reportDeparment,
    userDataBySector,
    apiDataAsistenciasSector
    ) => {

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

    let usuariosSectorData = [];

    //Si no se a seleccionado el departamento o el nucleo se mostrará una
    //en el pdf todos los departamentos. Sino se mostrar los datos del departamento
    //o núcleo elegido en el filtro
    if(departamento == "") usuariosSectorData = reportDeparment;    
    else usuariosSectorData = userDataBySector;                  

    usuariosSectorData = usuariosSectorData.map((sector) => [
      {
        content: sector.name,
        styles: { fontStyle: "bold" },
      },
      { content: 
          sector['Activos']
        },                          
      { content: 
          sector['Termino su convenio']
        },                          
      { content: 
          sector['Retirado']
      },         
    ])           

    doc.autoTable({
      startY: 110,
      head: [["Sector", "Usuarios Activos", "retirados", "convenio"]],
      body: usuariosSectorData,
    });

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
        const name ='asistencia'
        const attendance = sector.department_attendance_count;
        const absence = sector.department_absence_count;
        const delay = sector.department_delay_count;
        const justification = sector.department_justification_count;

        asistenciasSectorData.push([
        { content: name, styles: { fontStyle: "bold" } },
        { content: attendance },
        { content: delay },
        { content: absence },
        { content: justification },
        ]);
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

export default generatePDF;