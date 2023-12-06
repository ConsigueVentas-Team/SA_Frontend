import moment from "moment";

export function CardDetail({ faltasList, isRechazadoOrAceptado, id}) {
  console.log("Faltas List ", faltasList)
  console.log("Rechazado o Aceptado ", isRechazadoOrAceptado)
  console.log("ID ", id)
  const rol = "Lider Nucleo"
  const hasRole = (targetRole) => {
    return rol === targetRole;
  };
  return (
    <div className="rounded-lg mt-2">
      {faltasList
        .filter((item) => {
          const idConvertido = Number(id);
          if (item.id === idConvertido) {
            return true;
          } else {
            return false;
          }
        })
        .map((item) => (
          <div key={item.id} className="mb-6">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="bg-cv-primary text-slate-400 flex flex-col p-4 rounded-lg md:w-3/5 border border-gray-500">
                <h2 className="text-lg font-semibold text-center">
                  JUSTIFICACIÓN Nº {item.id}
                </h2>
                <div className="mt-6 bg-cv-primary text-white rounded">
                  <div className="w-full flex flex-col md:flex-row md:space-x-12 items-center ">
                    <div className="w-full md:w-auto flex-1">
                      <div className="text-sm font-medium">
                        <label className="text-slate-400 text-base">
                          Tipo:
                        </label>
                        <p className="capitalize text-lg">{`${
                          item.type === 0 ? "Falta" : "Tardanza"
                        }`}</p>
                      </div>
                    </div>
                    <div className="w-full md:w-auto flex-1">
                      <div className="text-sm font-medium">
                        <label className="text-slate-400 text-base">
                          Fecha:
                        </label>
                        <p className="text-lg">
                          {moment(item.justification_date).format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>
                    {hasRole("Lider Nucleo") && (
                      <div className="w-full md:w-auto flex-1">
                        <div className="text-sm font-medium">
                          <label className="font-medium text-slate-400 text-base">
                            Estado:
                          </label>
                          <p className="capitalize text-lg">
                            {isRechazadoOrAceptado(item)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-sm font-medium">
                    <label className="text-slate-400 text-base">Motivo:</label>
                    <p>{item.reason}</p>
                  </div>
                </div>
              </div>

              {hasRole("Colaborador") ? (
                <div className="bg-cv-primary text-white flex flex-col p-4 rounded-lg md:w-2/5 border border-gray-500">
                  <h2 className="text-lg uppercase font-semibold text-center">
                    Información
                  </h2>
                  <div className="mt-6 space-y-4 bg-cv-primary text-white rounded">
                    <div className="w-full md:w-auto">
                      <div className="text-sm font-medium">
                        <label className="font-medium text-slate-400 text-base">
                          Estado:
                        </label>
                        <p className="capitalize text-lg">
                          {isRechazadoOrAceptado(item)}
                        </p>
                      </div>
                    </div>
                    {isRechazadoOrAceptado(item) === "Rechazado" && (
                      <div className="w-full md:w-auto">
                        <label className="font-medium text-slate-400 text-base">
                          Motivo:
                        </label>
                        <p className="text-left mt-2">{item.reason_decline}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-cv-primary text-slate-400 flex flex-col p-4 rounded-lg md:w-2/5 border border-gray-500">
                  <h2 className="text-lg uppercase font-semibold text-center">
                    Datos Usuario
                  </h2>
                  <div className="mt-6 space-y-4 bg-cv-primary text-white rounded">
                    <div className="w-full md:w-auto">
                      <div className="text-sm font-medium">
                        <label className="font-medium text-slate-400 text-base">
                          Nombre:
                        </label>
                        <p className="capitalize text-lg">{item.user.name}</p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row md:space-x-12 items-center ">
                      <div className="w-full md:w-auto flex-1">
                        <div className="text-sm font-medium">
                          <label className="text-slate-400 text-base">
                            DNI:
                          </label>
                          <p className="capitalize text-lg">{item.user.dni}</p>
                        </div>
                      </div>
                      <div className="w-full md:w-auto flex-1">
                        <div className="text-sm font-medium">
                          <label className="text-slate-400 text-base">
                            Teléfono:
                          </label>
                          <p className="capitalize text-lg">
                            {item.user.cellphone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-cv-primary mt-3 rounded-xl p-4 border border-gray-500">
              <div className="font-semibold text-center text-white mb-8">
                <p className="uppercase text-lg">Evidencia</p>
              </div>
              <div className="flex items-center justify-center">
                {item.evidence.endsWith(".jpg") ||
                item.evidence.endsWith(".png") ||
                item.evidence.endsWith(".jpeg") ? (
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_SERVER_URL +
                      `/${item.evidence}`
                    }
                    alt="Image"
                  />
                ) : item.evidence.endsWith(".pdf") ? (
                  <embed
                    src={
                      import.meta.env.VITE_BACKEND_SERVER_URL +
                      `/${item.evidence}`
                    }
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                ) : (
                  <div>Unsupported file format</div>
                )}
              </div>
            </div>

            {hasRole("Lider Nucleo") /*&& item.user.id != iduser*/ && (
              <div
                className="flex justify-center flex-row
                                         gap-10 mt-4"
              >
                <button
                  onClick={() => handleRechazar(item)}
                  className="uppercase basis-1/6 border-2  border-cv-cyan hover:bg-cv-cyan hover:text-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300 text-cv-cyan"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => handleAceptar(item)}
                  className="text-cv-primary basis-1/6 uppercase border-2 border-cv-cyan bg-cv-cyan hover:font-bold font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300"
                >
                  Aceptar
                </button>
              </div>
            )}
            {hasRole("Gerencia") /*&& item.user.id != iduser*/ && (
              <div
                className="flex justify-center flex-row
                                         gap-10 mt-4"
              >
                <button
                  onClick={() => handleRechazar(item)}
                  className="uppercase basis-1/6 border-2  border-cv-cyan hover:bg-cv-cyan hover:text-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300 text-cv-cyan"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => handleAceptar(item)}
                  className="text-cv-primary basis-1/6 uppercase border-2 border-cv-cyan bg-cv-cyan hover:font-bold font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300"
                >
                  Aceptar
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
