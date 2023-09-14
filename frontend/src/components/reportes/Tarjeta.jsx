const Tarjeta = ({ titulo, porcentaje, numero }) => {
  return (
    <article
      className="flex bg-cv-primary rounded-lg w-2/6 py-3 flex-col justify-center  px-5 h-28
    "
    >
      <div className="w-full flex justify-between text-base font-medium ">
        <h1 className="">{titulo}</h1>
        <h2 className={porcentaje > 10 ? "text-green-500" : "text-red-500"}>
          {porcentaje}%
        </h2>
      </div>
      <h3 className="text-xl sm:text-4xl">{numero}</h3>
    </article>
  );
};

export default Tarjeta;
