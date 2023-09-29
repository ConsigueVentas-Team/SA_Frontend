// import { useState, useMemo } from "react";
// import {
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable
// } from '@tanstack/react-table'
// import SearchBar from "../Evaluador/SearchBar";
// import PaginationControls from "../Evaluador/PaginationControls";
// import { useEvaluationApi } from "../hooks/EvaluationApi";


// function ListaNota({ filters }) {
//     const [globalFilter, setGlobalFilter] = useState("");
//     const { notas: notas, isLoading } = useEvaluationApi(filters);

//     const dataFinal = useMemo(() => notas, [notas]);

//     const columns = [
//         {
//             header: "Id",
//             accessorKey: "id",
//         },
//         {
//             header: "Fecha",
//             accessorKey: "date",
//         },
//         {
//             header: "ID USUARIO",
//             accessorKey: "user_id",
//         },
//         {
//             header: "Tipo de Evaluacion",
//             accessorKey: "evaluation_type",
//         },
//         {
//             header: "Fwcha de Creación",
//             accessorKey: "created_at",
//         },
//         {
//             header: "Fecha de Revision",
//             accessorKey: "updated_at",
//         },
//     ];

//     const table = useReactTable({
//         data: dataFinal,
//         columns,
//         state: {
//             globalFilter,
//         },
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//     });

//     return (
//         <div className="p-2 max-w-5xl- mx-auto">
//             <div className="justify-between mb-2">
//                 <SearchBar
//                     value={globalFilter ?? ""}
//                     onChange={(value) => setGlobalFilter(String(value))}
//                     placeholder="Buscar por"
//                     className="rounded-md border border-solid border-cv-primary bg-transparent p-2 text-cv-cyan outline-none w-full md:w-full lg:w-[40%] xl:w-[30%]"
//                 />
//             </div>
//             {isLoading ? (
//                 <div className="text-center">Cargando...</div>
//             ) : (
//                 <div className="w-full bg-[#0e161b] shadow-md rounded-t overflow-hidden overflow-x-auto scrollbar">
//                     <table className="w-full text-sm text-center text-white">
//                         <thead>
//                             {table.getHeaderGroups().map((headerGroup) => (
//                                 <tr key={headerGroup.id}>
//                                     {headerGroup.headers.map((header) => (
//                                         <th
//                                             key={header.id}
//                                             className="px-6 py-4 whitespace-nowrap text-base uppercase"
//                                         >
//                                             {flexRender(header.column.columnDef.header, header.getContext())}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </thead>
//                         <tbody className="bg-cv-primary">
//                             {table.getRowModel().rows.map((row) => (
//                                 <tr key={row.id} className="border-b border-cv-secondary">
//                                     {row.getVisibleCells().map((cell) => (
//                                         <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//             <PaginationControls table={table} />
//         </div>
//     );
// }

// export default ListaNota

import { useEffect } from "react";
import { useEvaluationApi } from "../hooks/EvaluationApi";
function ListaNotas({ filters }) {
    const { notas, isLoading } = useEvaluationApi(filters);
    useEffect(() => {
        console.log("notas:", notas); // Esto imprimirá los datos de la API en la consola
    }, [notas]);


    return (
        <div>
            <h1>Notas de Evaluación</h1>
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <ul>
                    {notas.map((nota) => (
                        <>
                            <li key={nota.id}>{nota.id}</li>
                            <li key={nota.id}>{nota.user_id}</li>
                            <li key={nota.id}>{nota.evaluation_type}</li>
                            <li key={nota.id}>{nota.date}</li>
                        </>

                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListaNotas;
