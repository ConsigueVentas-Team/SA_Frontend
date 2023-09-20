

const ObtenerDatos = async (token, url) => {
  if (url === "position" || url === "cores" || url === "departments") {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/${url}/list`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los departamentos:", error);
    }
  }
};


export default ObtenerDatos;
