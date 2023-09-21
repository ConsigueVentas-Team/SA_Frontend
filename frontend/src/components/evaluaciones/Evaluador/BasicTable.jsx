import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import fakeData from './fakeData.json'
import { useMemo } from 'react'
import SearchBar from './SearchBar'


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

  const [globalFilter, setGlobalFilter] = useState('')

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
    state: {
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

  })


  return (

    <div className='p-2 max-w-5xl- mx-auto '>
      <div className=' justify-between mb-2'>
        <SearchBar value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Buscar por"
          className=" rounded-md border border-solid border-cv-primary bg-transparent p-2  text-cv-cyan outline-none "
        />
      </div>

      <div className='w-full bg-[#0e161b] shadow-md  rounded-t overflow-hidden'>
        <table className="w-full text-sm text-center text-white">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => <th key={header.id} className='px-6 py-4 whitespace-nowrap text-base uppercase'>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>)}
            </tr>
          ))}

          <tbody className='bg-cv-primary'>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-cv-secondary">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div className="w-full flex items-center justify-center md:justify-between bg-[#0e161b] rounded-b p-2">

        <span className="flex items-center justify-start gap-1">
          <div>Página</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </strong>
        </span>

        <div className=" flex items-center justify-center md:justify-between bg-[#0e161b]">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            className="  rounded disabled:opacity-30 justify-"
          >
            <FirstPageIcon />
          </button>

          <button
            onClick={table.previousPage}
            disabled={!table.getCanPreviousPage()}
            className="p-1  rounded disabled:opacity-30"
          >
            <KeyboardArrowLeftIcon />
          </button>



          <span className="flex items-center gap-1">
            | Ir a página:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="text-center w-10  rounded bg-[#0e161b]"
            />
          </span>

          <button
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}
            className="  rounded  disabled:opacity-30"
          >
            <KeyboardArrowRightIcon />
          </button>

          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="p-1 rounded disabled:opacity-30"
          >
            <LastPageIcon />
          </button>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2  rounded bg-[#0e161b]"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize} className="text-center  w-10  rounded bg-[#0e161b]">
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>


      </div>



    </div>


  )
}
