import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from '@mui/icons-material/Notifications';
import esLocale from 'date-fns/locale/es';

export const Notifications = () => {
    const [notificacion, setNotificacion] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [itemShow, setItemShow] = useState(4);
    const [showAll, setShowAll] = useState(false);

    const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
    const token = tokenD.toString(enc.Utf8)

    const handleShowNotifications = () => {
        setShowNotifications(!showNotifications);
    }

    const handleClickAway = () => {
        setShowNotifications(false);
    };

    useEffect(() => {
        fetchNotifications()
    }, []);


    const fetchNotifications = async () => {
        try {
            const url = new URL(import.meta.env.VITE_API_URL + '/notification/list');

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setNotificacion(data.data);
            } else {
                console.error('Error al obtener las notificaciones:', data.error);
            }
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    };

    const handleShowMore = () => {
        if (showAll) {
            setItemShow(4);
        } else {
            setItemShow(notificacion.length);
        }
        setShowAll(!showAll);
    };

    return (
        <>
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <Tooltip title="Notificaciones">
                    <button onClick={handleShowNotifications} className="relative outline-none transition-transform transform">
                        <div className="absolute top-0 left-0 flex items-center justify-center w-5 h-5 bg-red-500 rounded-full">
                            <span className="text-sm text-white ">{notificacion.length}</span>
                        </div>
                        <div className={`p-1.5 transform ${showNotifications ? 'rotate-y-180 scale-125' : 'rotate-y-0 scale-100'} transition-transform origin-center duration-5000 ease-in-out`}>
                            <NotificationsIcon sx={{ fontSize: 30 }} />
                        </div>
                    </button>
                </Tooltip>
                <div className={`absolute right-0 z-50 w-full px-1 shadow-2xl md:right-6 top-16 md:max-w-md transition-transform transform ${showNotifications ? 'scale-y-100' : 'scale-y-0'} origin-top`}>
                    <div className="overflow-hidden rounded-b-lg bg-cv-primary">
                        <div className="p-2">
                            <h3 className="pb-2 shadow-lg">
                                {notificacion.length} {notificacion.length === 1 ? 'Notificación' : 'Notificaciones'}
                            </h3>
                            <div className="w-full h-auto overflow-y-auto divide-y divide-gray-500 max-h-56 scrollbar">
                                <NotificationItem data={notificacion} itemShow={itemShow} />
                            </div>
                        </div>
                        {notificacion.length > 4 && (
                            <button onClick={handleShowMore} className="block w-full font-bold text-center text-cv-primary bg-cv-cyan hover-bg-cv-cyan-hover transition-transform transform">
                                <div className={`w-full p-2.5 transform ${showAll ? 'scale-100' : 'scale-120'} transition-transform duration-300 ease-in-out active:scale-110`}>
                                    {showAll ? 'Ver menos' : 'Ver más'}
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    </>
    )
}

export const NotificationItem = ({ data, itemShow }) => {

    const formatTimestamp = (timestamp) => {
        const distance = formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: esLocale });
        return distance;
    };

    return (
        <>
            {data.slice(0, itemShow).map((item) => (
                <div key={item.id}>
                    <div className="w-full py-1.5 ">
                        <div className="flex items-center justify-between w-full ">
                            <h3 className={
                                "font-semibold text-normal text-white"
                            }>
                                Notificación
                            </h3>
                            <p className="mr-1 text-xs text-cv-cyan">{formatTimestamp(item.created_at)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-white">
                                {item.message}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

NotificationItem.propTypes = {
    data: PropTypes.array.isRequired,
    itemShow: PropTypes.number.isRequired
}

export const Name = ({ name, rol }) => {
    return (
        <div className="flex flex-col">
            <p className="text-sm font-semibold leading-tight whitespace-nowrap sm:text-base md:text-lg">
                {name}
            </p>
            <p className="text-xs leading-tight sm:text-sm text-cv-cyan">
                {rol}
            </p>
        </div>
    )
}

Name.propTypes = {
    name: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired
}

export const MenuItem = ({ to, onClick, icon, label }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="w-full text-sm rounded-md hover:bg-cv-secondary flex items-center gap-2 p-1.5"
        >
            {icon}
            {label}
        </Link>
    )
}

MenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired
}
