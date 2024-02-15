import PropTypes from "prop-types";

export const CajaDatos = ({ label, estilos, colaborador }) => {
  return (
    <div className="w-full">
      <span className="text-sm text-gray-400">{label}</span>
      <p className={estilos}>{colaborador}</p>
    </div>
  );
};

CajaDatos.propTypes = {
  label: PropTypes.string.isRequired,
  estilos: PropTypes.string.isRequired,
  colaborador: PropTypes.string.isRequired,
};
