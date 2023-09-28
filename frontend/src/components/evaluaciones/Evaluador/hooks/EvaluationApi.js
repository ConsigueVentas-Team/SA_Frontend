import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";

export function useEvaluationApi(filters) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [columnTitles, setColumnTitles] = useState([]); // Almacenar títulos de columna

  useEffect(() => {
    const obtenerUsuarios = async (page) => {
      setIsLoading(true);
      try {
        const url = new URL(import.meta.env.VITE_API_URL + "evaluation/list");
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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.data);
          setIsLoading(false);

          // Extraer títulos de columna del primer usuario (suponiendo que todos tienen las mismas columnas)
          if (data.data.length > 0) {
            const firstUser = data.data[0];
            const titles = Object.keys(firstUser);
            setColumnTitles(titles);
          }
        } else {
          console.error("Error al obtener los usuarios:", data.error);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setIsLoading(false);
      }
    };

    obtenerUsuarios(0);
  }, [filters]);

  return { users, isLoading, columnTitles };
}
