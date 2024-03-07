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

export const Asistencias = () => {
  const newDate = new Date();
  const strDate = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`;
  const [currentData, setCurrentData] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [image, setImage] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [month, setMonth] = useState(
    new Date().toLocaleString("es-ES", { month: "long" }).toUpperCase()
  );

  const [cargando, setCargando] = useState(true);

  const [departments, setDepartments] = useState([]);
  const [cores, setCores] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCore, setSelectedCore] = useState("");

  const [date, setDate] = useState(strDate);
  const [name, setName] = useState("");
  const [shift, setShift] = useState("");
  const [department, setDepartment] = useState("");
  const [core, setCore] = useState("");
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const coreOptions = cores
    .filter((core) => core.department === parseInt(selectedDepartment))
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
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [fetchingInProgress, setFetchingInProgress] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/departments/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data.data);
      });

    fetch(import.meta.env.VITE_API_URL + "/cores/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCores(data.data);
      });

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/attendance/list?page=${currentPage}&date=2023-11-8`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response && response.data && Array.isArray(response.data)) {
          setCurrentData([...response.data]);
        } else {
          console.error(
            "La estructura de datos de la respuesta no es válida:",
            response
          );
        }
        setCargando(false);
        setLastPage(response.last_page);
        setTotal(response.total);
        setFetchingInProgress(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos de asistencia:", error);
      });
  }, [date]);

  useEffect(() => {
    setAttendance([...currentData]);
  }, [currentData]);

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

  const openCalendar = () => setIsOpenCalendar(true);
  const closeCalendar = () => setIsOpenCalendar(false);

  const handleDayClick = (selectedDay) => {
    const formattedDate = selectedDay.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  const getCore = (coreId) => {
    const searchedCore = cores.filter((e) => e.id == coreId)[0];
    return searchedCore.name;
  };

  const getDepartment = (departmentId) => {
    const searchedDepartment = departments.filter(
      (e) => e.id == departmentId
    )[0];
    return searchedDepartment.name;
  };

  const getAsistencias = async () => {
    setFetchingInProgress(true);

    let url = `${
      import.meta.env.VITE_API_URL
    }/attendance/list?page=${currentPage}&date=${date}`;
    url = core ? `${url}&core=${getCore(core)}` : url;
    url = shift ? `${url}&shift=${shift}` : url;
    url = department ? `${url}&department=${getDepartment(department)}` : url;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAttendance(data.data);
      closeCalendar();
      setFetchingInProgress(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAsistencias();
  }, [date, currentPage, shift, core, department]);

  return (
    <>
      <nav className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
          <li className="inline-flex items-center">
            <div className="inline-flex items-center text-base font-medium text-white">
              <ChecklistIcon />
              <span className="ml-1 text-base font-medium md:ml-2">
                Asistencias
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {fetchingInProgress && <Loading />}
      {!fetchingInProgress && (
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
                <Filtros
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
                />
              </div>
            </div>
            {isOpenCalendar && (
              <div className="w-full flex flex-col md:flex-row justify-start gap-3">
                <div className={`w-full md:w-1/3 animate-fade-in`}>
                  <Leyenda />
                </div>
                <div className={`w-full md:w-4/6 space-y-3 animate-fade-in`}>
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
              <Loading />
            ) : (
              <Tabla
                data={attendance}
                currentPage={currentPage}
                lastPage={lastPage}
                total={total}
                setCurrentPage={setCurrentPage}
                openImageModal={openImageModal}
                setImage={setImage}
              />
            )}

            {showImageModal && (
              <ModalImagen image={image} closeImageModal={closeImageModal} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
