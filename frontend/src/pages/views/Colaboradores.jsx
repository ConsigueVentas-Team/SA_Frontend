import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AES, enc } from "crypto-js";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import {
  Button,
  ModalAgregar,
  ModalEditar,
  SearchBar,
  SelectOption,
  Tabla,
} from "../../components/colaboradores";
import Loading from "../../components/essentials/Loading";

export const Colaboradores = () => {
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

  const [page, setPage] = useState(1);

  const [name, setName] = useState("");
  const [shift, setShift] = useState("");
  const [department, setDepartment] = useState("");
  const [core, setCore] = useState("");
  const [position, setPosition] = useState("");

  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [selectUser, setSelectUser] = useState(null);

  const [cargando, setCargando] = useState(true);

  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  const toggleAgregarModal = () => {
    setShowAgregarModal(!showAgregarModal);
  };

  const toggleEditarModal = (usuario) => {
    setShowEditarModal(!showEditarModal);
    setSelectUser(usuario);
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
    .filter((core) => core.department === parseInt(selectedDepartment))
    .map((core) => ({
      value: core.id,
      label: core.name,
    }));

  const profileOptions = profiles
    .filter((profile) => profile.core=== parseInt(selectedCore))
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
    obtenerUsuarios(page, shift, position, department, core, name);
  }, [page, shift, position, department, core, name]);  

  //* Listar Colaboradores
  const obtenerUsuarios = async (page) => {
    setCargando(true);
    try {
      const url = new URL(import.meta.env.VITE_API_URL + "/users/list");

      url.searchParams.append("page", page?page:1);

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

      console.log("DATA: ", data);

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

  //* Agregar Colaborador
  const agregarUsuario = async (newUser) => {
    setCargando(true);
    const formData = new FormData();
    formData.append("name", newUser.name);
    formData.append("surname", newUser.surname);
    formData.append("email", newUser.email);
    formData.append("dni", newUser.dni);
    formData.append("position", newUser.selectedProfile);
    formData.append("cellphone", newUser.cellphone);
    formData.append("shift", newUser.shift);
    formData.append("birthday", newUser.birthday);
    formData.append("avatar", newUser.avatar);
    formData.append("date_start", newUser.dateStart);
    formData.append("date_end", newUser.dateEnd);

    formData.append("username", newUser.dni);
    formData.append("password", newUser.dni);

    fetch(import.meta.env.VITE_API_URL + "/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setShowAgregarModal(!showAgregarModal);
          toast.success("Usuario agregado exitosamente");
          obtenerUsuarios();
          setCargando(false);
        } else {
          setCargando(false);
          throw new Error("Error al guardar los datos");

        }
      })
      .catch((error) => {
        toast.error(`Error al agregar usuario: ${error}`);
      });
  };

  //* Editar Colaborador
  const editarUsuario = async (updateUser) => {
    setCargando(true);
    const formData = new FormData();
    formData.append("name", updateUser.name);
    formData.append("surname", updateUser.surname);
    formData.append("email", updateUser.email);
    formData.append("dni", updateUser.dni);
    formData.append("position_id", updateUser.selectedProfile);
    formData.append("cellphone", updateUser.cellphone);
    formData.append("shift", updateUser.shift);
    formData.append("birthday", updateUser.birthday);
    formData.append("date_start", updateUser.dateStart);
    formData.append("date_end", updateUser.dateEnd);
    formData.append("avatar", updateUser.avatar);
    formData.append("role", updateUser.role);
    formData.append("status", updateUser.status);
    formData.append("status_description", updateUser.statusDescription);

    formData.append("_method", "PUT");

    const responseData = await fetch(
      import.meta.env.VITE_API_URL + `/users/${updateUser.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responsedata = await responseData.json();
    console.log("DATON: ", responsedata);

    formData.append("username", responsedata.user.username);
    formData.append("password", responseData.user.password);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/users/${updateUser.id}/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        const usuariosActualizados = users.map((usuario) => {
          if (usuario.id === updateUser.id) {
            return {
              ...usuario,
              ...updateUser,
            };
          }
          return usuario;
        });
        setUsers(usuariosActualizados);
        toast.success("Datos de usuario modificado exitosamente");
        setShowEditarModal(!showEditarModal);
        obtenerUsuarios();
        setCargando(false);
      } else {
        toast.error(`Error al modificar usuario: ${data.error}`);
        setShowEditarModal(!showEditarModal);
        setCargando(false);
      }
    } catch (error) {
      toast.error(`Error al modificar: ${error}`);
      setShowEditarModal(!showEditarModal);
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
            Colaboradores
          </span>
        </h1>

        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-9 gap-x-0 md:gap-4">
          <div className="col-span-1 row-start-2 md:col-span-8 md:row-start-1">
            <SearchBar value={name} onChange={handleSearchChange} />
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
          <div className="col-span-1 row-start-1 md:col-start-9 md:row-start-1">
            <Button
              title="Agregar colaborador"
              onClick={toggleAgregarModal}
              label="Agregar"
              icon={<PersonAddIcon />}
            />
          </div>
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
              toggleEditarModal={toggleEditarModal}
            />
          )}
        </div>
        <Toaster />
      </section>
      {showAgregarModal && (
        <ModalAgregar
          close={toggleAgregarModal}
          addUser={agregarUsuario}
          cargando={cargando}
        />
      )}
      {showEditarModal && (
        <ModalEditar
          close={toggleEditarModal}
          updateUser={editarUsuario}
          user={selectUser}
          cargando={cargando}
        />
      )}
    </>
  );
};
