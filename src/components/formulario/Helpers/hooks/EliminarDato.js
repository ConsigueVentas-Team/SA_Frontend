

const EliminarDato = async (token, idEliminar, url, setIsChecked) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/${url}/delete/${idEliminar}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      //actualizar data
      setIsChecked((prevIsChecked) => !prevIsChecked);
    } else {
      console.error("Error al eliminar los datos");
    }
  } catch (error) {
    console.error(`Error al eliminar usuario: ${error}`);
  }
};

export default EliminarDato;
