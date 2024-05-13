import { styled } from "@mui/material/styles";
import { TableCell, TableRow, createTheme } from "@mui/material";

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td": {
        borderBottom: `1px solid #fff2 `,
    },
}));


export const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
