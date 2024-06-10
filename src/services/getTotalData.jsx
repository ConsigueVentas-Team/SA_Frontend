import { AES, enc } from "crypto-js";
import ObtenerDatos from "../components/formulario/Helpers/hooks/ObtenerDatos";

//Función que obtiene todos los datos de todas las páginas
//porque el componente Tabla(Material-UI) asi lo requiere.
export const getTotalData = async (url, setCargando)=>{
    const tokenD = AES.decrypt(
        localStorage.getItem("token"),
        import.meta.env.VITE_TOKEN_KEY
    );
    const token = tokenD.toString(enc.Utf8);
    let currentPage = 1;
    let pieceOfList;
    let flag;
    let listData = [];

    while(flag !== null) {      
      pieceOfList =  await ObtenerDatos(token, url, setCargando, currentPage);
      listData = listData.concat(pieceOfList.data);
      flag = pieceOfList.next_page_url;
      currentPage++;      
    }

   return listData;
}