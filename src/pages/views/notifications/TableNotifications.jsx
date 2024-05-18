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
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomTableCell, StyledTableRow, darkTheme } from '../../../components/formulario/StyleTable';
import TablePaginationActions from '../../../components/formulario/TablePaginationActions';
import useNotifications from './hooks/useNotifications';
import useNotificationActions from './hooks/useNotificationActions';
import ModalAddNewNotification from './ModalAddNewNotification';
import ModalEditNotification from './ModalEditNotification';

const TableNotifications = ({setOpenModal, openModal}) => {
    const [page, setPage] = useState(0);     
    const {data} = useNotifications();
    const [rowsPerPage, setRowsPerPage] = useState(5);  
    const {addNewNotification} = useNotificationActions();    
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

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
        <ModalAddNewNotification addNewNotification={addNewNotification} openModal={openModal} setOpenModal={setOpenModal}/>
        <ModalEditNotification currentMessage={selectedMessage} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
        <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead className="bg-[#0e161b]">
                <TableRow>                              
                    <CustomTableCell>Id</CustomTableCell>                                                    
                    <CustomTableCell>User_id</CustomTableCell>                              
                    <CustomTableCell>Message</CustomTableCell>                                                     
                    <CustomTableCell>Editar</CustomTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {(rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data  
            ).map((data) => (    
                <>
                <StyledTableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell
                        align="center"
                        width="auto"
                        className="whitespace-nowrap bg-cv-primary"                        
                        style={{ color: "white"}}
                    >                    
                        {data.id}
                    </TableCell>
                    <TableCell className='bg-cv-primary' align="center" style={{ color: "white"}}>
                        {data.user}
                    </TableCell>
                    <TableCell className='bg-cv-primary' align="center" style={{ color: "white"}}>
                        {data.message}
                    </TableCell>
                    <TableCell
                        align="center"
                        className="sticky right-0 p-1 z-10 bg-cv-primary"                    
                        style={{border:'none', borderBottom:'1px solid #393737'}}
                    >
                        <button
                            onClick={() => {setSelectedMessage(data.message);setOpenEditModal(true)}}
                            className="p-2 rounded-md text-yellow-500 hover:bg-yellow-500 hover:text-white active:scale-95 ease-in-out duration-300"
                            >
                            <EditIcon />
                        </button>
                        <button className='hover:text-white hover:bg-red-500 p-2 rounded-md text-medium text-red-500 duration-300 active:scale-95'>
                            <DeleteIcon/>
                        </button>
                    </TableCell>
                    </StyledTableRow>
                </>        
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
                slotProps={{
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
};

export default TableNotifications;