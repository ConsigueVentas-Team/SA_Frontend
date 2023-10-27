import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";

export default function ModalHorario({ onclose }) {
    const [selectedOptionDay, setSelectedOptionDay] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSelectChangeDay = (event) => {
        setSelectedOptionDay(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    //Mass validacionesssssssssssssssssssssssss
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
    //
    const handleAddSchedule = () => {
        if (selectedOptionDay && selectedOption && hours && minutes) {
            const newScheduleEntry = {
                day: selectedOptionDay,
                option: selectedOption,
                time: `${hours}:${minutes}`,
            };
            console.log('Mensaje',newScheduleEntry)

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

            // verificamosssssssssssssssssssssssssssssssssssssss
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
        //
    };

    //Peticion Post
    const enviarDatosAlBackend = () => {

        const url = new URL(import.meta.env.VITE_API_URL + "/schedule/create");
        const dayNumber = parseInt(selectedOptionDay, 10);

        const datosDeHorario = [
            {
                "day": 1,
                "Inicio": "08:00",
                "Fin": "16:00"
            },
            {
                "day": 2,
                "Inicio": "08:00",
                "Fin": "16:00"
            },
            {
                "day": 3,
                "Inicio": "08:00",
                "Fin": "16:00"
            },
            {
                "day": 4,
                "Inicio": "08:00",
                "Fin": "16:00"
            },
            {
                "day": 5,
                "Inicio": "08:00",
                "Fin": "16:00"
            }
        ]

        console.log(datosDeHorario)

        const tokenD = AES.decrypt(
            localStorage.getItem("token"),
            import.meta.env.VITE_TOKEN_KEY
        );
        const token = tokenD.toString(enc.Utf8);

        useEffect(() => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(datosDeHorario),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La respuesta de la red no fue exitosa');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Datos enviados al backend con éxito:', data);
                })
                .catch(error => {
                    console.error('Error al enviar los datos al backend', error);
                });
        }, [token]);

    };

    return (
        <div className="fixed top-0 left-0 z-50 m-0 w-screen h-screen overflow-y-auto flex flex-col items-center justify-center bg-cv-secondary/50">
            <div className="relative w-full max-w-2xl max-h-full text-black bg-white rounded-lg p-5">
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
                            <option value="1">Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
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
                        <label htmlFor="dropdown">---</label>
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
                            className="bg-cv-primary text-white p-1 rounded-lg flex justify-center items-center h-1/2"
                        >
                            +
                        </button>
                    </div>
                </div>
                <span className="text-red-500 flex justify-center">{errorMessage}</span>{" "}
                {/* Muestra el mensaje de error */}
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-2 border-gray-200 w-1/6 font-medium p-2">
                                    Inicio
                                </td>
                                {["1", "2", "3", "4", "5"].map(
                                    (day, index) => (
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
                                    )
                                )}
                            </tr>
                            <tr>
                                <td className="border-2 border-gray-200 w-1/6 font-medium p-2">
                                    Fin
                                </td>
                                {["1", "2", "3", "4", "5"].map(
                                    (day, index) => (
                                        <td
                                            key={index}
                                            className="border-2 border-gray-200 w-1/6 pl-8"
                                        >
                                            {schedule
                                                .filter(
                                                    (entry) => entry.option === "Fin" && entry.day === day
                                                )
                                                .map((entry, index) => (
                                                    <span key={index}>{entry.time}</span>
                                                ))}
                                        </td>
                                    )
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-around items-center">
                    <button className="w-1/3 border-2 p-1 mt-3 text-white bg-cv-primary border-cv-primary rounded-lg"
                        onClick={enviarDatosAlBackend}>
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
