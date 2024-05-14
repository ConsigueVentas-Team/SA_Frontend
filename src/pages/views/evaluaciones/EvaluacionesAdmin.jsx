import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import {
  Button,
  SearchBar,
  SelectOption,
  Tabla,
} from "../../../components/evaluaciones";
import Loading from "../../../components/essentials/Loading";

export const EvaluacionesAdmin = () => {
  const [users, setUsers] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const [departments, setDepartments] = useState([]);
  const [cores, setCores] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCore, setSelectedCore] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");

  const [name, setName] = useState("");
  const [shift, setShift] = useState("");
  const [department, setDepartment] = useState("");
  const [core, setCore] = useState("");
  const [position, setPosition] = useState("");

  const [cargando, setCargando] = useState(true);

  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  const getPositionList = async () => {
    try {
      await fetch(import.meta.env.VITE_API_URL + "/position/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfiles(data.data);
        });
    } catch (error) {
      console.error("Error al obtener los cargos:", error);
    }
  };

  //** Rellenar Select Options */
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/departments/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDepartments(data.data));

    fetch(import.meta.env.VITE_API_URL + "/cores/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCores(data.data));

    getPositionList();
  }, [token]);

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const coreOptions = cores
    .filter((core) => core.department.id === parseInt(selectedDepartment))
    .map((core) => ({
      value: core.id,
      label: core.name,
    }));

  const profileOptions = profiles
    .filter((profile) => profile.core.id=== parseInt(selectedCore))
    .map((profile) => ({
      value: profile.id,
      label: profile.name,
    }));


  const handleProfileChange = (event) => {
    setSelectedProfile(event.target.value);
    setPosition(event.target.value);
  };

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleSearchChange = (value) => {
    setName(value);
  };

  useEffect(() => {
    obtenerUsuarios(shift, position, department, core, name);
  }, [shift, position, department, core, name]);

  //* Listar Colaboradores
  const obtenerUsuarios = async (page) => {        
    setCargando(true);
    try {
      const url = new URL(import.meta.env.VITE_API_URL + "/users/list");

      if (page) url.searchParams.append("page", page);

      if (name) url.searchParams.append("name", name);
      if (department) url.searchParams.append("department", department);
      if (core) url.searchParams.append("core", core);
      if (position) url.searchParams.append("position", position);
      if (shift) url.searchParams.append("shift", shift);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data.data);        
        setPagination(data);
        setCargando(false);
      } else {
        console.error("Error al obtener los usuarios:", data.error);
        setCargando(true);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  //* Paginación
  const handlePageChange = (newPage) => {    
    obtenerUsuarios(newPage);
  };

  //* Filtrado
  const handleClearFilter = () => {
    setShift("");
    setPosition("");
    setDepartment("");
    setCore("");
    setName("");
    setSelectedDepartment("");
    setSelectedCore("");
    setSelectedProfile("");    
  };  

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="inline-flex items-center w-full text-base font-medium text-white uppercase">
          <Diversity3Icon />
          <span className="ml-1 text-base font-medium md:ml-2">
            Evaluaciones
          </span>
        </h1>

        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-9 gap-x-0 md:gap-4">
          <div className="col-span-1 row-start-2 md:col-span-8 md:row-start-1">
            <SearchBar inputValue={name} setInputValue={handleSearchChange} />
          </div>
          <div className="col-span-2 md:col-start-1 md:row-start-2">
            <SelectOption
              label="Departamento"
              value={selectedDepartment}
              options={departmentOptions}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedCore("");
                setDepartment(e.target.value);
                setCore("");
                setPosition("");
              }}
            />
          </div>
          <div className="col-span-2 md:col-start-3 md:row-start-2">
            <SelectOption
              label="Núcleo"
              value={selectedCore}
              options={coreOptions}
              onChange={(e) => {
              setSelectedCore(e.target.value);
              setCore(e.target.value);
              setPosition("");
              }}
              disabled={!selectedDepartment}
            />
          </div>
          <div className="col-span-2 md:col-start-5 md:row-start-2">
            <SelectOption
              label="Perfil"
              value={selectedProfile}
              options={profileOptions}
              onChange={handleProfileChange}
              disabled={!selectedCore}
            />
          </div>
          <div className="col-span-2 md:col-start-7 md:row-start-2">
            <select
              value={shift}
              onChange={handleShiftChange}
              className="box-border w-full p-2 border rounded-md outline-none w-50 h-50 border-cv-primary bg-cv-secondary"
            >
              <option value="">Turno</option>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
            </select>
          </div>
          <div className="col-span-1 row-start-1 md:col-start-9 md:row-start-1"></div>
          <div className="col-span-1 row-start-7 md:col-start-9 md:row-start-2">
            <Button
              title="Limpiar filtros"
              onClick={() => {
                handleClearFilter();
                handleClearFilter();
              }}
              label="Limpiar"
              icon={<CleaningServicesIcon />}
            />
          </div>
        </div>

        <div className="w-full">
          {cargando ? (
            <Loading></Loading>
          ) : (
            <Tabla
              data={users}
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </>
  );
};
