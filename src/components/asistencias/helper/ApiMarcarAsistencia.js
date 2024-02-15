import { AES, enc } from "crypto-js";
export const handleRegistroAsistencia2 = async (tipo, fotoCapturada) => {
    const fecha = new Date().toISOString().slice(0, 10);
  
    const formData = new FormData();
    const shift = localStorage.getItem("shift");
    const iduser = localStorage.getItem("iduser");
    const photoName = `${shift.charAt(0)}-${iduser}-${tipo === "admission" ? "e" : "s"
      }-${fecha}.jpg`;
  
    formData.append(`${tipo}_image`, fotoCapturada, photoName);
  
    const tokenD = AES.decrypt(
      localStorage.getItem("token"),
      import.meta.env.VITE_TOKEN_KEY
    );
  
    const token = tokenD.toString(enc.Utf8);
  
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/schedule/check", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Solicitud fallida con estado ${response.status}`);
      }
  
      const responseData = await response.text();
      
      if (responseData === "Sin horario") {
        return { error: "Sin horario" };
      }
  
      const data = JSON.parse(responseData);
      return data; 
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw error; 
    }
  }
  