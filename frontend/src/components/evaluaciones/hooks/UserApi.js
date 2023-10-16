import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";

export function useUserApi(filters) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const obtenerUsuarios = async (page) => {
            setIsLoading(true);
            try {
                const url = new URL(import.meta.env.VITE_API_URL + "/users/list");

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

    return { users, isLoading };
}
