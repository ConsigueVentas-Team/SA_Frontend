import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-hot-toast";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, InputText, ModalButton, Select } from "./ModalElements";
import Loading from "../../essentials/Loading";

export const ModalAgregar = ({departments, cores, profiles, close, addUser, cargando }) => {  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");  
  const [cellphone, setCellphone] = useState("");
  const [shift, setShift] = useState("");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCore, setSelectedCore] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");    

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
    .filter((profile) => profile.core.id === parseInt(selectedCore))
    .map((profile) => ({
      value: profile.id,
      label: profile.name,
    }));

  const shiftOptions = [
    { value: "Mañana", label: "Mañana" },
    { value: "Tarde", label: "Tarde" },
  ];

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDniChange = (event) => {
    if (event.target.value.length > 8) return;
    setDni(event.target.value);
  };

  const handleProfileChange = (event) => {
    setSelectedProfile(event.target.value);
  };

  const handleCellphoneChange = (event) => {
    setCellphone(event.target.value);
  };

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleImageChange = (file) => {
    setAvatar(file);
  };

  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  };

  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  };

  const handleSubmit = (event) => {
    if (
      !name ||
      !surname ||
      !email ||
      !dni ||
      !selectedProfile ||
      !cellphone ||
      !shift ||
      !birthday ||
      !avatar ||
      !dateStart ||
      !dateEnd ||
      name.trim() === "" ||
      surname.trim() === "" ||
      email.trim() === "" ||
      dni.trim() === "" ||
      selectedProfile.trim() === "" ||
      cellphone.trim() === "" ||
      shift.trim() === "" ||
      birthday.trim() === "" ||
      dateStart.trim() === "" ||
      dateEnd.trim() === ""
    ) {
      toast.error("Rellene todos los campos");
      return;
    }
    event.preventDefault();

    const nuevoUsuario = {
      name,
      surname,
      email,
      dni,
      selectedProfile,
      cellphone,
      shift,
      birthday,
      avatar,
      dateStart,
      dateEnd,
    };

    addUser(nuevoUsuario);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen overflow-y-auto p-2.5 flex flex-col items-center justify-center bg-cv-secondary/50">
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b border-cv-primary rounded-t">
              <h3 className="text-xl font-semibold text-cv-primary inline-flex items-center gap-2">
                <PersonAddIcon />
                Agregar Colaborador
              </h3>
              <button
                type="button"
                onClick={close}
                className="text-cv-secondary bg-transparent hover:bg-cv-primary hover:text-cv-cyan rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center active:scale-95 ease-in-out duration-300"
              >
                <CloseIcon sx={{ fontSize: 32 }} />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="relative p-2 md:p-6 flex-auto space-y-4">
              <Avatar
                onChange={handleImageChange}
                value={avatar}
                remove={() => setAvatar(null)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="w-full flex flex-col space-y-1">
                  <InputText
                    label="Nombres completos"
                    type="text"
                    id="names"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <InputText
                    label="Apellidos completos"
                    type="text"
                    id="surnames"
                    value={surname}
                    onChange={handleSurnameChange}
                  />
                  <InputText
                    label="DNI"
                    type="number"
                    id="dni"
                    value={dni}
                    onChange={handleDniChange}
                  />
                  <InputText
                    label="Fecha de nacimiento"
                    type="date"
                    id="birthday"
                    value={birthday}
                    onChange={handleBirthdayChange}
                  />
                  <InputText
                    label="Correo electrónico"
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <InputText
                    label="Teléfono"
                    type="tel"
                    id="telephone"
                    value={cellphone}
                    onChange={handleCellphoneChange}
                  />
                </div>
                <div className="w-full flex flex-col space-y-1">
                  <Select
                    label="Departamento"
                    id="department"
                    value={selectedDepartment}
                    options={departmentOptions}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      setSelectedCore("");
                    }}
                  />
                  <Select
                    label="Núcleo"
                    id="core"
                    value={selectedCore}
                    options={coreOptions}
                    onChange={(e) => setSelectedCore(e.target.value)}
                    disabled={!selectedDepartment}
                  />
                  <Select
                    label="Perfil"
                    id="profile"
                    value={selectedProfile}
                    options={profileOptions}
                    onChange={handleProfileChange}
                    disabled={!selectedCore}
                  />
                  <Select
                    label="Turno"
                    id="shift"
                    value={shift}
                    options={shiftOptions}
                    onChange={handleShiftChange}
                  />
                  <InputText
                    label="Fecha de ingreso"
                    type="date"
                    id="date_entry"
                    value={dateStart}
                    onChange={handleDateStartChange}
                  />
                  <InputText
                    label="Fecha de finalización"
                    type="date"
                    id="date_finalization"
                    value={dateEnd}
                    onChange={handleDateEndChange}
                  />
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-cv-primary rounded-b gap-2 md:gap-4">
              <ModalButton
                label="Cancelar"
                onClick={close}
                className="text-cv-primary bg-white border-cv-primary hover:text-white hover:bg-cv-primary"
              />
              {cargando ? (
                <div className="h-12 flex justify-center items-center  w-1/2">
                  <Loading></Loading>
                </div>
              ) : (
                <ModalButton
                  label="Guardar"
                  onClick={handleSubmit}
                  className="text-white bg-cv-primary border-cv-primary hover:bg-cv-primary"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ModalAgregar.propTypes = {
  close: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};
