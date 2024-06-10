import PropTypes from "prop-types";

import { SelectOption } from "./Elements";

export const Filtros = (props) => {
  const {
    shift,
    departmentOptions,
    coreOptions,
    selectedDepartment,
    selectedCore,
    handleShiftChange,
    setDepartment,
    setCore,
    setSelectedDepartment,
    setSelectedCore,
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
                setSelectedCore("");
                setDepartment(e.target.value);
                setCore("");
              }}
            />
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
              }}
              disabled={!selectedDepartment}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between w-full rounded-md ">
            <SelectOption
              label='Turno'
              value={shift}
              options={[{label:'Mañana', value:'Mañana'},{label:'Tarde', value:'Tarde'}]}
              onChange={handleShiftChange}
              disabled={false}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

Filtros.propTypes = {
  shift: PropTypes.any.isRequired,
  departmentOptions: PropTypes.any.isRequired,
  coreOptions: PropTypes.any.isRequired,
  selectedDepartment: PropTypes.any.isRequired,
  selectedCore: PropTypes.any.isRequired,
  handleShiftChange: PropTypes.any.isRequired,
  handleClearFilter: PropTypes.any.isRequired,
  setDepartment: PropTypes.any.isRequired,
  setCore: PropTypes.any.isRequired,
  setSelectedDepartment: PropTypes.any.isRequired,
  setSelectedCore: PropTypes.any.isRequired,
};
