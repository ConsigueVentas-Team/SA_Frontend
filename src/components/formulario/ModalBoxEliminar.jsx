import PropTypes from "prop-types";
const ModalBoxEliminar = ({
  title,
  eliminarDepartamento,
  cerrarEliminarModal,
}) => {
  const eliminar = () => {
    cerrarEliminarModal(false);
    eliminarDepartamento();
  };

  return (
    <div className="  w-full h-full overflow-x-hidden overflow-y-auto">
      <div className=" fixed top-0 left-0 z-50  overflow-x-hidden overflow-y-auto scale-90 w-full h-full items-center flex justify-center sm:scale-95  ">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-w-lg bg-white outline-none  p-2 md:p-0">
          <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-lg md:text-xl font-semibold uppercase text-black">
              {title}
            </h3>
          </div>

          <div className="flex flex-row -reverse md:flex-row items-center justify-around p-2 md:p-6 border-t border-solid border-slate-200 rounded-b gap-2 w-full md:gap-4 sm:flex-row">
            <button
              className="w-1/3 py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-base font-semibold uppercase active:scale-95 ease-in-out duration-300"
              type="button"
              onClick={eliminar}
            >
              Si
            </button>
            <button
              className="w-1/3 py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-base   uppercase active:scale-95 ease-in-out duration-300"
              type="button"
              onClick={() => cerrarEliminarModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
    </div>
  );
};

export default ModalBoxEliminar;
ModalBoxEliminar.propTypes = {
  title: PropTypes.string.isRequired,
  eliminarDepartamento: PropTypes.func.isRequired,
  cerrarEliminarModal: PropTypes.func.isRequired,
};
