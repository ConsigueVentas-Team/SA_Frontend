import React from 'react';

export const Leyenda = () => {
  return (
    <div className="w-full md:w-1/3 space-y-4 bg-cv-primary p-5 rounded-lg">
      <h2 className="text-white text-center text-xl uppercase font-semibold">Leyenda</h2>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase font-normal">Asistencia</h3>
        <div className="w-5 h-5 rounded-full bg-[#24FF00]"></div>
      </div>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase font-normal">Tardanza</h3>
        <div className="w-5 h-5 rounded-full bg-[#FAFF00]"></div>
      </div>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase font-normal">Falta</h3>
        <div className="w-5 h-5 rounded-full bg-[#FF0000]"></div>
      </div>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase font-normal">Justificado</h3>
        <div className="w-5 h-5 rounded-full bg-[#57F3FF]"></div>
      </div>
      <div className="w-full flex items-center justify-between space-x-3">
        <h3 className="text-white uppercase font-normal">Dia no Laborable</h3>
        <div className="w-5 h-5 rounded-full bg-[#9A9A9A]"></div>
      </div>
    </div>
  );
};