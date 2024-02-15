import React from "react";

const TarjetaAsistencia = ({ name1,asistencias, name2,faltas, name3,justificaciones, name4,tardanzas }) => {
  return (
    <div className="w-full ">
      <h1 className="text-lg font-medium">DATOS TOTALES</h1>
      <article className="w-11/12 my-6 mx-auto flex flex-col gap-7">
        <div className="border-b-2 flex justify-between pb-1.5">
          <h2>{name1}</h2>
          <p>{asistencias}</p>
        </div>
        <div className="border-b-2 flex justify-between pb-1.5">
          <h2>{name2}</h2>
          <p>{tardanzas}</p>
        </div>
        <div className="border-b-2 flex justify-between pb-1.5">
          <h2>{name3}</h2>
          <p>{faltas}</p>
        </div>
        <div className="border-b-2 flex justify-between pb-1.5">
          <h2>{name4}</h2>
          <p>{justificaciones}</p>
        </div>
      </article>
    </div>
  );
};

export default TarjetaAsistencia;
