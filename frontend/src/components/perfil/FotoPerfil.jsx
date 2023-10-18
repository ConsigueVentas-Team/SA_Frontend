import PropTypes from "prop-types";
export const FotoPerfil = ({ colaborador }) => {


  // console.log(colaborador)

  return (
    <div className="col-span-1 md:col-span-2 row-span-5 md:col-start-4 bg-cv-primary rounded-2xl p-5 order-1 md:order-2">
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={`${import.meta.env.VITE_BACKEND_SERVER_URL}/photos/${colaborador.usuario.id}/${
            colaborador.usuario.image
          }`}
          alt=""
          className="w-60 h-60 flex items-center justify-center rounded-full ring ring-cv-cyan object-cover bg-cv-primary"
        />
      </div>
    </div>
  );
};

FotoPerfil.propTypes = {
  colaborador: PropTypes.object.isRequired,
};
