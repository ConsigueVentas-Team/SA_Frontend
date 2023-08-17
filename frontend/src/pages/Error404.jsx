import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    // <section className="flex items-center h-full p-16 bg-cv-secondary">
    //   <div className="container flex flex-col items-center ">
    //     <div className="flex flex-col gap-6 max-w-xl text-center">
    //       <h2 className="font-extrabold text-9xl text-cv-primary">
    //         <span className="sr-only">Error</span>404
    //       </h2>
    //       <p className="text-lg md:text-2xl text-slate-300">Lo sentimos, no pudimos encontrar esta página.</p>
    //       <Link to="/" className="px-8 py-4 text-xl font-semibold rounded bg-cv-cyan text-cv-primary hover:text-gray-200">Back to homepage</Link>
    //     </div>
    //   </div>
    // </section>


    <section className="h-full w-full flex flex-col justify-center items-center bg-cv-secondary">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-cv-cyan text-cv-primary px-2 text-sm font-semibold rounded rotate-12 absolute">
        Pagina no encontrada
      </div>
      <button className="mt-5">
        <a
          className="relative inline-block text-sm font-medium text-cv-cyan group active:text-cyan-500 focus:outline-none focus:ring"
        >
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-cv-cyan group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

            <Link to="/" className="relative block px-8 py-3 bg-cv-primary border border-current">Go Home</Link>
        </a>
      </button>
    </section>
  )
}
