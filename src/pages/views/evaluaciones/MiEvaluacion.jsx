import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
import Loading from "../../../components/essentials/Loading";
import HeaderTableMyEvaluation from "../../../components/evaluaciones/MyEvaluationView/HeaderTableMyEvaluation";
import BodyTableMyEvaluation from "../../../components/evaluaciones/MyEvaluationView/BodyTableMyEvaluation";


const NOTAS_USER_HEADERS={
  coloborador:{
    headers:["Mes","Habilidades blandas","Desempeño","Habilidades duras","Promedio"],
    fields:["softskills","performance","hardskills","promedio"]
  },
  lider:{
    headers:["Mes","Autoevaluación","Promedio"],
    fields:["autoevaluation","promedio"],
  },
}


export const MiEvaluacion = () => {
  const id = localStorage.getItem("iduser");
  const name = localStorage.getItem("name");
  const surname = localStorage.getItem("surname");
  const rol = localStorage.getItem("rol");  

  const evaluarRol = (usuarioRol) => {    
    return rol === usuarioRol;
  } 

  const [evaluacionEstado, setEvaluacionEstado] = useState(false)

  const [promedio, setPromedio] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [dataMisEvaluacionesFiltradas, setDataMisEvaluacionesFiltradas] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const tokenKey = import.meta.env.VITE_TOKEN_KEY;

        const url = new URL(`${apiUrl}/evaluation/list`);

        const tokenD = AES.decrypt(localStorage.getItem("token"), tokenKey);
        const token = tokenD.toString(enc.Utf8);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.status}`);
        }
        setIsLoading(false)

        const data = await response.json();

        if(data){
          const dataMisEvaluaciones = data.filter(
            (element) => element.user === parseInt(id)
          );
          setDataMisEvaluacionesFiltradas([...dataMisEvaluaciones])
          if(dataMisEvaluaciones.length > 0){
            setEvaluacionEstado(true)
          }
        }

      } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div
      className={`flex flex-col gap-0 ${
        isLoading && "h-[100%]"
      }`}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full rounded-lg bg-cv-primary py-4 px-8 mb-4">
            <div className="flex flex-row justify-between">
              <p className="text-gray-400 font-medium">Nombre:</p>
              <p className="text-gray-400 font-medium">Nota Final:</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-white font-medium">{name + " " + surname}</p>
              <p className="text-white font-medium">{promedio}</p>
            </div>
          </div>

          <div>
            {!evaluacionEstado && (
                <p className="text-gray-400 font-semibold pb-4 px-2">
                  Usted aún no cuenta con sus notas, comuníquese con sú lider
                </p>
            )}
          </div>

          <h2 className="text-white text-center text-xl bg-[#0e161b] py-2 rounded-tl-lg rounded-tr-lg border-b border-cv-secondary">
            {evaluarRol("Colaborador") ? "Colaborador" : "Líderes"}
          </h2>

          <div className="w-full bg-[#0e161b] shadow-md  overflow-hidden ">
            <div className="w-full min-w-full overflow-x-auto scrollbar">
              <table className="w-full text-sm text-left text-white">
                <HeaderTableMyEvaluation 
                  headers={evaluarRol("Colaborador")? NOTAS_USER_HEADERS.coloborador.headers : NOTAS_USER_HEADERS.lider.headers} 
                />
                <BodyTableMyEvaluation
                  dataPerUser={dataMisEvaluacionesFiltradas}
                  actualizarPromedio={setPromedio}
                  fields={evaluarRol("Colaborador")? NOTAS_USER_HEADERS.coloborador.fields : NOTAS_USER_HEADERS.lider.fields} 
                />
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}