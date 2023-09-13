import { useEffect, useState } from 'react';
import moment from 'moment';
import { AES, enc } from 'crypto-js';
import { Filtros, Leyenda, ModalImagen } from '../../../components/asistencias/Asistencias';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Link } from "react-router-dom";
import { Tabla } from '../../../components/asistencias/Asistencias/Tabla';

export const Asistencias = () => {

  const [attendance, setAttendance] = useState([]);

  const [showImageModal, setShowImageModal] = useState(false)
  const [image, setImage] = useState([]);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const [departments, setDepartments] = useState([]);
  const [cores, setCores] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCore, setSelectedCore] = useState('');

  const [name, setName] = useState('');
  const [shift, setShift] = useState('');
  const [department, setDepartment] = useState('');
  const [core, setCore] = useState('');

  const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
  const token = tokenD.toString(enc.Utf8)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/departments/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDepartments(data));

    fetch(import.meta.env.VITE_API_URL + "/cores/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCores(data));


  }, [token]);

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name
  }));

  const coreOptions = cores
    .filter((core) => core.department_id === parseInt(selectedDepartment))
    .map((core) => ({
      value: core.id,
      label: core.name
    }));

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    obtenerAsistencia(shift, department, core, name);
  }, [shift, department, core, name]);

  const obtenerAsistencia = async (page) => {
    try {
      const url = new URL(import.meta.env.VITE_API_URL + `/attendance`);
      url.searchParams.append('page', page);

      if (shift) url.searchParams.append('shift', shift);
      if (department) url.searchParams.append('department', department);
      if (core) url.searchParams.append('core', core);
      if (name) url.searchParams.append('name', name);

      const response = await fetch(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAttendance(data.data);
        setPagination(data);
        console.log(attendance)
      } else {
        console.error('Error al obtener las asistencias1:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener las asistencias2:', error);
    }
  };

  const handlePageChange = (newPage) => {
    obtenerAsistencia(newPage);
  };

  //* Filtrado
  const handleClearFilter = () => {
    setShift('');
    setDepartment('');
    setCore('');
    setName('');
    setSelectedDepartment('');
    setSelectedCore('');
  }

  const formatSelectedDate = (dateValue) => {
    if (!dateValue) return '';

    const date = moment(dateValue, 'YYYY-MM-DD').toDate();
    const formattedDate = moment(date).locale('es').format('LL');
    return formattedDate;
  };

  const openImageModal = () => {
    setShowImageModal(true)
  }
  const closeImageModal = () => {
    setShowImageModal(false)
  }

  return (
    <>
      <nav className="flex" >
        <ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
          <li className="inline-flex items-center">
            <div className="inline-flex items-center text-base font-medium text-gray-400">
              <ChecklistIcon />
              <span className='ml-1 text-base font-medium md:ml-2'>Asistencias</span>
            </div>
          </li>
          <li >
            <Link to="/marcar-asistencia" className="flex items-center text-gray-500 hover:text-white ">
              <ChevronRightIcon />
              <span className="ml-1 text-base font-medium md:ml-2">Marcar asistencia</span>
            </Link>
          </li>
        </ol>
      </nav>
      <div className='h-full bg-cv-secondary mt-5'>
        <div className="space-y-3">
          <div className="w-full flex flex-col md:flex-row justify-between gap-3">
            <Leyenda />
            <div className="w-full md:w-4/6 space-y-3 mt-3">
              <div className="w-full bg-cv-primary rounded-lg">
                <div className="w-full flex items-center justify-between p-2 space-x-3">
                  <h2 className="text-white text-center text-sm sm:text-lg md:text-xl uppercase font-semibold">Fecha:</h2>
                  {/* <div className="w-full flex items-center justify-between relative">
                    <input type="date" defaultValue={selectedDate}
                      onChange={handleDateChange} className='date w-full p-1 outline-none font-semibold text-cv-primary bg-cv-primary rounded-lg' />
                    <p className="text-white bg-cv-primary text-center text-sm sm:text-lg md:text-xl uppercase font-semibold absolute">{formatSelectedDate(selectedDate)}</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
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

          <Tabla
            data={attendance}
            pagination={pagination}
            handlePageChange={handlePageChange}
            openImageModal={openImageModal}
            setImage={setImage}
          />

          {showImageModal && (
            <ModalImagen
              image={image}
              closeImageModal={closeImageModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

