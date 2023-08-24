import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./layouts";
import { Error404 } from "./pages/Error404";
//Auth Pages
import { Login } from "./pages/auth/Login";
import { OlvideContraseña } from "./pages/auth/OlvideContraseña";
import { RestablecerContraseña } from "./pages/auth/RestablecerContraseña";
import {CambiarContraseña} from "./pages/auth/CambiarContraseña";

//Views Pages
import { Home } from "./pages/views/Home";
import { Perfil } from "./pages/views/Perfil";
import { Cumpleaños } from "./pages/views/Cumpleaños";
import { Colaboradores } from "./pages/views/Colaboradores";
import { Asistencias } from "./pages/views/asistencias/Asistencias";
import { MarcarAsistencia } from "./pages/views/asistencias/MarcarAsistencia";
import { Justificaciones } from "./pages/views/justificaciones/justificaciones";
import { AñadirJustificacion } from "./pages/views/justificaciones/AñadirJustificacion";




function App() {

  const rol = localStorage.getItem('rol');
  const isLoggedIn = localStorage.getItem('login') === 'true';
  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (targetRole) => {
    return rol === targetRole;
  };

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<Home />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="marcar-asistencia" element={<MarcarAsistencia />} />
            <Route path="cumpleaños" element={<Cumpleaños />} />
            <Route path="añadir-justificacion" element={<AñadirJustificacion />} />
            <Route path="cambiar-contraseña" element={<CambiarContraseña />} />
            <Route path="/login" element={<Login />} />

            {hasRole('Lider Nucleo') && (
              <>
                <Route path="colaboradores" element={<Colaboradores />} />
                <Route path="justificaciones" element={<Justificaciones />} />
                <Route path="asistencias" element={<Asistencias />} />
              </>
            )}
            {hasRole('Gerencia') && (
              <>
                <Route path="colaboradores" element={<Colaboradores />} />
                <Route path="justificaciones" element={<Justificaciones />} />
                <Route path="asistencias" element={<Asistencias />} />
              </>
            )}
            <Route path="/*" element={<Error404 />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/olvide-contraseña" element={<OlvideContraseña />} />
            <Route path="/restablecer-contraseña" element={<RestablecerContraseña />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
