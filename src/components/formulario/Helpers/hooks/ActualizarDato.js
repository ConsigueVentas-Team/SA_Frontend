const ActualizarDato = async (
  token,
  palabra,
  url,
  id,
  department_id = "false",
  core_id = "false",
  setIsChecked,
  area,
  Departamento
) => {
  let dataToSend = [];
  if (department_id == "false" && core_id == "false") {
    dataToSend = {
      name: palabra,
    };
  } else if (core_id == "false") {
    dataToSend = {
      name: palabra,
      department_id: area,
    };
  } else {
    dataToSend = {
      name: palabra,
      core_id: area,
      department_id: Departamento,
    };    
  }

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/${url}/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );

    if (!response.ok) throw new Error;    
    setIsChecked((prevIsChecked) => !prevIsChecked);
  } catch (error) {
    console.log(`Error al editar: ${error}`);
  }
};

export default ActualizarDato;
