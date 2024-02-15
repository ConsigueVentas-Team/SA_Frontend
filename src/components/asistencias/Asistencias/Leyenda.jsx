export const Leyenda = () => {
  return (
    <div className="w-full h-full md:w-full space-y-4 bg-cv-primary p-5 rounded-lg">
      <h2 className="text-white text-center text-xl uppercase font-semibold">Leyenda</h2>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase text-sm md:text-lg font-normal">Asistencia</h3>
        <div className="w-5 h-5 rounded-full bg-[#24FF00]"></div>
      </div>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase text-sm md:text-lg font-normal">Tardanza</h3>
        <div className="w-5 h-5 rounded-full bg-[#FAFF00]"></div>
      </div>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase text-sm md:text-lg font-normal">Falta</h3>
        <div className="w-5 h-5 rounded-full bg-[#FF0000]"></div>
      </div>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase text-sm md:text-lg font-normal">Justificado</h3>
        <div className="w-5 h-5 rounded-full bg-[#57F3FF]"></div>
      </div>
    </div>
  );
};