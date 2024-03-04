const AgregarDato = async (
  token,
  palabra,
  url,
  department_id = "false",
  core_id = "false",
  setIsChecked
) => {
  try {
    let dataToSend = [];
    if (department_id == "false" && core_id == "false") {
      dataToSend = {
        name: palabra,
      };
    } else if (core_id == "false") {
      dataToSend = {
        name: palabra,
        department:parseInt(department_id),
      };
    } else {
      dataToSend = {
        name: palabra,
        department:parseInt(department_id),
        core:parseInt(core_id),
      };
    }

    const response = await fetch(
      import.meta.env.VITE_API_URL + `/${url}/create`,
      {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setIsChecked((prevIsChecked) => !prevIsChecked);
    } else {
      console.error("Error al guardar los datos");
    }
  } catch (error) {
    console.error(`Error al agregar usuario: ${error}`);
  }
};

export default AgregarDato;
