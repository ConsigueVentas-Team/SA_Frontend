import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import fakeData from './fakeData.json'
import { useMemo } from 'react'


export default function BasicTable() {


  // {
  //   "id": 1,
  //   "dni": "96-2264310",
  //   "colaborador": "Svend Thal",
  //   "rol": "Lider Nucleo",
  //   "estado": "boton",
  //   "acciones": "boton"
  // }

  const data = useMemo(() => fakeData, [])

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id'
    }, {
      header: 'DNI',
      accessorKey: 'dni'
    }, {
      header: 'Colaborador',
      accessorKey: 'colaborador'
    }, {
      header: 'Rol',
      accessorKey: 'rol'
    }, {
      header: 'Estado',
      accessorKey: 'estado'
    }, {
      header: 'Acciones',
      accessorKey: 'acciones'
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

  })


  return (

    <div>

      <table className="text-xs md:text-[1rem] lg:text-[1rem] w-full table-auto bg-cv-primary rounded">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => <th key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>)}
          </tr>
        ))}

        <tbody >
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} className={` rounded text-center p-4 ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
            `}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>



      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          disabled={!table.getCanPreviousPage()}
          className="p-1  bg-cv-primary rounded px-2 disabled:opacity-30"
          onClick={() => table.setPageIndex(0)}>
          {'<<'}
        </button>


        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1  bg-cv-primary rounded px-2 disabled:opacity-30"
        >
          {"<"}
        </button>

        <span className="flex items-center gap-1">
          <div>Página</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Ir a página:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="text-center  p-1  w-10 bg-cv-primary rounded"
          />
        </span>


        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1  bg-cv-primary rounded px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <button
          disabled={!table.getCanNextPage()}
          className="p-1  bg-cv-primary rounded px-2 disabled:opacity-30"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          {'>>'}
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-cv-primary rounded"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="text-center  p-1  w-10 bg-cv-primary rounded">
              Mostrar {pageSize}
            </option>
          ))}
        </select>



      </div>
    </div>


  )
}
