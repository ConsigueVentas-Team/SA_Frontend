import * as React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./TablePaginationActions";
export default function Tabla({
  data,
  abrirEditarModal,
  // deleteUser,
  filterName,
  filterDepartment,
  filterDate,
  filterShift,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const [showWarning, setShowWarning] = useState(false);
  //const [rowDelete, setRowDelete] = useState(null)
  const CustomTableCell = ({ children }) => (
    <TableCell
      align="center"
      style={{ color: "white" }}
      className="whitespace-nowrap"
    >
      {children}
    </TableCell>
  );

  const headers = ["Nombre", "Email", "DNI"];
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //quita acentos en los filtros
  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  return (
    <Box
      sx={{ width: "100%" }}
      className="bg-white rounded-md overflow-hidden mt-20"
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
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
              {data.map((users) => (
                <TableRow
                  key={users.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="left"
                    width="auto"
                    className="whitespace-nowrap "
                  >
                    {users.user &&
                      users.user[0]?.name + " " + users.user[0]?.surname}
                  </TableCell>

                  <TableCell align="left">
                    {users.user && users.user[0]?.email}
                  </TableCell>
                  <TableCell align="center">{users.dni}</TableCell>
                  <TableCell
                    align="center"
                    className="sticky right-0 p-1 z-10 bg-white"
                  >
                    <button
                      onClick={() => abrirEditarModal(users)}
                      className="p-2 border rounded-md text-green-500 hover:bg-green-500 hover:text-white active:scale-95 ease-in-out duration-300"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => showModalWarning(users.id)}
                      className="p-2 border rounded-md text-red-500 hover:bg-red-500 hover:text-white active:scale-95 ease-in-out duration-300"
                    >
                      <DeleteIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          colSpan={3}
          page={page}
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
