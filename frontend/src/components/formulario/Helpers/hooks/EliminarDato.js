import { AES, enc } from "crypto-js";
const tokenD = AES.decrypt(
  localStorage.getItem("token"),
  import.meta.env.VITE_TOKEN_KEY
);
const token = tokenD.toString(enc.Utf8);

const EliminarDato = async (idEliminar, url) => {
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
      console.log("Dato eliminado exitosamente");
    } else {
      console.error("Error al eliminar los datos");
    }
  } catch (error) {
    console.error(`Error al eliminar usuario: ${error}`);
  }
};

export default EliminarDato;
