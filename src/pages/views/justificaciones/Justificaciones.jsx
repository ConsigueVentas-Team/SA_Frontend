import { useEffect, useState } from "react";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import {
  CardList,
  // Graficos,
  SearchBar,
} from "../../../components/justificaciones";
import { Pagination } from "@mui/material";
import { FechDataJustificaciones } from "../../../components/justificaciones/helpers/FechDataJustificaciones";
// import { ResponsiveContainer } from 'recharts'
import Loading from "../../../components/essentials/Loading";
import BalanceIcon from "@mui/icons-material/Balance";
import { getAllData } from "./getAllData";
import { filterByJustificationDate, filterByJustificationStatus, filterByJustificationType, filterBySearch } from "./FiltersJustification";

export const Justificaciones = () => {
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(null);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [name, setName] = useState("");
  const [buscador_tipoJustificacion, setbuscador_tipoJustificacion] = useState("");
  const [buscadorStatus, setBuscadorStatus] = useState("");
  const [buscadorFecha, setBuscadorFecha] = useState("");
  const [loading, setLoading] = useState(true);
    
  const limpiar = () => {
    setName("");
    setBuscadorFecha("");
    setPage(1);
    setbuscador_tipoJustificacion("")
    setBuscadorStatus("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //Función que actualiza la lista  de cards
  const updatePage = async ()=>{
    setLoading(true);
    const list = await getAllData();    
    setLoading(false);
    setCards(list);
    setCountPage(list.length)
  }

  useEffect(() => {        
    updatePage();
  }, []); 

  const handleFilters = ()=>{       
    //Aplico todos los filtros 
    let newList = filterByJustificationType(cards, buscador_tipoJustificacion);
    newList = filterByJustificationStatus(newList, buscadorStatus);                
    newList = filterByJustificationDate(newList, buscadorFecha)
    newList = filterBySearch(newList, name);

    //Actualizo el estado CountPage antes de cortar la lista filtrada(newList)
    setCountPage(newList.length);

    //Corto la lista para que se muestren 10 justificaciónes por página
    newList = newList.slice((page-1)*10, ((page-1)*10) + 10);

    //Seteo el estado filteredCards para que se renderize
    setFilteredCards(newList);
  }

  //Ejecutamos los filtros cada vez que se cambian los estados
  useEffect(()=>{    
    handleFilters();          
  },[buscador_tipoJustificacion,buscadorStatus,buscadorFecha,name,cards,page]);

  //Cada vez que se ejecuta un filtro, mostramos la primera página
  useEffect(()=>{    
    setPage(1);
  },[buscador_tipoJustificacion,buscadorStatus,buscadorFecha,name]);

  return (
    <>
      {/* <div className='grid grid-cols-2'> */}
      {/* <Circular /> */}
      {/* </div> */}
      <div className="min-h-screen px-8">
        <p className="flex gap-2 ml-1 text-base mb-3 font-medium md:ml-2 uppercase text-white hover:text-white">
          <BalanceIcon />
          justificacion
        </p>

        <div className="space-y-5">
          <SearchBar value={name} onChange={handleNameChange} />

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Buscador por tipo de justificación: falta o tardanza */}
            <div className="w-full text-white">
              <select
                className="px-3 py-2 rounded-md outline-none bg-cv-secondary border border-cv-primary w-full"
                value={buscador_tipoJustificacion}
                onChange={(e)=>{setbuscador_tipoJustificacion(e.target.value)}}
              >
                <option value="">Tipo de justificación</option>
                <option value='Falta'>Falta</option>
                <option value='Tardanza'>Tardanza</option>
              </select>
            </div>
            {/* Buscador por tipo de status: en proceso, aceptado o rechazado */}
            <div className="w-full text-white">
              <select
                className="px-3 py-2 rounded-md outline-none bg-cv-secondary border border-cv-primary w-full"
                value={buscadorStatus}
                onChange={(e) => setBuscadorStatus(e.target.value)}
              >
                <option value="">Estado</option>
                <option value="1">Aceptado</option>
                <option value="2">Rechazado</option>
                <option value="3">En proceso</option>
              </select>
            </div>
            <div className="w-full text-white">
              <input
                className="px-3 py-2 rounded-md outline-none bg-cv-secondary border border-cv-primary w-full"
                type="date"
                id="fecha"
                value={buscadorFecha}
                onChange={(e) => setBuscadorFecha(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <button
                className="w-full text-cv-primary outline-none px-8 py-1.5 font-semibold text-center bg-cv-cyan rounded-md active:scale-95 ease-in-out duration-300 uppercase"
                onClick={limpiar}
              >
                <CleaningServicesIcon />
              </button>
            </div>
          </div>
        </div>

        <>
          {loading ? (
            <Loading />
          ) : (
            <CardList
              cards={filteredCards}
              page={page}              
            />
          )}
          <div className="mt-5">
            <Pagination
              color="primary"
              className="flex w-100 justify-around"
              count={Math.ceil(countPage / 10)}
              page={page}
              onChange={(event, value) => {                
                setPage(value);                            
              }}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white", // Color del texto del número
                },
              }}
            />
          </div>
        </>
      </div>

      {/* <ResponsiveContainer width={100} height={400}>
                <Graficos />
            </ResponsiveContainer> */}
    </>
  );
};
