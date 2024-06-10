import { FechDataJustificaciones } from "../../../components/justificaciones/helpers/FechDataJustificaciones";

//Función que carga todas las paginas 
export const getAllData = async (exclude)=>{
    let page = 1;
    let pieceOfList;
    let flag;
    let listData = [];    
    
    while(flag !== null) {      
      pieceOfList = await FechDataJustificaciones({page, exclude});    
      listData = listData.concat(pieceOfList.data)
      flag = pieceOfList.next_page_url;
      page++;
    }
    return listData
  }
  