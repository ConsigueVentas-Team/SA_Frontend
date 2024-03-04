import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { MenuItem, Name, Notifications } from "./Elements";

export const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleClickAway = () => {
    setShowMenu(false);
  };

  const userId = localStorage.getItem("iduser");
  const rol = localStorage.getItem("rol");
  const nombre = localStorage.getItem("name");
  const avatar = localStorage.getItem("avatar");
  const apellido = localStorage.getItem("surname");
  const name = nombre.split(" ")[0] + " " + apellido.split(" ")[0];

  //Cerrar Sesion
  function logoutSubmit() {
    localStorage.setItem("login", "false");
    localStorage.setItem("loginStatus", "Cierre de sesión exitoso!");
    navigate("/login");
    window.location.reload();
  }

  return (
    <>
      <div className="flex items-center justify-between w-full h-16 px-4 py-2 text-white bg-cv-primary">
        <div>
          <Link to="/" className="text-sm font-semibold truncate md:text-base lg:text-lg xl:text-xl">
            Consigue Ventas
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Notifications />
          <Avatar
            alt={name}
            src={`${import.meta.env.VITE_BACKEND_SERVER_URL
              }${avatar}`}
            className="ring-2 ring-cv-cyan"
          />
          <Name name={name} rol={rol} />
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <Tooltip title="Mas opciones">
                <button onClick={handleShowMenu}>
                  <KeyboardArrowDownIcon
                    className={`cursor-pointer text-white ${showMenu && "-rotate-180"
                      } transition duration-300 ease-in-out`}
                    size={30}
                  />
                </button>
              </Tooltip>
              {showMenu && (
                <div className="absolute z-50 w-auto p-4 rounded-b-lg shadow-2xl top-16 right-5 bg-cv-primary">
                  <div className="flex flex-col space-y-2 text-white">
                    <MenuItem
                      to="/perfil"
                      onClick={handleShowMenu}
                      icon={<AccountCircleIcon sx={{ fontSize: 18 }} />}
                      label="Perfil"
                    />
                    <MenuItem
                      to="/cambiar-contraseña"
                      onClick={handleShowMenu}
                      icon={<ManageAccountsIcon sx={{ fontSize: 18 }} />}
                      label="Cambiar Contraseña"
                    />
                    <MenuItem
                      to="/login"
                      onClick={logoutSubmit}
                      icon={<LogoutIcon sx={{ fontSize: 18 }} />}
                      label="Cerrar Sesión"
                    />
                  </div>
                </div>
              )}
            </div>
          </ClickAwayListener>
        </div>
      </div >
    </>
  );
};

Header.propTypes = {
  currentPage: PropTypes.string,
  onPageClick: PropTypes.func,
};
