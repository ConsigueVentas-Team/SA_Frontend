import React, { useEffect, useState, useCallback } from "react";
import { AES, enc } from "crypto-js";

export default function ModalHorario({ onclose, id }) {
  const [selectedOptionDay, setSelectedOptionDay] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [scheduleData, setScheduleData] = useState([]);
  const [backendResponse, setBackendResponse] = useState(null);
  const [tablaLlena, setTablaLlena] = useState(false);

  const [userSchedule, setUserSchedule] = useState([]);

  const fetchUserSchedule = useCallback(async () => {
    try {
      const url = new URL(
        `${import.meta.env.VITE_API_URL}/datos/horario/${id}`
      );
      const tokenD = AES.decrypt(
        localStorage.getItem("token"),
        import.meta.env.VITE_TOKEN_KEY
      );
      const token = tokenD.toString(enc.Utf8);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setUserSchedule(data);
        }
      } else {
        console.error("Error al obtener el horario del usuario:", data.error);
      }
    } catch (error) {
      console.error("Error al obtener el horario del usuario:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchUserSchedule();
  }, [id, fetchUserSchedule]);

  const handleSelectChangeDay = (event) => {
    setSelectedOptionDay(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleHoursChange = (event) => {
    const newHours = event.target.value;
    const parsedHours = parseInt(newHours, 10);

    if (!isNaN(parsedHours)) {
      if (parsedHours >= 0 && parsedHours <= 23) {
        setHours(parsedHours.toString().padStart(2, "0"));
      } else if (parsedHours < 0) {
        setHours("00");
      } else {
        setHours("23");
      }
    } else if (newHours === "") {
      setHours("");
    }
  };

  const handleMinutesChange = (event) => {
    const newMinutes = event.target.value;
    const parsedMinutes = parseInt(newMinutes, 10);

    if (!isNaN(parsedMinutes)) {
      if (parsedMinutes >= 0 && parsedMinutes <= 59) {
        setMinutes(parsedMinutes.toString().padStart(2, "0"));
      } else if (parsedMinutes < 0) {
        setMinutes("00");
      } else {
        setMinutes("59");
      }
    } else if (newMinutes === "") {
      setMinutes("");
    }
  };

  const handleAddSchedule = () => {
    if (selectedOptionDay && selectedOption && hours && minutes) {
      const newScheduleEntry = {
        day: selectedOptionDay,
        option: selectedOption,
        time: `${hours}:${minutes}`,
      };

      const inicioEntry = schedule.find(
        (entry) => entry.option === "Inicio" && entry.day === selectedOptionDay
      );

      const finEntry = schedule.find(
        (entry) => entry.option === "Fin" && entry.day === selectedOptionDay
      );

      if (selectedOption === "Fin" && inicioEntry) {
        const startTime = new Date(`2023-10-26 ${inicioEntry.time}`);
        const endTime = new Date(`2023-10-26 ${newScheduleEntry.time}`);
        const timeDiff = endTime - startTime;
        const hoursDiff = Math.floor(timeDiff / 3600000);

        if (hoursDiff < 5) {
          setErrorMessage(
            "La diferencia entre 'Inicio' y 'Fin' debe ser al menos 5 horas."
          );
          return;
        }
      } else if (selectedOption === "Fin" && !inicioEntry) {
        setErrorMessage(
          "Debes agregar una entrada 'Inicio' antes de una entrada 'Fin'."
        );
        return;
      }

      const existingEntry = schedule.find(
        (entry) =>
          entry.day === selectedOptionDay && entry.option === selectedOption
      );

      if (existingEntry) {
        setErrorMessage(
          `Ya has agregado una hora para ${selectedOptionDay} (${selectedOption}).`
        );
      } else {
        setSchedule([...schedule, newScheduleEntry]);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Completa todos los campos");
    }
  };

  const transformDataForBackend = (schedule) => {
    const usuario = id;
    const transformedData = [];

    const dayToNumber = {
      Lunes: 1,
      Martes: 2,
      Miercoles: 3,
      Jueves: 4,
      Viernes: 5,
      Domingo: 6,
    };

    for (const day in dayToNumber) {
      const inicioEntries = schedule.filter(
        (entry) => entry.option === "Inicio" && entry.day === day
      );
      const finEntries = schedule.filter(
        (entry) => entry.option === "Fin" && entry.day === day
      );

      if (inicioEntries.length === 1 && finEntries.length === 1) {
        const dayNumber = dayToNumber[day];
        const inicio = inicioEntries[0].time;
        const fin = finEntries[0].time;

        transformedData.push({
          day: dayNumber,
          inicio,
          fin,
          usuario,
        });
      }
    }

    return transformedData;
  };

  const enviarDatosAlBackend = (scheduleData) => {
    const url = new URL(import.meta.env.VITE_API_URL + "/schedule/create");
    const tokenD = AES.decrypt(
      localStorage.getItem("token"),
      import.meta.env.VITE_TOKEN_KEY
    );
    const token = tokenD.toString(enc.Utf8);
    const dataForBackend = transformDataForBackend(scheduleData);
    console.log(dataForBackend);
    const daysOfWeek = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Domingo",
    ];
    const errors = [];
    for (const day of daysOfWeek) {
      const inicioEntries = scheduleData.filter(
        (entry) => entry.option === "Inicio" && entry.day === day
      );
      const finEntries = scheduleData.filter(
        (entry) => entry.option === "Fin" && entry.day === day
      );

      if (inicioEntries.length !== 1) {
        errors.push(`Debes agregar una entrada 'Inicio' para el día ${day}.`);
      }

      if (finEntries.length !== 1) {
        errors.push(`Debes agregar una entrada 'Fin' para el día ${day}.`);
      }

      if (inicioEntries.length === 1 && finEntries.length === 1) {
        const startTime = new Date(`2023-10-26 ${inicioEntries[0].time}`);
        const endTime = new Date(`2023-10-26 ${finEntries[0].time}`);
        const timeDiff = endTime - startTime;
        const hoursDiff = Math.floor(timeDiff / 3600000);

        if (hoursDiff < 5) {
          errors.push(
            `La diferencia entre 'Inicio' y 'Fin' para el día ${day} debe ser al menos 5 horas.`
          );
        }
      }
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(" "));
    } else {
      setErrorMessage("");

      if (dataForBackend.length > 0) {
        setTablaLlena(true);
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataForBackend),
        })
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            } else if (!response.ok) {
              throw new Error("La respuesta de la red no fue exitosa");
            }
            return response.json();
          })
          .then((data) => {
            setBackendResponse(data);
            console.log(data);
          })
          .catch((error) => {});
      } else {
        setErrorMessage(
          "Completa los horarios 'Inicio' y 'Fin' para cada día."
        );
        setTablaLlena(false);
      }
    }
  };

  console.log(userSchedule);
  return (
    <div className="fixed top-0 left-0 z-50 m-0 w-screen h-screen overflow-y-auto flex flex-col items-center justify-center bg-cv-secondary/50">
      <div className="relative w-full max-w-2xl max-h-full text-black bg-white rounded-lg p-5">
        {userSchedule.length === 0 ? (
          <div>
            <h1 className="font-bold"> Personalizar horario </h1>
            <div className="w-auto flex justify-around align-center direction-row m-2">
              <div className="w-1/4">
                <label htmlFor="dropdown" className="font-medium">
                  Dia:
                </label>
                <select
                  id="dropdown"
                  value={selectedOptionDay}
                  onChange={handleSelectChangeDay}
                  className="flex direction-col bg-[#F5F7FB] rounded w-full"
                >
                  <option value="">Selecciona</option>
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miercoles">Miercoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Domingo">Domingo</option>
                </select>
              </div>
              <div className="w-1/4">
                <label className="font-medium">Hora:</label>
                <div className="flex justify-around direction-row">
                  <input
                    type="number"
                    placeholder="Horas"
                    value={hours}
                    onChange={handleHoursChange}
                    className="w-1/2 bg-[#F5F7FB] rounded pl-4"
                  />
                  <input
                    type="number"
                    placeholder="Min."
                    value={minutes}
                    onChange={handleMinutesChange}
                    className="w-1/2 bg-[#F5F7FB] rounded pl-6"
                  />
                </div>
              </div>
              <div className="w-1/4">
                <label className="font-medium" htmlFor="dropdown">
                  Tiempo:
                </label>
                <select
                  id="dropdown"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="flex direction-col bg-[#F5F7FB] rounded w-full"
                >
                  <option value="">Selecciona</option>
                  <option value="Inicio">Inicio</option>
                  <option value="Fin">Fin</option>
                </select>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleAddSchedule}
                  className="bg-cv-primary text-white p-2 rounded-full flex justify-center items-center h-7 w-7"
                >
                  +
                </button>
              </div>
            </div>
            <span className="text-red-500 flex justify-center">
              {errorMessage}
            </span>{" "}
            <div className="flex justify-around flex-col">
              <label className="font-medium">Horario</label>
              <table className="rounded-md border-2 border-gray-200 bg-[#F5F7FB] mt-3 mb-3">
                <thead>
                  <tr>
                    <th className="border-2 border-gray-200 w-1/6"></th>
                    <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                      Lunes
                    </th>
                    <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                      Martes
                    </th>
                    <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                      Miércoles
                    </th>
                    <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                      Jueves
                    </th>
                    <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                      Viernes
                    </th>
                    <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                      Domingo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-gray-200 w-1/6 font-medium p-2">
                      Inicio
                    </td>
                    {[
                      "Lunes",
                      "Martes",
                      "Miercoles",
                      "Jueves",
                      "Viernes",
                      "Domingo",
                    ].map((day, index) => (
                      <td
                        key={index}
                        className="border-2 border-gray-200 w-1/6 pl-8"
                      >
                        {schedule
                          .filter(
                            (entry) =>
                              entry.option === "Inicio" && entry.day === day
                          )
                          .map((entry, index) => (
                            <span key={index}>{entry.time}</span>
                          ))}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-200 w-1/6 font-medium p-2">
                      Fin
                    </td>
                    {[
                      "Lunes",
                      "Martes",
                      "Miercoles",
                      "Jueves",
                      "Viernes",
                      "Domingo",
                    ].map((day, index) => (
                      <td
                        key={index}
                        className="border-2 border-gray-200 w-1/6 pl-8"
                      >
                        {schedule
                          .filter(
                            (entry) =>
                              entry.option === "Fin" && entry.day === day
                          )
                          .map((entry, index) => (
                            <span key={index}>{entry.time}</span>
                          ))}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex justify-around flex-col">
            <label className="font-medium">Horario Establecido</label>
            <table className="rounded-md border-2 border-gray-200 bg-[#F5F7FB] mt-3 mb-3">
              <thead>
                <tr>
                  <th className="border-2 border-gray-200 w-1/6"></th>
                  <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                    LUNES
                  </th>
                  <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                    MARTES
                  </th>
                  <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                    MIERCOLES
                  </th>
                  <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                    JUEVES
                  </th>
                  <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                    VIERNES
                  </th>
                  <th className="border-2 border-gray-200 w-1/6 font-medium p-2">
                    DOMINGO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 border-gray-200 w-1/6 font-medium p-2">
                    Inicio
                  </td>
                  {[
                    "Lunes",
                    "Martes",
                    "Miercoles",
                    "Jueves",
                    "Viernes",
                    "Domingo",
                  ].map((day, index) => (
                    <td
                      key={index}
                      className="border-2 border-gray-200 w-1/6 pl-8"
                    >
                      {userSchedule
                        .filter(
                          (entry) =>
                            entry.option === "Inicio" && entry.day === day
                        )
                        .map((entry, index) => (
                          <span key={index}>{entry.time}</span>
                        ))}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border-2 border-gray-200 w-1/6 font-medium p-2">
                    Fin
                  </td>
                  {[
                    "Lunes",
                    "Martes",
                    "Miercoles",
                    "Jueves",
                    "Viernes",
                    "Domingo",
                  ].map((day, index) => (
                    <td
                      key={index}
                      className="border-2 border-gray-200 w-1/6 pl-8"
                    >
                      {userSchedule
                        .filter(
                          (entry) => entry.option === "Fin" && entry.day === day
                        )
                        .map((entry, index) => (
                          <span key={index}>{entry.time}</span>
                        ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-around items-center">
          <button
            className="w-1/3 border-2 p-1 mt-3 text-white bg-cv-primary border-cv-primary rounded-lg"
            onClick={() => enviarDatosAlBackend(schedule)}
          >
            AGREGAR
          </button>
          <button
            onClick={onclose}
            className="bg-[#F5F7FB] w-1/3 border-2 p-1 mt-3 bg-white font-medium text-cv-primary border-cv-primary hover:text-white hover:bg-cv-primary rounded-lg"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
}
