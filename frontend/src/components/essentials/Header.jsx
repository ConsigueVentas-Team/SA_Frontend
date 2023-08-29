import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AES, enc } from 'crypto-js';
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
// import ListAltIcon from '@mui/icons-material/ListAlt';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleClickAway = () => {
    setShowMenu(false);
  };

  //Local Storage
  // const userId = localStorage.getItem("iduser");
  // const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
  // const token = tokenD.toString(enc.Utf8)
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
      <div className="w-full h-16 py-2 px-4 flex items-center justify-between bg-cv-primary text-white">
        <div>
          <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
            Consigue Ventas
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* <Tooltip title="Lista de tareas personales">
            <button onClick="" className="relative inline-flex items-center p-1 text-sm font-medium text-center text-white border border-cv-secondary hover:bg-cv-secondary rounded-lg ">
              <ListAltIcon sx={{ fontSize: 24 }} />
              <span className="sr-only">Tareas</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 border-2 border-cv-primary rounded-full -top-2 -right-2 ">
                20
              </div>
            </button>
          </Tooltip> */}
          <Avatar
            alt={name}
            src={`${
              import.meta.env.VITE_BACKEND_SERVER_URL
            }/photos/${userId}/${avatar}`}
            className="ring-2 ring-cv-cyan"
          />
          <div className="flex flex-col">
            <p className="font-semibold whitespace-nowrap text-sm sm:text-base md:text-lg leading-tight">
              {name}
            </p>
            <p className="text-xs sm:text-sm text-cv-cyan leading-tight">
              {rol}
            </p>
          </div>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <Tooltip title="Mas opciones">
                <button onClick={handleShowMenu}>
                  <KeyboardArrowDownIcon
                    className={`cursor-pointer text-white ${
                      showMenu && "-rotate-180"
                    } transition duration-300 ease-in-out`}
                    size={30}
                  />
                </button>
              </Tooltip>
              {showMenu && (
                <div className="w-auto absolute top-16 right-5 z-50 bg-cv-primary p-4 rounded-b-lg shadow-2xl">
                  <div className="flex flex-col text-white space-y-2">
                    <Link
                      to="/perfil"
                      onClick={handleShowMenu}
                      className="w-full text-sm rounded-md hover:bg-cv-secondary flex items-center gap-2 p-1.5"
                    >
                      <AccountCircleIcon sx={{ fontSize: 18 }} />
                      Perfil
                    </Link>
                    <Link
                      to="/cambiar-contraseña"
                      onClick={handleShowMenu}
                      className="w-full text-sm rounded-md hover:bg-cv-secondary flex items-center gap-2 p-1.5"
                    >
                      <ManageAccountsIcon sx={{ fontSize: 18 }} />
                      Cambiar Contraseña
                    </Link>

                    <Link
                      to="/login"
                      onClick={logoutSubmit}
                      className="w-full text-sm rounded-md hover:bg-cv-secondary flex items-center gap-2 p-1.5"
                    >
                      <LogoutIcon sx={{ fontSize: 18 }} />
                      Cerrar Sesión
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  currentPage: PropTypes.string,
  onPageClick: PropTypes.func,
};
