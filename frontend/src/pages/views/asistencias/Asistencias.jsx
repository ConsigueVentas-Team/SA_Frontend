import { useEffect, useState } from 'react';
import moment from 'moment';
import { AES, enc } from 'crypto-js';
import CloseIcon from '@mui/icons-material/Close';
import { Filtros, Leyenda, ModalImagen } from '../../../components/asistencias/Asistencias';
import TablaAsistencias from '../../../components/asistencias/Asistencias/TablaAsistencias';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Link } from "react-router-dom";
import { Tabla } from '../../../components/asistencias/Asistencias/Tabla';

export const Asistencias = () => {
  const [attendance, setAttendance] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [isInputReady, setIsInputReady] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [filterDate, setFilterDate] = useState(selectedDate || '');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterShift, setFilterShift] = useState('');

  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DD');
    setSelectedDate(currentDate);
  }, []);

  useEffect(() => {
    obtenerAsistencia();
  }, []);

  useEffect(() => {
    setFilterDate(selectedDate || '');
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
    setSelectedDate(event.target.value);
  };

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const clearFilterEmployee = () => {
    setFilterEmployee('');
  };

  const clearFilterDepartment = () => {
    setFilterDepartment('');
  };

  const clearFilterArea = () => {
    setFilterArea('');
  };

  const clearFilterShift = () => {
    setFilterShift('');
  };

  const obtenerAsistencia = async (page) => {
    try {
      const tokenD = AES.decrypt(
        localStorage.getItem('token'),
        import.meta.env.VITE_TOKEN_KEY
      );
      const token = tokenD.toString(enc.Utf8);
      const url = new URL(import.meta.env.VITE_API_URL + `/attendance/list`);
      url.searchParams.append('page', page);
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
              <Filtros
                filterDepartment={filterDepartment}
                setFilterDepartment={setFilterDepartment}
                filterArea={filterArea}
                setFilterArea={setFilterArea}
                filterShift={filterShift}
                setFilterShift={setFilterShift}
                filterEmployee={filterEmployee}
                setFilterEmployee={setFilterEmployee}
                setIsInputReady={setIsInputReady}
                clearFilterEmployee={clearFilterEmployee}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>

          {/* Tabla de asistencias */}
          <Tabla data={attendance} pagination={pagination} handlePageChange={handlePageChange} />
          {/* <TablaAsistencias data={attendance} openImageModal={openImageModal} setImageUrl={setImageUrl} filterDate={filterDate} filterEmployee={filterEmployee} filterDepartment={filterDepartment} filterArea={filterArea} filterShift={filterShift} /> */}

          {/* Modal de imagen */}
          {showImageModal && (
            <ModalImagen imageUrl={imageUrl} closeImageModal={closeImageModal} />
          )}
        </div>
      </div>
    </>
  );
};

