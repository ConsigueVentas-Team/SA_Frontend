const ObtenerDatos = async (token, url, setCargando, page=1) => {
  if (url === "position" || url === "cores" || url === "departments") {
    try {
      if (setCargando != null) {
        setCargando(true);
      }      
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/${url}/list?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();      
      if (setCargando != null) {
        setCargando(false);
      }      
      return data;
    } catch (error) {
      console.error("Error al obtener los departamentos:", error);
      if (setCargando != null) {
        setCargando(true);
      }
    }
  }
};

export default ObtenerDatos;
