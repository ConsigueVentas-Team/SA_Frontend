import { SelectOption } from './Elements';

export const Filtros = (props) => {
    const {
        shift,
        departmentOptions,
        coreOptions,
        selectedDepartment,
        selectedCore,
        handleShiftChange,
        handleClearFilter,
        setDepartment,
        setCore,
        setSelectedDepartment,
        setSelectedCore
    } = props;

    
    return (
        <div className="flex flex-col space-y-2">
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