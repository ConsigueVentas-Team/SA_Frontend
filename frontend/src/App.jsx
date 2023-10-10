import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LayoutAdmin } from './layouts'
import { Error404 } from './pages/Error404'
//Auth Pages
import { Login } from "./pages/auth/Login";
import { OlvideContraseña } from "./pages/auth/OlvideContraseña";
import { RestablecerContraseña } from "./pages/auth/RestablecerContraseña";
import { CambiarContraseña } from "./pages/auth/CambiarContraseña";
//Views Pages
import { Home } from "./pages/views/Home";
import { Perfil } from "./pages/views/Perfil";
import { PerfilColaborador } from './pages/views/PerfilColaborador'
import { Cumpleaños } from "./pages/views/Cumpleaños";
import { Colaboradores } from "./pages/views/Colaboradores";
import { Asistencias } from "./pages/views/asistencias/Asistencias";
import { MarcarAsistencia } from "./pages/views/asistencias/MarcarAsistencia";
import { MarcarAsistencia2 } from "./pages/views/asistencias/MarcarAsistencia2";
import { Justificaciones } from "./pages/views/justificaciones/Justificaciones";
import { AñadirJustificacion } from "./pages/views/justificaciones/AñadirJustificacion";
import { Nucleo } from "./pages/views/formulario/nucleo";
import { Departamento } from "./pages/views/formulario/departamento";
import Formulario from "./pages/views/formulario";
import { Area } from "./pages/views/formulario/area";
import { EvaluacionesColaborador } from "./pages/views/evaluaciones/EvaluacionesColaborador";
import { EvaluacionesAdmin } from "./pages/views/evaluaciones/EvaluacionesAdmin";
import { RevisarJustificacion } from './components/justificaciones/RevisarJustificacion';
import Reportes from './pages/views/Reportes';
import { useEffect, useState } from 'react';
import { MiEvaluacion } from './pages/views/evaluaciones/MiEvaluacion';
function App() {
  const rol = localStorage.getItem("rol");
  const isLoggedIn = localStorage.getItem("login") === "true";
  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (targetRole) => {
    return rol === targetRole;
  };

  const [isActive, setIsActive] = useState(true);
  let inactivityTimer;

  const resetTimer = () => {
    setIsActive(true);
  };

  const handleInactivity = () => {
    setIsActive(false);
    logoutSubmit();
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(handleInactivity, 2 * 60 * 1000);
  };

  useEffect(() => {
    resetInactivityTimer();

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'wheel'];

    const handleActivity = () => {
      resetTimer();
      resetInactivityTimer();
    };

    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(inactivityTimer);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<Home />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="marcar-asistencia" element={<MarcarAsistencia />} />
            <Route path="marcar-asistencia2" element={<MarcarAsistencia2 />} />
            <Route path="cumpleaños" element={<Cumpleaños />} />
            <Route
              path="añadir-justificacion"
              element={<AñadirJustificacion />}
            />
            <Route path='details/:id' element={<RevisarJustificacion />} />
            <Route path="evaluacion" element={<MiEvaluacion />} />
            <Route path="cambiar-contraseña" element={<CambiarContraseña />} />
            <Route path="/login" element={<Login />} />

            {hasRole("Lider Departamento") && (
              <>
                <Route path="colaboradores" element={<Colaboradores />} />
                <Route path="justificaciones" element={<Justificaciones />} />
                <Route path="asistencias" element={<Asistencias />} />
                <Route path="/colaborador/:id/perfil" element={<PerfilColaborador />} />
                <Route path="evaluacion" element={<MiEvaluacion />} />
                <Route path="evaluacion/:id/:name" element={<EvaluacionesColaborador />} />
                <Route path="evaluaciones" element={<EvaluacionesAdmin />} />
                <Route path="empresa" element={<Formulario />} />
                <Route path="empresa/departamento" element={<Departamento />} />
                <Route path="empresa/nucleo" element={<Nucleo />} />
                <Route path="empresa/perfil" element={<Area></Area>} />
                <Route path="reportes" element={<Reportes></Reportes>} />
              </>
            )}

            {hasRole("Lider Nucleo") && (
              <>
                <Route path="colaboradores" element={<Colaboradores />} />
                <Route path="justificaciones" element={<Justificaciones />} />
                <Route path="asistencias" element={<Asistencias />} />
                <Route path="/colaborador/:id/perfil" element={<PerfilColaborador />} />
                <Route path="evaluacion" element={<MiEvaluacion />} />
                <Route path="evaluacion/:id/:name" element={<EvaluacionesColaborador />} />
                <Route path="evaluaciones" element={<EvaluacionesAdmin />} />
                <Route path="empresa" element={<Formulario />} />
                <Route path="empresa/departamento" element={<Departamento />} />
                <Route path="empresa/nucleo" element={<Nucleo />} />
                <Route path="empresa/perfil" element={<Area></Area>} />
                <Route path="reportes" element={<Reportes></Reportes>} />
              </>
            )}
            {hasRole("Gerencia") && (
              <>
                <Route path="colaboradores" element={<Colaboradores />} />
                <Route path="justificaciones" element={<Justificaciones />} />
                <Route path="asistencias" element={<Asistencias />} />
                <Route path="/colaborador/:id/perfil" element={<PerfilColaborador />} />
                <Route path="evaluacion" element={<MiEvaluacion />} />
                <Route path="evaluacion/:id/:name" element={<EvaluacionesColaborador />} />
                <Route path="evaluaciones" element={<EvaluacionesAdmin />} />
                <Route path="empresa" element={<Formulario />} />
                <Route path="empresa/departamento" element={<Departamento />} />
                <Route path="empresa/nucleo" element={<Nucleo />} />
                <Route path="empresa/perfil" element={<Area></Area>} />
                <Route path="reportes" element={<Reportes></Reportes>} />
              </>
            )}
            <Route path="/*" element={<Error404 />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/olvide-contraseña" element={<OlvideContraseña />} />
            <Route
              path="/restablecer-contraseña"
              element={<RestablecerContraseña />}
            />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function logoutSubmit() {
  if (localStorage.getItem('login') === 'true') {
    window.location.reload();
  }
  localStorage.setItem('login', 'false');
  localStorage.setItem('loginStatus', 'Cierre de sesión exitoso!');
}