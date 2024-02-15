import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full bg-cv-secondary">
      <h1 className="font-extrabold tracking-widest text-white text-9xl">404</h1>
      <div className="absolute px-2 text-sm font-semibold rounded bg-cv-cyan text-cv-primary rotate-12">
        Pagina no encontrada
      </div>
      <button className="mt-5">
        <a
          className="relative inline-block text-sm font-medium text-cv-cyan group active:text-cyan-500 focus:outline-none focus:ring"
        >
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-cv-cyan group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <Link to="/" className="relative block px-8 py-3 border border-current bg-cv-primary">Go Home</Link>
        </a>
      </button>
    </section>
  )
}
