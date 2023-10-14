import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";

export function useUserApi(filters) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            setIsLoading(true);
            try {
                let allUsers = [];
                let page = 1;

                while (true) {
                    const url = new URL(import.meta.env.VITE_API_URL + "/users");

                    // Agregar los filtros
                    for (const [key, value] of Object.entries(filters)) {
                        if (value) url.searchParams.append(key, value);
                    }

                    url.searchParams.append("page", page);

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
                        allUsers = allUsers.concat(data.data);

                        // Si no hay más resultados, salir del bucle
                        if (data.data.length < 1) {
                            break;
                        }

                        page++;
                    } else {
                        console.error("Error al obtener los usuarios:", data.error);
                        setIsLoading(false);
                        return;
                    }
                }

                setUsers(allUsers);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
                setIsLoading(false);
            }
        };

        obtenerUsuarios();
    }, [filters]);

    return { users, isLoading };
}
