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
      accessorKey: 'id',
      footer: 'ID'
    }, {
      header: 'DNI',
      accessorKey: 'dni',
      footer: 'DNI'
    }, {
      header: 'Colaborador',
      accessorKey: 'colaborador',
      footer: 'colaborador'
    }, {
      header: 'Rol',
      accessorKey: 'rol',
      footer: 'Rol'
    }, {
      header: 'Estado',
      accessorKey: 'estado',
      footer: 'Estado'
    }, {
      header: 'Acciones',
      accessorKey: 'acciones',
      footer: 'Acciones'
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


  return (

    <div>

      <table className="text-xs md:text-[1rem] lg:text-[1rem] w-full table-auto bg-cv-primary rounded"
      >
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => <th key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>)}
          </tr>
        ))}

        <tbody>
          {table.getRowModel().rows.map((row, i )=> (
            <tr key={row.id} className={` text-center p-4 ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
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
    </div>


  )
}
