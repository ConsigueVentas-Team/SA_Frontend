import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { AES, enc } from "crypto-js";

import { Link } from 'react-router-dom';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useMemo, useEffect } from "react";
import SearchBar from './SearchBar'


export default function BasicTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    shift: "",
    department: "",
    core: "",
    position: "",
  });

  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  const obtenerUsuarios = useMemo(() => async (page) => {
    setIsLoading(true);
    try {
      const url = new URL(import.meta.env.VITE_API_URL + "/users");

      url.searchParams.append("page", page);

      for (const [key, value] of Object.entries(filters)) {
        if (value) url.searchParams.append(key, value);
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data.data);
        setIsLoading(false);
      } else {
        console.error("Error al obtener los usuarios:", data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setIsLoading(false);
    }
  }, [filters, token]);

  useEffect(() => {
    obtenerUsuarios(0);
  }, [obtenerUsuarios]);



  const [globalFilter, setGlobalFilter] = useState('');


  function handleButtonClick(data) {

    console.log(data.name)
  }

  const dataFinal = useMemo(() => users, [users]);

  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'name',
      cell: ({ row }) => (
        <span>
          {row.original.name} {row.original.surname}
        </span>
      ),
    },
    {
      header: 'Correo',
      accessorKey: 'email',
    },
    {
      header: 'DNI',
      accessorKey: 'dni',
    },
    {
      header: 'Rol',
      accessorKey: 'rol',
      cell: ({ row }) => (
        <span>
          {row.original.roles[0].name}
        </span>),
    },
    {
      header: 'Departamento',
      accessorKey: 'core', cell: ({ row }) => (
        <span>
          {row.original.position[0].core.department.name}
        </span>
      ),
    },
    {
      header: 'Estado',
      accessorKey: 'estado',
    },
    {
      header: 'Acciones',
      accessorKey: 'acciones',
      cell: ({ row }) => (
        <Link to={`/evaluacion/${row.original.id}`} key={row.original.id}>
          <button
            onClick={() => handleButtonClick(row.original)}
            className='p-2 text-green-500 duration-300 ease-in-out border rounded-md border-cv-secondary hover:bg-green-500 hover:text-white active:scale-95'
          >
            <EditIcon />
          </button>
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: dataFinal,
    columns,
    state: {
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

  });



  return (
    <div className='p-2 max-w-5xl- mx-auto '>

      <div className=' justify-between mb-2'>
        <SearchBar value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Buscar por"
          className="rounded-md border border-solid border-cv-primary bg-transparent p-2 text-cv-cyan outline-none w-full md:w-full lg:w-[40%] xl:w-[30%]"
        />
      </div>
      {isLoading ? (
        <div className="text-center">Cargando...</div>
      ) : (
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
      )}

      <div className="w-full block flex items-center bg-[#0e161b] rounded-b p-2">

        <p className="text-sm sm:text-base text-white p-3 md:pl-1 md:pr-3 md:py-1 md:leading-none">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </p>

        <div className='inlineblock'></div>

        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          className="p-1 rounded disabled:opacity-30"
        >


          <FirstPageIcon />
        </button>

        <button
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
          className="p-1 rounded disabled:opacity-30"
        >
          <KeyboardArrowLeftIcon />
        </button>

        <span className="flex items-center gap-1  text-sm text-white sm:text-base">
          | Ir a página:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="text-center w-10 rounded bg-[#0e161b] text-white"
          />
        </span>

        <button
          onClick={table.nextPage}
          disabled={!table.getCanNextPage()}
          className="p-1 rounded disabled:opacity-30"
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

        <label htmlFor="pageSize" className="text-white">Mostrar:</label>
        <select
          id="pageSize"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 rounded bg-[#0e161b] text-white"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>


      </div>

    </div>


  )
}
