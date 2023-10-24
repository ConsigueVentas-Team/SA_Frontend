const BarraHor = ({ titulo, total, porcentaje }) => {
  const barColorClass = porcentaje < 30 ? "text-red-500" : "text-green-500";

  return (
    <>
      <h1 className="text-lg font-medium">FINALIZÓ CONVENIO</h1>
      <h2 className="text-xs font-medium">{titulo}</h2>
      <div className="flex gap-4 items-center w-full">
        <div className="w-full border-t-2 mt-3 h-20 flex justify-center items-center">
          <div>
            <h2 className="text-lg">{total}</h2>
            <h3 className={barColorClass}>{porcentaje}%</h3>
          </div>
          <div className="w-full border-l-2 p-1.5 ml-2">
            <div className="bg-white w-full rounded-lg">
              <div
                className={`bg-${porcentaje < 30 ? "red" : "green"}-500 w-3/4 h-3 rounded-lg`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarraHor;
