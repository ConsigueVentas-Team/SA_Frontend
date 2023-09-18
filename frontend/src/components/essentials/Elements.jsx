import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
