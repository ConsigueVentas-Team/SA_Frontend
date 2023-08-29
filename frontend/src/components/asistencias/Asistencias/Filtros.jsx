import React from 'react';

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
      } = props;
    return (
        <div className="flex flex-col space-y-2">
            {/* Filtros adicionales */}
            <div className="flex flex-col items-end space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full">
                    <label
                        htmlFor="filterDepartment"
                        className="block mb-1 text-sm font-thin text-cv-cyan"
                    >
                        Filtrar por Departamento
                    </label>
                    <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                        <select
                            id="filterDepartment"
                            value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}
                            className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                        >
                            <option>Selecciona</option>
                            <option value="Administrativo">Administrativo</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Operativo">Operativo</option>
                        </select>
                        <button onClick={clearFilterDepartment} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                            {/* <CloseIcon /> */}
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="filterArea"
                        className="block mb-1 text-sm font-thin text-cv-cyan"
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
                            className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                        />
                        <button onClick={clearFilterArea} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                            {/* <CloseIcon /> */}
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="filterRole"
                        className="block mb-1 text-sm font-thin text-cv-cyan"
                    >
                        Filtrar por Turno
                    </label>
                    <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                        <select
                            id="filterRole"
                            value={filterShift} onChange={(e) => setFilterShift(e.target.value)}
                            className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                        >
                            <option>Selecciona</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                        </select>
                        <button onClick={clearFilterShift} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                            {/* <CloseIcon /> */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};