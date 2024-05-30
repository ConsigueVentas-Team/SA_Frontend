import { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/essentials/Loading";
import { Avatar } from "@mui/material";
import { STATUS } from "../../../constantes/JustificationStatus";

export const Card = ({ card, page }) => {
  const navigate = useNavigate();      

  const isRechazadoOrAceptado = (prop) => {
    if (prop.justification_status === 2) {
      return STATUS.RECHAZADO;
    } else if (prop.justification_status === 3) {
      return STATUS.PROCESO;
    } else {
      return STATUS.ACEPTADO;
    }
  };

  const bandera = true;
  const [loading, setLoading] = useState(true);

  const mostrarDetalles = (id) => {
    navigate(`/details/${id}`, {
      // modifique bandera a true para que se muestre el boton de regresar
      state: { page, bandera },
    });
  };    

  return (
    <div className="bg-cv-primary text-white rounded-2xl shadow-2xl flex flex-col justify-between">
      <div className="w-full flex flex-col items-center justify-between p-4 overflow-hidden">
        <div className="w-full flex items-center justify-between">
          <Avatar
            alt={card.user.name}
            src={`${import.meta.env.VITE_BACKEND_SERVER_URL}${
              card.user.avatar
            }`}
            sx={{ width: 52, height: 52 }}
            className="ring-2 ring-cv-cyan w-full h-full object-cover"
          />
          <div className="text-white font-semibold">
            <h2>{card.user.name}</h2>
            <h2>{card.user.surname}</h2>
          </div>
        </div>
        <div className="w-full flex mt-4 space-x-3 md:mt-6 text-white">
          <ul className="w-full space-y-0.5">
            <li className="text-sm font-normal flex items-center ">
              <p>
                <span className="mr-2 uppercase text-gray-400 font-semibold mb-1">
                  Turno:
                </span>
                <span>{card.user.shift}</span>
              </p>
            </li>
            <li className="text-sm font-normal flex items-center">
              <label className="mr-2 text-gray-400 uppercase font-semibold mb-1">
                Fecha:{" "}
              </label>
              <div className="w-1/4">
                <input
                  className="bg-transparent"
                  disabled
                  value={moment(card.justification_date).format("DD/MM/YYYY")}
                ></input>
              </div>
            </li>
            <li className="text-sm font-normal flex items-center ">
              <p>
                <span className="mr-2 uppercase text-gray-400 font-semibold mb-1">
                  Estado:
                </span>
                <span>
                  {isRechazadoOrAceptado(card)}                  
                </span>                
              </p>              
            </li>            
            <li className="text-sm font-normal flex items-center ">
              <p>
                <span className="mr-2 text-gray-400 uppercase font-semibold mb-1">
                  {" "}
                  Tipo:{" "}
                </span>{" "}
                {card.justification_type === false ? "Falta" : "Tardanza"}
              </p>
            </li>
            <li className="flex w-full text-sm font-normal">
              <span className="mr-2 uppercase text-gray-400 font-semibold mb-1">
                Motivo:
              </span>  
              <span className="truncate text-nowrap">{card.reason}</span>                          
            </li>
                {isRechazadoOrAceptado(card) === STATUS.ACEPTADO || isRechazadoOrAceptado(card) === STATUS.RECHAZADO ?             
                  <li className="text-sm font-normal">
                    <span className="mr-2 uppercase text-gray-400 font-semibold mb-1">Revisado Por:</span>
                    <span>{card.action_by?.name} {card.action_by?.surname}</span>                             
                  </li>:null
                }
          </ul>
        </div>
      </div>
      <div className="text-sm font-medium text-cv-primary">
        <button
          className={`block w-full p-2 text-xl text-center uppercase rounded-b-lg item-end ${
            isRechazadoOrAceptado(card) === STATUS.PROCESO && "bg-yellow-500" ||
            isRechazadoOrAceptado(card) === STATUS.ACEPTADO && "bg-cv-cyan" ||
            isRechazadoOrAceptado(card) === STATUS.RECHAZADO && "bg-red-500"            
          }`}
          onClick={() => {
            mostrarDetalles(card.id);
          }}
        >
          {isRechazadoOrAceptado(card)}
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
};

Card.defaultProps = {
  card: {},
};
