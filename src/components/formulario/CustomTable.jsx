import PropTypes from "prop-types";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { TableHead, ThemeProvider } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import TablePaginationActions from './TablePaginationActions';
import { CustomTableCell, StyledTableRow, darkTheme } from './StyleTable';

export default function CustomTable({data, nucleo = null, perfil = null, abrirEditarModal, abrirEliminarModal }) {  
  const [rowsPerPage, setRowsPerPage] = useState(10);  
  const headers = ["id", "Departamento", nucleo, perfil];
  const [page, setPage] = useState(0);
  
  // Evitar un salto de diseño al llegar a la última página con filas vacias.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  //Función que manaje el cambio de página
  const handleChangePage = (event, newPage) => {    
    setPage(newPage);
  };

  //Función que cambia la cantidad de filas por página(RowsPerPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  
  
  return (
    <Box
      sx={{ width: "100%" }}
      className=" bg-cv-primary rounded-md overflow-hidden mt-10"
    >
    <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead className="bg-[#0e161b]">
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
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data  
          ).map((data) => (            
            <StyledTableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="center"
                    width="auto"
                    className="whitespace-nowrap bg-cv-primary"
                    key={data.id}
                    style={{ color: "white"}}
                  >
                    {data.id}
                  </TableCell>

                  {(perfil != null || (perfil != null && nucleo != null)) && (
                    <TableCell align="center" className='bg-cv-primary' style={{ color: "white" }}>
                      {data.core.department.name}
                    </TableCell>
                  )}
                  {nucleo != null && perfil == null && (
                    <TableCell align="center" className='bg-cv-primary' style={{ color: "white" }}>
                      {data.department.name}
                    </TableCell>
                  )}
                  {perfil != null && nucleo != null && (
                    <TableCell align="center" className='bg-cv-primary' style={{ color: "white" }}>
                      {data.core.name}
                    </TableCell>
                  )}

                  <TableCell className='bg-cv-primary' align="center" style={{ color: "white"}}>
                    {data.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="sticky right-0 p-1 z-10 bg-cv-primary"                    
                    style={{border:'none', borderBottom:'1px solid #393737'}}
                  >
                    <button
                      onClick={() => abrirEditarModal(data)}
                      className="p-2 border border-green-500 rounded-md text-green-500 hover:bg-green-500 hover:text-white active:scale-95 ease-in-out duration-300"
                    >
                      <EditIcon />
                    </button>
                  </TableCell>
                </StyledTableRow>
          ))}          
          {emptyRows > 0 && (
            <TableRow className='bg-cv-primary' style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>        
      </Table>
    </TableContainer>
    <div className="bg-[#0e161b]">
      {" "}
      <ThemeProvider theme={darkTheme}>
      <TablePagination
              rowsPerPageOptions={[5,10,15]}
              component="div"
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
      </ThemeProvider>
    </div>
    </Box>
  );
}

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  abrirEditarModal: PropTypes.func.isRequired,  
  abrirEliminarModal: PropTypes.func.isRequired,  
};