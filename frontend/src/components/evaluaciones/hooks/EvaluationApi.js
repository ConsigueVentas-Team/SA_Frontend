import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";

export function useEvaluationApi(filters) {
  const [notas, setNotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerNotas = async (page) => {
      setIsLoading(true);
      try {
        const url = new URL(import.meta.env.VITE_API_URL + "/evaluation/list");
        url.searchParams.append("page", page);

        for (const [key, value] of Object.entries(filters)) {
          if (value) url.searchParams.append(key, value);
        }

        const tokenD = AES.decrypt(
          localStorage.getItem("token"),
          import.meta.env.VITE_TOKEN_KEY
        );
        const token = tokenD.toString(enc.Utf8);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setNotas(data.data);
          setIsLoading(false);
        } else {
          console.error("Error al obtener las notas:", data.error);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener las notas:", error);
        setIsLoading(false);
      }
    };

    obtenerNotas(0);
  }, [filters]);

  return { notas, isLoading };
}




