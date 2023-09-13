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
      <div className='pt-2 gap-6'>
        <button
          className="p-1  text-xs md:text-[1rem] lg:text-[1rem]  bg-cv-primary rounded"
          onClick={() => table.setPageIndex(0)}>
          {'<<'}
        </button>
        <button
          className="p-1 text-xs md:text-[1rem] lg:text-[1rem]  bg-cv-primary rounded"
          onClick={() => table.previousPage()}>
          Previous Page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          className="p-1 text-xs md:text-[1rem] lg:text-[1rem]  bg-cv-primary rounded"
          onClick={() => table.nextPage()}>
          Next Page
        </button>
        <button
          className="p-1 text-xs md:text-[1rem] lg:text-[1rem]  bg-cv-primary rounded"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          {'>>'}
        </button>
      </div>
    </div>


  )
}
