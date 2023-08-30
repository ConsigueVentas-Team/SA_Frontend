import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./TablePaginationActions";
import { useEffect, useState } from "react";

export default function Tabla({ data, abrirEditarModal, abrirEliminarModal }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const CustomTableCell = ({ children }) => (
    <TableCell
      align="center"
      style={{ color: "white" }}
      className="whitespace-nowrap"
    >
      {children}
    </TableCell>
  );

  const headers = ["id", "Nombre"];
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    const maxPage = Math.ceil(data.length / rowsPerPage) - 1;
    if (newPage > maxPage) {
      setPage(maxPage);
    } else if (
      data.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
        .length === 0
    ) {
      setPage(newPage - 1);
    } else {
      setPage(newPage);
    }
  };
  useEffect(() => {
    const maxPage = Math.ceil(data.length / rowsPerPage) - 1;
    if (page > maxPage) {
      setPage(maxPage);
    } else if (
      data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .length === 0 &&
      page > 0
    ) {
      setPage(page - 1);
    }
  }, [data, page, rowsPerPage]);
  // useEffect(() => {
  //   const maxPage = Math.ceil(data.length / rowsPerPage) - 1;
  //   if (page > maxPage) {
  //     setPage(maxPage);
  //   } else if (
  //     data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //       .length === 0 &&
  //     page > 0
  //   ) {
  //     setPage(page - 1);
  //   }
  // }, [data, page, rowsPerPage]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{ width: "100%" }}
      className="bg-white rounded-md overflow-hidden mt-20"
    >
      <Paper sx={{ width: "100%", mb: 1 }}>
        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="Tabla Evaluaciones">
            <TableHead className="bg-cv-primary">
              <TableRow>
                {headers.map((header, index) => (
                  <CustomTableCell key={index}>{header}</CustomTableCell>
                ))}
                <TableCell
                  align="center"
                  style={{ color: "white", width: "200px" }}
                  className="whitespace-nowrap sticky right-0 bg-cv-primary"
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((departamento) => (
                  <TableRow
                    key={departamento.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      width="auto"
                      className="whitespace-nowrap"
                    >
                      {departamento.id}
                    </TableCell>
                    <TableCell align="center">{departamento.name}</TableCell>
                    <TableCell
                      align="center"
                      className="sticky right-0 p-1 z-10 bg-white"
                    >
                      <button
                        onClick={() => abrirEditarModal(departamento)}
                        className="p-2 border rounded-md text-green-500 hover:bg-green-500 hover:text-white active:scale-95 ease-in-out duration-300"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => abrirEliminarModal(departamento.id)}
                        className="p-2 border rounded-md text-red-500 hover:bg-red-500 hover:text-white active:scale-95 ease-in-out duration-300"
                      >
                        <DeleteIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}

              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          colSpan={3}
          page={Math.min(page, Math.ceil(data.length / rowsPerPage) - 1)}
          count={data.length}
          rowsPerPage={rowsPerPage}
          SelectProps={{
            inputProps: {
              "aria-label": "Filas por Pagina",
            },
            native: true,
          }}
          ActionsComponent={TablePaginationActions}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

Tabla.propTypes = {
  data: PropTypes.array.isRequired,
  abrirEditarModal: PropTypes.func.isRequired,
  abrirEliminarModal: PropTypes.func.isRequired,
};
