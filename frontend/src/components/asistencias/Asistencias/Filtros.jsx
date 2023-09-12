import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { SearchBar, SelectOption } from './Elements';

export const Filtros = (props) => {
    const {
        name,
        shift,
        department,
        core,
        departmentOptions,
        coreOptions,
        selectedDepartment,
        selectedCore,
        handleShiftChange,
        handleNameChange,
        handleClearFilter,
        setDepartment,
        setCore,
        setSelectedDepartment,
        setSelectedCore
    } = props;

    
    return (
        <div className="flex flex-col space-y-2">
            
            <div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0'>
                <div className="relative w-full mt-7 mb-7">
                    <SearchBar
                        value={name}
                        onChange={handleNameChange}
                        />
                    {/* <button onClick={clearFilterEmployee} className="absolute inset-y-0 right-0 flex items-center px-3 py-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                        <CloseIcon />
                    </button> */}
                </div>
            </div>
            {/* Filtros adicionales */}
            <div className="flex flex-col items-end space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full">
                    <div className="flex items-center justify-between w-full rounded-md ">
                        <SelectOption
                            label="Departamento"
							value={selectedDepartment}
							options={departmentOptions}
							onChange={(e) => {
								setSelectedDepartment(e.target.value);
								setSelectedCore('');
								setDepartment(e.target.value);
							}}/>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between w-full rounded-md ">
                        <SelectOption
                            label="Núcleo"
							value={selectedCore}
							options={coreOptions}
							onChange={(e) => {
								setSelectedCore(e.target.value);
								setCore(e.target.value);
							}
							}
							disabled={!selectedDepartment}/>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between w-full rounded-md ">
                    <select
							value={shift} onChange={handleShiftChange}
							className="w-full box-border w-50 h-50 border border-cv-primary bg-cv-secondary rounded-md p-2 outline-none"
						>
							<option value="">Turno</option>
							<option value="Mañana">Mañana</option>
							<option value="Tarde">Tarde</option>
						</select>
                    </div>
                </div>
            </div>
        </div>
    );
};