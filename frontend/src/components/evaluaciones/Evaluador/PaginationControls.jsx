import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Componente de Paginación
function PaginationControls({ table }) {
    return (
        <div className="w-full flex items-center justify-between bg-[#0e161b] rounded-b p-2">

            <p className="text-sm sm:text-base text-white p-3 md:pl-1 md:pr-3 md:py-1 md:leading-none">
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </p>

            <div className=' flex'>

                <div>
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

                {/* <span className="flex items-center gap-1  text-sm text-white sm:text-base">
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
        </span> */}

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


            </div>
        </div>
    );
}

export default PaginationControls;
