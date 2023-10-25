import { useState } from "react";

export default function ModalHorario({ onclose }) {
    const [selectedOptionDay, setSelectedOptionDay] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [schedule, setSchedule] = useState([]);

    const handleSelectChangeDay = (event) => {
        setSelectedOptionDay(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleHoursChange = (event) => {
        const newHours = event.target.value;
        setHours(newHours);
    };

    const handleMinutesChange = (event) => {
        const newMinutes = event.target.value;
        setMinutes(newMinutes);
    };

    const handleAddSchedule = () => {
        if (selectedOptionDay && selectedOption && hours && minutes) {
            // Crear un nuevo horario con los valores seleccionados
            const newSchedule = {
                day: selectedOptionDay,
                option: selectedOption,
                time: `${hours}:${minutes}`,
            };

            // Agregar el nuevo horario al estado de horarios
            setSchedule([...schedule, newSchedule]);

            // Limpiar las selecciones
            setSelectedOptionDay("");
            setSelectedOption("");
            setHours("");
            setMinutes("");
        }
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen overflow-y-auto p-2.5 flex flex-col items-center justify-center bg-cv-secondary/50">
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
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miercoles">Miercoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
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
                                className="w-1/2 bg-[#F5F7FB] rounded"
                            />
                            <input
                                type="number"
                                placeholder="Min."
                                value={minutes}
                                onChange={handleMinutesChange}
                                className="w-1/2 bg-[#F5F7FB] rounded"
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
                    <button
                        onClick={handleAddSchedule}
                        className="bg-cv-primary text-white p-1 rounded-lg flex justify-center items-center"
                    >
                        +
                    </button>
                </div>
                <div className="flex justify-around flex-col">
                    <label className="font-medium">Horario</label>
                    <table className="rounded-md border-2 border-transparent bg-[#F5F7FB] mt-3 mb-3">
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
                        <tr>
                            <td className="border-2 border-gray-200 w-1/6 font-medium p-2">
                                Inicio
                            </td>
                            {schedule
                                .filter((entry) => entry.option === "Inicio")
                                .map((entry, index) => (
                                    <td
                                        key={index}
                                        className="border-2 border-gray-200 w-1/6"
                                    >
                                        {entry.time}
                                    </td>
                                ))}
                        </tr>
                        <tr>
                            <td className="border-2 border-gray-200 w-1/6 font-medium p-2">
                                Fin
                            </td>
                            {schedule
                                .filter((entry) => entry.option === "Fin")
                                .map((entry, index) => (
                                    <td
                                        key={index}
                                        className="border-2 border-gray-200 w-1/6"
                                    >
                                        {entry.time}
                                    </td>
                                ))}
                        </tr>
                    </table>
                </div>

                <div className="flex justify-around items-center">
                    <button
                        onClick={onclose}
                        className="bg-[#F5F7FB] w-1/3 border-2 p-1 mt-3 bg-white font-medium text-cv-primary border-cv-primary hover:text-white hover:bg-cv-primary rounded-lg"
                    >
                        CANCELAR
                    </button>
                    <button className="w-1/3 border-2 p-1 mt-3 text-white bg-cv-primary border-cv-primary rounded-lg">
                        AGREGAR
                    </button>
                </div>
            </div>
        </div>
    );
}
