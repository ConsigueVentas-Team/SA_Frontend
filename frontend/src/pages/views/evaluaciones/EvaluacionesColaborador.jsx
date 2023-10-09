import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nota from '../../../components/evaluaciones/Evaluacion/Nota';

export const EvaluacionesColaborador = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const tokenKey = import.meta.env.VITE_TOKEN_KEY;

        const url = new URL(`${apiUrl}/evaluation/list`);

        const tokenD = AES.decrypt(
          localStorage.getItem("token"),
          tokenKey
        );
        const token = tokenD.toString(enc.Utf8);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.status}`);
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          const foundUser = data.find(item => item.user && item.user.id === parseInt(id));


          if (foundUser) {
            setUser(foundUser.user);
          } else {
            console.error(`No se encontró un usuario con el ID ${id}.`);
          }
        } else {
          console.error("No se encontraron usuarios en la respuesta de la API.");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div>
      {/* <h2>{id}</h2> */}
      <Nota />
    </div>
  );
};
