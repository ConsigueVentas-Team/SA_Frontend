import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";

export const MiEvaluacion = () => {
  const id = localStorage.getItem("iduser");
  const name = localStorage.getItem("name");
  const rol = localStorage.getItem("rol");  


  const evaluarRol = (usuarioRol) => {
    return rol === usuarioRol;
  } 

  const [evaluacionEstado, setEvaluacionEstado] = useState(false)

  const [softskills, setSoftskills] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [hardskills, setHardskills] = useState(0);
  const [autoevaluation, setAutoevaluation] = useState(0);
  const [promedio, setPromedio] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

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

        const data = await response.json();


        if (data && data.length > 0) {

          const foundUser = data.find(
            (item) => item.user_id == parseInt(id)
          );

        
          if (foundUser) {
            setSoftskills(foundUser.softskills);
            setPerformance(foundUser.performance);
            setHardskills(foundUser.hardskills);
            setAutoevaluation(foundUser.autoevaluation);
            setPromedio(foundUser.promedio);
            setEvaluacionEstado(true)
          } else {
            setEvaluacionEstado(false)
            console.error(`No se encontró un usuario con el ID.`);
          }
        } else {
          setEvaluacionEstado(false)
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Obtén el mes actual y los tres meses siguientes
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 = enero, 1 = febrero, ...
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthNames = [];
  for (let i = 0; i < 4; i++) {
    const nextMonthIndex = (currentMonth + i) % 12;
    monthNames.push(months[nextMonthIndex]);
  }
  // Calcula el promedio de un conjunto de notas
  // const calcularPromedio = (notas) => {
  //   const notasNumericas = notas.map((nota) => parseFloat(nota));
  //   const sumaNotas = notasNumericas.reduce((total, nota) => total + nota, 0);
  //   const promedio = sumaNotas / notasNumericas.length;
  //   return promedio.toFixed(2); // Redondea a 2 decimales
  // };

  return (
    <div className="flex flex-col gap-0">
      {isLoading ? (
        <div className="w-full rounded-lg bg-cv-primary py-4 px-8">
          <p className="text-gray-400">Cargando usuario ...</p>
        </div>
      ) : (
        <div className="w-full rounded-lg bg-cv-primary py-4 px-8 mb-4">
          <div className="flex flex-row justify-between">
            <p className="text-gray-400 font-medium">Nombre:</p>
            <p className="text-gray-400 font-medium">Nota Final:</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-white font-medium">{name}</p>
            <p className="text-white font-medium">{promedio}</p>
          </div>
        </div>
      )}

      <div>
        {
          !evaluacionEstado && (
            <div>
              <p className="text-gray-400 font-semibold pb-4 px-2">Usted aún no cuenta con sus notas, comuníquese con sú lider</p>
            </div>
          )
        }
      </div>

      {
        evaluarRol('Colaborador') ? (

          <>
          {/* 'DESEMPEÑO' Table */}
      <h2 className="text-white text-center text-xl bg-[#0e161b] py-2 rounded-tl-lg rounded-tr-lg border-b border-cv-secondary">
        Colaborador
      </h2>
      <div className="w-full bg-[#0e161b] shadow-md  overflow-hidden ">
        <div className="w-full min-w-full overflow-x-auto scrollbar">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-base uppercase">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Mes</th>
                <th className="px-6 py-4 whitespace-nowrap">Habilidades blandas</th>
                <th className="px-6 py-4 whitespace-nowrap">Desempeño</th>
                <th className="px-6 py-4 whitespace-nowrap">Autoevaluación</th>
                <th className="px-6 py-4 whitespace-nowrap">Habilidades duras</th>
                <th className="px-6 py-4 whitespace-nowrap">Promedio</th>
              </tr>
            </thead>
            <tbody className="bg-cv-primary">
              {monthNames.map((monthName, index) => (
                <tr className="border-b border-cv-secondary" key={index}>
                  <th className="px-6 py-4 whitespace-nowrap">{monthName}</th>
                  <td className="px-6 py-4 whitespace-nowrap">{performance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{softskills}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{autoevaluation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{hardskills}</td>
                  <th className="px-6 py-4 whitespace-nowrap">
                    {promedio}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
          </>
        ): (
          <>
                <h2 className="text-white text-center text-xl bg-[#0e161b] py-2 rounded-tl-lg rounded-tr-lg border-b border-cv-secondary">
                  Líderes
                </h2>

                <div className="w-full bg-[#0e161b] shadow-md  overflow-hidden mb-5 ">
                  <div className="w-full min-w-full overflow-x-auto scrollbar">
                    <table className="w-full text-sm text-left text-white">
                      <thead className="text-base uppercase">
                        <tr>
                          <th className="px-6 py-4 whitespace-nowrap">Mes</th>
                          <th className="px-6 py-4 whitespace-nowrap">Habilidades blandas</th>
                          <th className="px-6 py-4 whitespace-nowrap">Desempeño</th>
                          <th className="px-6 py-4 whitespace-nowrap">Autoevaluación</th>
                          <th className="px-6 py-4 whitespace-nowrap">Habilidades duras</th>
                          <th className="px-6 py-4 whitespace-nowrap">Promedio</th>
                        </tr>
                      </thead>
                      <tbody className="bg-cv-primary">
                        {monthNames.map((monthName, index) => (
                          <tr className="border-b border-cv-secondary" key={index}>
                            <th className="px-6 py-4 whitespace-nowrap">{monthName}</th>
                            <td className="px-6 py-4 whitespace-nowrap">{performance}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{softskills}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{autoevaluation}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{hardskills}</td>
                            <th className="px-6 py-4 whitespace-nowrap">
                              {promedio}
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                </>
        )
      }
      
    </div>
  );
};
