import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

export const Filtros = (props) => {
    const {
        filterDepartment,
        setFilterDepartment,
        filterArea,
        setFilterArea,
        filterShift,
        setFilterShift,
        clearFilterDepartment,
        clearFilterArea,
        clearFilterShift,
        filterEmployee,
        setFilterEmployee,
        setIsInputReady,
        clearFilterEmployee,
        selectedDate,
        handleDateChange
    } = props;

    const formatSelectedDate = (dateValue) => {
        if (!dateValue) return '';

        const date = moment(dateValue, 'YYYY-MM-DD').toDate();
        const formattedDate = moment(date).locale('es').format('LL');
        return formattedDate;
    };
    return (
        <div className="flex flex-col space-y-2">
            <div className="w-full bg-cv-primary rounded-lg">
                <div className="w-full flex items-center justify-between p-2 space-x-3">
                    <h2 className="text-white text-center text-sm sm:text-lg md:text-xl uppercase font-semibold">Fecha:</h2>
                    <div className="w-full flex items-center justify-between relative">
                        <input type="date" defaultValue={selectedDate}
                            onChange={handleDateChange} className='date w-full p-1 outline-none font-semibold text-cv-primary bg-cv-primary rounded-lg' />
                        <p className="text-white bg-cv-primary text-center text-sm sm:text-lg md:text-xl uppercase font-semibold absolute">{formatSelectedDate(selectedDate)}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0'>
                <div className="relative w-full mt-7 mb-7">
                    <input
                        type="text"
                        id=""
                        value={filterEmployee}
                        onChange={(e) => setFilterEmployee(e.target.value)}
                        onFocus={() => setIsInputReady(true)}
                        placeholder="Ingresa nombres y/o apellidos del colaborador"
                        className="block w-full p-3 pr-10 text-sm md:text-lg border border-gray-300 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                    />
                    <button onClick={clearFilterEmployee} className="absolute inset-y-0 right-0 flex items-center px-3 py-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                        <CloseIcon />
                    </button>
                </div>
            </div>
            {/* Filtros adicionales */}
            <div className="flex flex-col items-end space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full">
                    <label
                        htmlFor="filterDepartment"
                        className="block mb-1 text-sm md:text-lg font-thin text-cv-cyan"
                    >
                        Filtrar por Departamento
                    </label>
                    <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                        <select
                            id="filterDepartment"
                            value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}
                            className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none text-sm md:text-lg placeholder-cv-primary font-semibold"
                        >
                            <option>Selecciona</option>
                            <option value="Administrativo">Administrativo</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Operativo">Operativo</option>
                        </select>
                        <button onClick={clearFilterDepartment} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="filterArea"
                        className="block mb-1 text-sm md:text-lg font-thin text-cv-cyan"
                    >
                        Filtrar por Núcleo
                    </label>
                    <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                        <input
                            type="text"
                            id="filterNames"
                            value={filterArea}
                            onChange={(e) => setFilterArea(e.target.value)}
                            placeholder="Ingresa el nombre del núcleo"
                            className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none text-sm md:text-lg placeholder-cv-primary font-semibold"
                        />
                        <button onClick={clearFilterArea} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="filterRole"
                        className="block mb-1 text-sm md:text-lg font-thin text-cv-cyan"
                    >
                        Filtrar por Turno
                    </label>
                    <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                        <select
                            id="filterRole"
                            value={filterShift} onChange={(e) => setFilterShift(e.target.value)}
                            className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none text-sm md:text-lg placeholder-cv-primary font-semibold"
                        >
                            <option>Selecciona</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                        </select>
                        <button onClick={clearFilterShift} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};