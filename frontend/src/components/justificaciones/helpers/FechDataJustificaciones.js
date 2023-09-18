import { AES, enc } from "crypto-js";

export const FechDataJustificaciones = async ({ page, setLoading }) => {
  setLoading(false);
  let url = "";
  try {
    const tokenD = AES.decrypt(
      localStorage.getItem("token"),
      import.meta.env.VITE_TOKEN_KEY
    );

    const token = tokenD.toString(enc.Utf8);

    url = `${import.meta.env.VITE_API_URL}/justification?page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setLoading(true);
    // console.log(data.Justifications)
    return data.Justifications;
  } catch (error) {
    // Manejo de errores en caso de fallo en la llamada a la API
    console.error("Error al obtener los datos de la API:", error);
    return error;
  }
};
