import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";

export function useUserApi(filters) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const url = new URL(import.meta.env.VITE_API_URL + "/users/list");

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
                    if (page === 1) {
                        // Si es la primera página, reemplaza los usuarios.
                        setUsers(data.data);
                    } else {
                        // Si es una página adicional, agrega usuarios a los existentes.
                        setUsers((prevUsers) => [...prevUsers, ...data.data]);
                    }
                    setHasMore(data.data.length > 0);
                    if (data.data.length > 0) {
                        setPage((prevPage) => prevPage + 1);
                    }
                } else {
                    console.error("Error al obtener los usuarios:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [filters, page]);

    return { users, isLoading, hasMore };
}
