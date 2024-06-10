import { useState } from "react";
import { Link } from "react-router-dom";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CakeIcon from "@mui/icons-material/Cake";
import BalanceIcon from "@mui/icons-material/Balance";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BarChartIcon from '@mui/icons-material/BarChart';
import { Logo } from "./Logo";

const getRole = () => {
  return localStorage.getItem("rol");
};

export const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const sidebarContent = {
    Colaborador: [
      {
        route: "/perfil",
        title: "Perfil",
        icon: <AccountCircleIcon />
      },
      {
        route: "/marcar-asistencia",
        title: "Asistencia",
        icon: <ChecklistIcon />,
      },
      {
        route: "/añadir-justificacion",
        title: "Justificacion",
        icon: <BalanceIcon />,
      },
      {
        route: "/cumpleaños",
        title: "Cumpleaños",
        icon: <CakeIcon />
      },
      {
        route: "/evaluacion",
        title: "Evaluación",
        icon: <TrendingUpIcon />
      },
    ],
    Gerencia: [
      {
        route: "/perfil",
        title: "Perfil",
        icon: <AccountCircleIcon />
      },
      {
        title: 'Asistencias',
        icon: <ChecklistIcon />,
        submenus: [
          {
            title: 'Marcar asistencia',
            route: '/marcar-asistencia',
          },
          {
            title: 'Gestionar asistencias',
            route: '/asistencias',
          },
        ],
      },
      {
        title: 'Justificaciones',
        icon: <BalanceIcon />,
        submenus: [
          {
            title: 'Añadir justificacion',
            route: '/añadir-justificacion',
          },
          {
            title: 'Gestionar justificaciones',
            route: '/justificaciones',
          },
        ],
      },
      {
        route: "/colaboradores",
        title: "Colaboradores",
        icon: <Diversity3Icon />,
      },
      {
        route: "/cumpleaños",
        title: "Cumpleaños",
        icon: <CakeIcon />
      },
      {
        title: 'Evaluaciones',
        icon: <TrendingUpIcon />,
        submenus: [
          {
            title: 'Mi evaluación',
            route: '/evaluacion',
          },
          {
            title: 'Gestionar evaluaciones',
            route: '/evaluaciones',
          },
        ],
      },
      {
        route: "/empresa",
        title: "Empresa",
        icon: <MapsHomeWorkOutlinedIcon />,
      },
      {
        route: "/reportes",
        title: "Reportes",
        icon: <BarChartIcon />,
      },
      {
        title: 'Notificaciones',
        icon: <NotificationsIcon/>        ,
        route: '/notificaciones'
      },
    ],
    "Lider Nucleo": [
      {
        title: 'Perfil',
        route: '/perfil',
        icon: <AccountCircleIcon />,
      },
      {
        title: 'Asistencias',
        icon: <ChecklistIcon />,
        submenus: [
          {
            title: 'Marcar asistencia',
            route: '/marcar-asistencia',
          },
          {
            title: 'Gestionar asistencias',
            route: '/asistencias',
          },
        ],
      },
      {
        title: 'Justificaciones',
        icon: <BalanceIcon />,
        submenus: [
          {
            title: 'Añadir justificacion',
            route: '/añadir-justificacion',
          },
          {
            title: 'Gestionar justificaciones',
            route: '/justificaciones',
          },
        ],
      },
      {
        title: 'Colaboradores',
        route: '/colaboradores',
        icon: <Diversity3Icon />,
      },
      {
        title: 'Cumpleaños',
        route: '/cumpleaños',
        icon: <CakeIcon />,
      },
      {
        title: 'Evaluaciones',
        icon: <TrendingUpIcon />,
        submenus: [
          {
            title: 'Mi evaluación',
            route: '/evaluacion',
          },
          {
            title: 'Gestionar evaluaciones',
            route: '/evaluaciones',
          },
        ],
      },
      {
        title: 'Empresa',
        route: '/empresa',
        icon: <MapsHomeWorkOutlinedIcon />,
      },
      // {
      //   title: 'Reportes',
      //   route: '/reportes',
      //   icon: <BarChartIcon />,
      // },
    ],
    "Lider Departamento": [
      {
        title: 'Perfil',
        route: '/perfil',
        icon: <AccountCircleIcon />,
      },
      {
        title: 'Asistencias',
        icon: <ChecklistIcon />,
        submenus: [
          {
            title: 'Marcar asistencia',
            route: '/marcar-asistencia',
          },
          {
            title: 'Gestionar asistencias',
            route: '/asistencias',
          },
        ],
      },
      {
        title: 'Justificaciones',
        icon: <BalanceIcon />,
        submenus: [
          {
            title: 'Añadir justificacion',
            route: '/añadir-justificacion',
          },
          {
            title: 'Gestionar justificaciones',
            route: '/justificaciones',
          },
        ],
      },
      {
        title: 'Colaboradores',
        route: '/colaboradores',
        icon: <Diversity3Icon />,
      },
      {
        title: 'Cumpleaños',
        route: '/cumpleaños',
        icon: <CakeIcon />,
      },
      {
        title: 'Evaluaciones',
        icon: <TrendingUpIcon />,
        submenus: [
          {
            title: 'Mi evaluación',
            route: '/evaluacion',
          },
          {
            title: 'Gestionar evaluaciones',
            route: '/evaluaciones',
          },
        ],
      },
      {
        title: 'Empresa',
        route: '/empresa',
        icon: <MapsHomeWorkOutlinedIcon />,
      },
      {
        title: 'Reportes',
        route: '/reportes',
        icon: <BarChartIcon />,
      },
    ]
  };

  const rol = getRole();
  const menuItems = sidebarContent[rol] || [];

  const [showSubmenu, setShowSubmenu] = useState(Array(menuItems.length).fill(false));

  const handleSubMenuToggle = (index) => {
    const newShowSubmenu = [...showSubmenu];
    newShowSubmenu[index] = !newShowSubmenu[index];
    setShowSubmenu(newShowSubmenu);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div
        className={`xl:h-[100vh] fixed overflow-y-auto xl:static xl:w-auto h-full top-0 bg-cv-primary text-white px-4 pb-4 flex flex-col justify-between z-50 ${showMenu ? "left-0" : "-left-full"} transition-all scrollbar `}
      >
        <div>
          <div className="sticky top-0 z-50 w-full pt-4 pb-5 text-2xl font-bold text-center text-white bg-cv-primary">
            <Link to="/" className="flex items-center justify-center w-full">
              <Logo />
            </Link>
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.submenus ? (
                  <button
                    onClick={() => handleSubMenuToggle(index)}
                    className={`flex items-center justify-between w-full px-4 py-2 transition-colors rounded-lg hover:bg-cv-secondary`}
                  >
                    <span className="flex items-center gap-4">
                      {item.icon}
                      {item.title}
                    </span>
                    <ChevronRightIcon
                      className={`mt-1 ${showSubmenu[index] && "rotate-90"} transition-all`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.route}
                    className="flex items-center gap-4 px-4 py-2 transition-colors rounded-lg hover:bg-cv-secondary"
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                )}
                {item.submenus && (
                  <ul
                    className={`${showSubmenu[index] ? "h-auto" : "h-0"
                      } overflow-y-hidden transition-all`}
                  >
                    {item.submenus.map((submenuItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={submenuItem.route}
                          className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-cv-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-cv-cyan text-gray-400 hover:text-white transition-colors text-sm leading-tight"
                        >
                          {submenuItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={handleShowMenu}
        className="fixed z-50 p-2 text-white border rounded-full xl:hidden border-cv-secondary bottom-4 right-4 bg-cv-primary"
      >
        {showMenu ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>
    </>
  );
};