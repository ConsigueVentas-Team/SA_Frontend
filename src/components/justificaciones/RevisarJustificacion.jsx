import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BalanceIcon from "@mui/icons-material/Balance";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FechData } from "./helpers/FechData";
import { FechDataJustificaciones } from "./helpers/FechDataJustificaciones";
import { ModalRechazado } from "./componentes/ModalRechazado";
import { AES, enc } from "crypto-js";
import { Alert, Snackbar } from "@mui/material";
import { CardDetail } from "./componentes/CardDetail";
import Loading from "../essentials/Loading";
import { STATUS } from "../../constantes/JustificationStatus";

export const RevisarJustificacion = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();
  const { page, bandera } = state;
  const [faltasList, setFaltasList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  // MODALES
  const [showModalRechazado, setShowModalRechazado] = useState(false);
  const [itemData, setItemData] = useState({});


  const handleRechazar = (item) => {
    setItemData(item);
    setShowModalRechazado(true);
  };
  
  // Alerta
  const [toasSuccess, setToasSuccess] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToasSuccess(false);
  };
  const [message, setMessage] = useState("Exitoso!");

  const handleAceptar = (item) => {
    setButtonLoading(true);
    const tokenD = AES.decrypt(
      localStorage.getItem("token"),
      import.meta.env.VITE_TOKEN_KEY
    );
    const token = tokenD.toString(enc.Utf8);

    fetch(import.meta.env.VITE_API_URL + `/justification/accept/${item.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);

        if (data.message !== "") {
          setToasSuccess(true);

          setTimeout(() => {
            navigate(`/justificaciones`);
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  const rol = localStorage.getItem("rol");
  const iduser = localStorage.getItem("iduser");

  const hasRole = (targetRole) => {
    return rol === targetRole;
  };

  const fechtDataPorRol = (page) => {
    setLoading(true);
    if (hasRole("Colaborador")) {
      FechData({ page })
        .then((e) => {
          setFaltasList(e.data);          
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    } else if (bandera == true) {
      FechDataJustificaciones({ page })
        .then((e) => {
          setFaltasList(e.data);
          // console.log(page)
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    } else {
      FechData({ page })
        .then((e) => {
          setFaltasList(e.data);
          // console.log(page)
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const isRechazadoOrAceptado = (prop) => {
    if (prop.justification_status === 2) {
      return STATUS.RECHAZADO;
    } else if (prop.justification_status === 3) {
      return STATUS.PROCESO;
    } else {
      return STATUS.ACEPTADO;
    }
  };

  useEffect(() => {
    fechtDataPorRol(page);
  }, [page]);

  return (
    <>
      {showModalRechazado && (
        <ModalRechazado
          itemData={itemData}
          setShowModalRechazado={setShowModalRechazado}
          setToasSuccess={setToasSuccess}
          setMensaje={setMessage}
        />
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toasSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <div className="w-full flex flex-col md:flex-row items-center text-white relative px-8">
        <nav className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
            <li className="inline-flex items-center">
              <Link
                to={
                  hasRole("Lider Nucleo")
                    ? "/justificaciones"
                    : "/añadir-justificacion"
                }
                // onClick={() => history.goBack()}
                className="inline-flex items-center text-base font-medium text-gray-400 hover:text-white"
              >
                <BalanceIcon />
                <span className="ml-1 text-base font-medium md:ml-2">
                  Justificaciones
                </span>
              </Link>
            </li>
            <li>
              <div className="flex items-center text-gray-500 ">
                <ChevronRightIcon />
                <span className="ml-1 text-base font-medium md:ml-2">
                  Detalle justificacion
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="lg:w-[70%] m-auto mt-5">
        {loading ? (
          <Loading />
        ) : (
          <CardDetail
            buttonLoading={buttonLoading}
            handleRechazar={handleRechazar}
            handleAceptar={handleAceptar}
            faltasList={faltasList}
            isRechazadoOrAceptado={isRechazadoOrAceptado}
            id={id}
            rol={rol}
            iduser={iduser}
          />
        )}
      </div>
    </>
  );
};
