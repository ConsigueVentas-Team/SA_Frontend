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
import { createTheme, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
export default function Tabla({
  data,
  abrirEditarModal,
  abrirEliminarModal,
  nucleo = null,
  perfil = null,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const CustomTableCell = ({ children }) => (
  //   <TableCell
  //     align="center"
  //     style={{ color: "white" }}
  //     className="whitespace-nowrap "
  //   >
  //     {children}
  //   </TableCell>
  // );
  const CustomTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `1px solid #515151
    `,
    color: "white",
    whiteSpace: "nowrap",
    alignContent: "center",
    textAlign: "center",
    fontSize: "1.05rem",
    textTransform: "uppercase",
    fontWeight: "bold",
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td": {
      borderBottom: `1px solid #fff2 `,
    },
  }));

  const headers = ["id", "Departamento", nucleo, perfil];
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
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{ width: "100%" }}
      className=" bg-cv-primary rounded-md overflow-hidden mt-20"
    >
      <TableContainer className="bg-cv-primary ">
        <Table sx={{ minWidth: 500 }} aria-label="Tabla Evaluaciones">
          <TableHead className="bg-[#0e161b] ">
            <TableRow>
              {headers.map((header, index) => {
                if (nucleo === null && perfil === null) {
                  if (header === "id" || header === "Departamento") {
                    return (
                      <CustomTableCell key={index}>{header} </CustomTableCell>
                    );
                  }
                } else if (nucleo !== null && perfil === null) {
                  if (header != null) {
                    return (
                      <CustomTableCell key={index}>{header}</CustomTableCell>
                    );
                  }
                } else {
                  // Show all headers
                  return (
                    <CustomTableCell key={index}>{header}</CustomTableCell>
                  );
                }

                return null; // Skip rendering for other headers
              })}
              <CustomTableCell
                align="center"
                className="bg-[#0e161b]"
                style={{
                  color: "white",
                  position: "sticky",
                  right: 0,
                  background: "#0e161b",
                  // borderBottom:"1px solid #fff2"
                }}
              >
                Editar
              </CustomTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dato) => (
                <StyledTableRow
                  key={dato.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="center"
                    width="auto"
                    className="whitespace-nowrap "
                    key={dato.id}
                    style={{ color: "white" }}
                  >
                    {dato.id}
                  </TableCell>

                  {(perfil != null || (perfil != null && nucleo != null)) && (
                    <TableCell align="center" style={{ color: "white" }}>
                      {dato.core.department.name}
                    </TableCell>
                  )}
                  {nucleo != null && perfil == null && (
                    <TableCell align="center" style={{ color: "white" }}>
                      {dato.department.name}
                    </TableCell>
                  )}
                  {perfil != null && nucleo != null && (
                    <TableCell align="center" style={{ color: "white" }}>
                      {dato.core.name}
                    </TableCell>
                  )}

                  <TableCell align="center" style={{ color: "white" }}>
                    {dato.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="sticky right-0 p-1 z-10 bg-cv-primary"
                  >
                    <button
                      onClick={() => abrirEditarModal(dato)}
                      className="p-2 border border-green-500 rounded-md text-green-500 hover:bg-green-500 hover:text-white active:scale-95 ease-in-out duration-300"
                    >
                      <EditIcon />
                    </button>
                    {/* <button
            onClick={() => abrirEliminarModal(dato.id)}
            className="p-2 border rounded-md text-red-500 hover:bg-red-500 hover:text-white active:scale-95 ease-in-out duration-300"
          >
            <DeleteIcon />
          </button> */}
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="bg-[#0e161b]">
        {" "}
        <ThemeProvider theme={darkTheme}>
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
        </ThemeProvider>
      </div>
    </Box>
  );
}

Tabla.propTypes = {
  data: PropTypes.array.isRequired,
  abrirEditarModal: PropTypes.func.isRequired,
  abrirEliminarModal: PropTypes.func.isRequired,
};
