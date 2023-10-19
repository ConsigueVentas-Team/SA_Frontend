import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
import {
  Calendar,
  Filtros,
  Leyenda,
  ModalImagen,
  Tabla,
} from "../../../components/asistencias/Asistencias";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Loading from "../../../components/essentials/Loading";

const getData = async (url) => {
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
  })
    .then((response) => response.json())
    .then((data) => data);

  return response;
};

export const Asistencias = () => {
  const [attendance, setAttendance] = useState(null);

  const [showImageModal, setShowImageModal] = useState(false);
  const [image, setImage] = useState([]);

  const [month, setMonth] = useState(
    new Date().toLocaleString("es-ES", { month: "long" }).toUpperCase()
  );
  const [selectedDate, setSelectedDate] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const [departments, setDepartments] = useState([]);
  const [cores, setCores] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCore, setSelectedCore] = useState("");

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [shift, setShift] = useState("");
  const [department, setDepartment] = useState("");
  const [core, setCore] = useState("");
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  console.log("Etapa 1");

  fetch(import.meta.env.VITE_API_URL + "/departments/list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => setDepartments([...data]));

  console.log("Etapa 2");

  fetch(import.meta.env.VITE_API_URL + "/cores/list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => setCores([...data]));

  console.log("Etapa 3");

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  console.log("Etapa 4");

  const coreOptions = cores
    .filter((core) => core.department_id === parseInt(selectedDepartment))
    .map((core) => ({
      value: core.id,
      label: core.name,
    }));

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCargando(true);
    obtenerAsistencia(date, shift, department, core, name);
  }, [date, shift, department, core, name]);

  const obtenerAsistencia = async () => {
    try {
      const url = new URL(import.meta.env.VITE_API_URL + `/attendance/list`);
      url.searchParams.append("page", currentPage);

      console.log("Etapa 6");

      if (date) url.searchParams.append("date", date);
      if (shift) url.searchParams.append("shift", shift);
      if (department) url.searchParams.append("department", department);
      if (core) url.searchParams.append("core", core);
      if (name) url.searchParams.append("name", name);

      console.log("Etapa 7");
      console.log(url);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      console.log("Etapa 8");
      const data = await response.json();
      if (response.ok) {
        setAttendance(data.data);
        setPagination(data);
        setCargando(false);
      } else {
        console.error("Error al obtener las asistencias1:", data.error);
      }
    } catch (error) {
      console.error("Error al obtener las asistencias2:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleClearFilter = () => {
    setShift("");
    setDepartment("");
    setCore("");
    setName("");
    setSelectedDepartment("");
    setSelectedCore("");
  };

  const openImageModal = () => {
    setShowImageModal(true);
  };
  const closeImageModal = () => {
    setShowImageModal(false);
  };

  // VALID STATES
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const openCalendar = () => setIsOpenCalendar(true);
  const closeCalendar = () => setIsOpenCalendar(false);
 

  const handleDayClick = (selectedDay) => {
    const formattedDate = selectedDay.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setDate(formattedDate);
  };


  console.log("DATOS", date, month);


  return (
    <>
      <nav className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
          <li className="inline-flex items-center">
            <div className="inline-flex items-center text-base font-medium text-gray-400">
              <ChecklistIcon />
              <span className="ml-1 text-base font-medium md:ml-2">
                Asistencias
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="h-full bg-cv-secondary mt-5">
        <div className="space-y-3 w-full">
          <div className="flex w-full">
            <div>
              <button
                className="flex items-center justify-center p-2 mr-3 rounded-md text-cv-primary bg-cv-cyan hover:bg-cv-cyan/90font-semibold"
                onClick={isOpenCalendar ? closeCalendar : openCalendar}
              >
                {isOpenCalendar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </button>
            </div>
            <div className="w-full">
              {/* <Filtros
                name={name}
                shift={shift}
                department={department}
                core={core}
                departmentOptions={departmentOptions}
                coreOptions={coreOptions}
                selectedDepartment={selectedDepartment}
                selectedCore={selectedCore}
                handleShiftChange={handleShiftChange}
                handleNameChange={handleNameChange}
                handleClearFilter={handleClearFilter}
                setDepartment={setDepartment}
                setCore={setCore}
                setSelectedDepartment={setSelectedDepartment}
                setSelectedCore={setSelectedCore}
                openImageModal={openImageModal}
                setImage={setImage}
              /> */}
            </div>
          </div>
          {isOpenCalendar && (
            <div className="w-full flex flex-col md:flex-row justify-start gap-3">
              <div
                className={`w-full md:w-1/3 animate-fade-in`}
              >
                <Leyenda />
              </div>
              <div
                className={`w-full md:w-4/6 space-y-3 animate-fade-in`}
              >
                <div className="w-full bg-cv-primary rounded-lg">
                  <div className="w-full flex flex-col items-center justify-between">
                    <Calendar
                      setSelectedMonth={setMonth}
                      onDayClick={handleDayClick}
                      selectedDay={date}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {cargando ? (
            <Loading></Loading>
          ) : (
            <Tabla
              data={attendance}
              pagination={pagination}
              handlePageChange={handlePageChange}
              openImageModal={openImageModal}
              setImage={setImage}
            />
          )}

          {/* {showImageModal && (
            <ModalImagen image={image} closeImageModal={closeImageModal} />
          )} */}
        </div>
      </div>
    </>
  );
};
