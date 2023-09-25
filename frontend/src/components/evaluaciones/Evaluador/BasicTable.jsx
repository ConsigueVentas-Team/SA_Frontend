import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { AES, enc } from "crypto-js";
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
  function Modal({ isOpen, onClose, data }) {
    if (!isOpen) return null;


    return (
      <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Datos del colaborador</h2>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  ID: {data.name}+{data.surname}
                </p>
                <p className="text-sm text-gray-500">
                  Email: {data.email}
                </p>
                <p className="text-sm text-gray-500">
                  DNI: {data.dni}
                </p>
                <p className="text-sm text-gray-500">
                  Departament: {data.departament}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  function handleButtonClick(data) {
    setModalData(data);
    setIsModalOpen(true);
  }

  const data = useMemo(() => users, [users]);

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
        <button onClick={() => handleButtonClick(row.original)}
          className='p-2 text-green-500 duration-300 ease-in-out border rounded-md border-cv-secondary hover:bg-green-500 hover:text-white active:scale-95'
        >
          <EditIcon />
        </button>
      ),
    },
  ];

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

  });



  return (
    <div className='p-2 max-w-5xl- mx-auto '>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={modalData} />
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
      <div className="w-full flex items-center justify-center md:justify-between bg-[#0e161b] rounded-b p-2">

        <span className="flex items-center justify-start gap-1 p-3">
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
