import moment from "moment";
import { STATUS } from "../../../constantes/JustificationStatus";

export function CardDetail({
  buttonLoading,
  faltasList,
  isRechazadoOrAceptado,
  id,
  iduser,
  rol,
  handleAceptar,
  handleRechazar,
}) {  
  
  const hasRole = (targetRole) => {
    return rol === targetRole;
  };
  
  //Función para descargar la imagen al hacer click al botton
  const handleDownloadImage = (name, lastName, url)=>{    
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const _url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = _url;
        link.download = `${name}${lastName}-justificacion.jpg`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(_url);
      })
      .catch((e)=> console.log(e));
  }
  
  const transformedUrl = (url)=>{
    const result = url.replace('http', 'https');
    return result;    
  }

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
            {
              item.justification_status !== 3 &&
              <div className="mb-3 text-center w-full bg-cv-primary flex flex-col p-4 rounded-lg border border-gray-500">
                <h2 className="font-medium text-slate-400 text-xl uppercase">
                  {item.justification_status === 2 && STATUS.RECHAZADO}
                  {item.justification_status === 1 && STATUS.ACEPTADO}
                </h2>
                <div className="text-start mt-5 flex m-auto w-full justify-between">
                  <div className="">
                    <h3 className="text-slate-400 font-medium">Revisado por: </h3>
                    <span className="font-medium">
                      {item.action_by.name} {item.action_by.surname}
                    </span>
                  </div>
                  <div>
                    {
                      item.justification_status === 2 &&
                      <>
                        <h3 className="text-slate-400 font-medium">Razón:</h3>
                        <span className="font-medium">
                          {item.reason_decline}
                        </span>
                      </>
                    }                    
                  </div>
                </div>              
              </div>
            }
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
                        <p className="capitalize text-lg">
                          {item.justification_type ? "Tardanza" : "Falta"}
                        </p>
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
                          <p className="capitalize text-lg">{`${item.user.name} ${item.user.surname}`}</p>
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
                  <div className="flex flex-col w-full f-center justify-center items-center">
                    <img className="max-w-lg w-full object-cover object-center aspect-square"
                      src={transformedUrl(item.evidence)}
                      alt="Image"
                    />
                    <button onClick={()=>{handleDownloadImage(item.user.name, item.user.surname, item.evidence)}} className="w-fit m-auto mt-4 uppercase basis-1/6 border-2  border-cv-cyan hover:bg-cv-cyan hover:text-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300 text-cv-cyan">Descargar</button>
                  </div>
                ) : item.evidence.endsWith(".pdf") ? (
                  <embed
                    src={transformedUrl(item.evidence)}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                ) : (
                  <div>Unsupported file format</div>
                )}
              </div>
            </div>

            {hasRole("Gerencia") && item.user.id != iduser && item?.justification_status ==3 && (
              <div className="flex justify-center flex-row gap-10 mt-4">
                <button
                  onClick={() => handleRechazar(item)}
                  className="uppercase basis-1/6 border-2  border-cv-cyan hover:bg-cv-cyan hover:text-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300 text-cv-cyan"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => handleAceptar(item)}
                  className="text-cv-primary basis-1/6 uppercase border-2 border-cv-cyan bg-cv-cyan hover:font-bold font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300"
                  disabled={buttonLoading}
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
