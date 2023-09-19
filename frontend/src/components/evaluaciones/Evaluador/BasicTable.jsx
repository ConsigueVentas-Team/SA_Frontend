import fakeData from './fakeData.json';
import { useMemo } from 'react';
import MUIDataTable from "mui-datatables";

function BasicTable() {
  const data = useMemo(() => fakeData, []);

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: { sort: true } 
    },
    {
      name: 'dni',
      label: 'DNI',
      options: { sort: true }
    },
    {
      name: 'colaborador',
      label: 'Colaborador',
      options: { sort: true }
    },
    {
      name: 'rol',
      label: 'Rol',
      options: { sort: true }
    },
    {
      name: 'estado',
      label: 'Estado',
      options: { sort: true }
    },
    {
      name: 'acciones',
      label: 'Acciones',
      options: { sort: true }
    }
  ];

  const options = {
    selectableRows: false,
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/ocultar columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },
  };

  return (
    <MUIDataTable
      title={"Lista de Usuarios"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default BasicTable;