import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
import Person2Icon from "@mui/icons-material/Person2";
import CloseIcon from "@mui/icons-material/Close";
import {
  AvatarUpdate,
  InputText,
  ModalButton,
  Select,
  SelectRole,
  Switch,
} from "./ModalElements";
import Loading from "../../essentials/Loading";
import ModalHorario from "./ModalHorario";

export const ModalEditar = ({ close, updateUser, user, cargando }) => {

  // UseStates de campos a insertar
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [departments, setDepartments] = useState([]);
  const [cores, setCores] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [cellphone, setCellphone] = useState("");
  const [shift, setShift] = useState("");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [status, setStatus] = useState(true);
  const [statusDescription, setStatusDescription] = useState("");
  const [role, setRole] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCore, setSelectedCore] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [modal, setModal] = useState(false)

  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setDni(user.dni);
    setSelectedDepartment(user.position.core.department.id);
    setSelectedCore(user.position.core.id);
    setSelectedProfile(user.position.id);
    setCellphone(user.cellphone);
    setShift(user.shift);
    setBirthday(user.birthday);
    setAvatar(user.avatar);
    //setAvatarUrl(user.avatar.replace("http://127.0.0.1:8000","https://backend.consigueventas.com"));
    setAvatarUrl(user.avatar);
    setDateStart(user.date_start);
    setDateEnd(user.date_end);
    setStatus(user.status);
    setStatusDescription(user.status_description);
    setRole(user.role.id);
  }, [user]);

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

    fetch(import.meta.env.VITE_API_URL + "/position/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProfiles(data.data));
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
    .filter((profile) => profile.core.id === parseInt(selectedCore))
    .map((profile) => ({
      value: profile.id,
      label: profile.name,
    }));

  const shiftOptions = [
    { value: "Mañana", label: "Mañana" },
    { value: "Tarde", label: "Tarde" },
  ];

  const roleOptions = [
    { value: 1, label: "Gerencia" },
    { value: 2, label: "Lider Nucleo" },
    { value: 3, label: "Colaborador" },
    { value: 4, label: "Lider Departamento" },
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  };

  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.checked ? true : false;
    setStatus(newStatus);
    setStatusDescription(newStatus === true ? " " : "Termino su convenio");
  };

  const handleStatusDescriptionChange = (event) => {
    setStatusDescription(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const usuarioEditado = {
      ...user,
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
      status,
      statusDescription,
      role,
    };

    updateUser(usuarioEditado);
  };

  const handleOpenModal = () => {
    setModal(true)
  }

  const handleCloseModal = () => {
    setModal(false)
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen overflow-y-auto p-2.5 flex flex-col items-center justify-center bg-cv-secondary/50">
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t border-cv-primary">
              <h3 className="inline-flex items-center gap-2 text-xl font-semibold text-cv-primary">
                <Person2Icon />
                Editar Colaborador
              </h3>
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm duration-300 ease-in-out bg-transparent rounded-lg text-cv-secondary hover:bg-cv-primary hover:text-cv-cyan active:scale-95"
              >
                <CloseIcon sx={{ fontSize: 32 }} />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="relative flex-auto p-2 space-y-4 md:p-6">
              <AvatarUpdate
                urlLocal={imageUrl}
                value={avatar}
                url={avatarUrl}
                onChange={handleImageChange}
              />

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="flex flex-col w-full space-y-1">
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
                  <Switch
                    label="Estado"
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                    statusValue={statusDescription}
                    status_onChange={handleStatusDescriptionChange}
                  />
                </div>
                <div className="flex flex-col w-full space-y-1">
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
                  <div className="flex direction-row">
                  <Select
                    label="Horario"
                    id="shift"
                    value={shift}
                    options={shiftOptions}
                    onChange={handleShiftChange}
                  />
                  <button onClick={handleOpenModal} className="w-3/5 h-1/2 mt-8 ml-2 text-white bg-cv-primary border-cv-primary font-bolder p-1.5 rounded-lg flex items-center justify-center"> Personalizar </button>
                  {modal && <ModalHorario id={user.id}
                    onclose={handleCloseModal}
                  />}
                  </div>
                  <SelectRole
                    label="Rol"
                    id="role"
                    value={role}
                    options={roleOptions}
                    onChange={handleRoleChange}
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
            <div className="flex flex-col-reverse items-center justify-between gap-2 p-2 border-t border-solid rounded-b md:flex-row md:p-6 border-cv-primary md:gap-4">
              <ModalButton
                label="Cancelar"
                onClick={close}
                className="bg-white text-cv-primary border-cv-primary hover:text-white hover:bg-cv-primary"
              />
              {cargando ? (
                <div className="flex items-center justify-center w-1/2 h-12">
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
// ModalEditar.propTypes = {
//   close: PropTypes.func.isRequired,
//   updateUser: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
//   cargando: PropTypes.bool.isRequired,
// };
