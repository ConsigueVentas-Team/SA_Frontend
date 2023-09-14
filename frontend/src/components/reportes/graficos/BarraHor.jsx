const BarraHor = () => {
  return (
    <>
      <h1 className="text-lg font-medium ">TIPOS DE SALIDAS</h1>
      <h2 className="text-xs font-medium ">FINALIZÓ CONVENIO</h2>
      <div className="flex gap-4 items-center w-full">
        <div className="w-full border-t-2 mt-3  h-20 flex justify-center items-center">
          <div>
            <h2 className="text-lg">20</h2>
            <h3 className="text-green-500">80%</h3>
          </div>
          <div className="w-full  border-l-2 p-0.5 ml-2">
            <div className="bg-white w-full rounded-lg ">
              <div className="bg-red-500 w-3/4 h-3 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarraHor;
