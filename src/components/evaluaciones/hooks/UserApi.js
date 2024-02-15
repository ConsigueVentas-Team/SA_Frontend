import { useState, useEffect } from "react";
import { AES, enc } from "crypto-js";

export function useUserApi() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false); // Cambiar a "false" inicialmente

    useEffect(() => {
        const fetchUsers = async () => {
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
    }, []);

    return { users, isLoading, hasMore };
}
