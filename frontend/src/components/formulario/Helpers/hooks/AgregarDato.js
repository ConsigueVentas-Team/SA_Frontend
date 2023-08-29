import { AES, enc } from "crypto-js";
import ObtenerDatos from "./ObtenerDatos";
const tokenD = AES.decrypt(
  localStorage.getItem("token"),
  import.meta.env.VITE_TOKEN_KEY
);
const token = tokenD.toString(enc.Utf8);

const AgregarDato = async (
  palabra,
  url,
  department_id = "false",
  core_id = "false"
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
        department_id,
      };
    } else {
      dataToSend = {
        name: palabra,
        department_id,
        core_id,
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
      console.log("Usuario agregado exitosamente");
      //actualizar data
    } else {
      console.error("Error al guardar los datos");
    }
  } catch (error) {
    console.error(`Error al agregar usuario: ${error}`);
  }
};

export default AgregarDato;
