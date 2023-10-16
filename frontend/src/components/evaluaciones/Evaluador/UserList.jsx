import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SearchBar from "./SearchBar";
import PaginationControls from "./PaginationControls";
import { useUserApi } from "../hooks/UserApi";

export default function UserList({ filters }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const { users, isLoading } = useUserApi(filters);
  console.log("Usuarios:", JSON.stringify(users, null, 2));
  const filteredUsers = useMemo(() => users.filter(user => user.status === true), [users]);

  const dataFinal = useMemo(() => filteredUsers, [filteredUsers]);
  const columns = [
    {
      header: "Nombre",
      accessorKey: "name",
      cell: ({ row }) => (
        <span>
          {row.original.name} {row.original.surname}
        </span>
      ),
    },
    {
      header: "Correo",
      accessorKey: "email",
    },
    {
      header: "DNI",
      accessorKey: "dni",
    },
    {
      header: "Rol",
      accessorKey: "rol",
      cell: ({ row }) => <span>{row.original.roles[0].name}</span>,
    },
    {
      header: "Departamento",
      accessorKey: "core",
      cell: ({ row }) => (
        <span>{row.original.position[0].core.department.name}</span>
      ),
    },

    {
      header: "Acciones",
      accessorKey: "acciones",
      cell: ({ row }) => (
        <Link
          to={`/evaluacion/${row.original.id}/${row.original.name}-${row.original.surname}`}
          key={row.original.id}
        >
          <button
            onClick={() => row.original.id}
            className="p-2 text-green-500 duration-300 ease-in-out border rounded-md border-cv-secondary hover:bg-green-500 hover:text-white active:scale-95"
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
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-2 max-w-5xl- mx-auto">
      <div className="justify-between mb-2">
        <SearchBar
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Buscar por"
          className="rounded-md border border-solid border-cv-primary bg-transparent p-2 text-cv-cyan outline-none w-full md:w-full lg:w-[40%] xl:w-[30%]"
        />
      </div>
      {isLoading ? (
        <div className="text-gray-400 font-md py-2 px-2">Cargando ...</div>
      ) : (
        <div className="w-full bg-[#0e161b] shadow-md rounded-t overflow-hidden overflow-x-auto scrollbar">
          <table className="w-full text-sm text-center text-white">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 whitespace-nowrap text-base uppercase"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-cv-primary">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-cv-secondary">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <PaginationControls table={table} />
    </div>
  );
}