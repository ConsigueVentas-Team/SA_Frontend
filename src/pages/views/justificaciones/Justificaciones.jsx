import { useEffect, useState } from "react";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import {
  CardList,  
  SearchBar,
} from "../../../components/justificaciones";
import { Pagination } from "@mui/material";
import Loading from "../../../components/essentials/Loading";
import BalanceIcon from "@mui/icons-material/Balance";
import MessageNotFound from "../../../components/MessageNotFound";
import { FechDataJustificaciones } from "../../../components/justificaciones/helpers/FechDataJustificaciones";
import useDebounce from "../../../components/justificaciones/hooks/useDebounce";

export const Justificaciones = () => {
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(null);
  const [cards, setCards] = useState([]);  
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

  const debounceText = useDebounce(name, 250);

  const handleNameChange = (event) => {    
    setName(event.target.value);
  };        

  useEffect(()=>{
    if(buscador_tipoJustificacion !== '' || buscadorStatus !== '' || buscadorFecha !== '' || debounceText !== '') {
      getJustifications(1);
      setPage(1)
    }else {      
      getJustifications(page);
    }
  },[buscador_tipoJustificacion,buscadorStatus,buscadorFecha,debounceText,page])  
  
  //Función que obtiene las justificaciones
  const getJustifications = async (page)=>{
    setLoading(true);        
    const exclude = true;
    const response = await FechDataJustificaciones({page, exclude, name});    
    const data = response.data;
    const totalData = response.total;
    setLoading(false);
    setCards(data);
    setCountPage(totalData)
  }

  return (
    <>      
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
          ) : 
            cards.length > 0 ?
              <CardList
                cards={cards}
                page={page}              
              />
              :
              <MessageNotFound/>
          }
          <div className="mt-5">
            <Pagination
              color="primary"
              className="flex w-100 justify-around"
              count={Math.ceil(countPage / 10)}
              page={page}
              onChange={((event, value)=>{
                setPage(value)
              })}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white", // Color del texto del número
                },
              }}
            />
          </div>
        </>
      </div>
    </>
  );
};
