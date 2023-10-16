import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TablaEvaluaciones from "../../../components/evaluaciones/Evaluador/TablaEvaluaciones";
import { AES, enc } from "crypto-js";
import Modal from "../../views/evaluaciones/Modal";
import Loading from "../../../components/essentials/Loading";

export const GestionEvaluaciones = () => {
  const { id, name } = useParams();
  const [idd, setIdd] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rol, setRol] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const tokenKey = import.meta.env.VITE_TOKEN_KEY;

        const url = new URL(`${apiUrl}/evaluation/list`);

        const tokenD = AES.decrypt(localStorage.getItem("token"), tokenKey);
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
          const foundUser = data.find((item) => item.user_id === parseInt(id));

          if (foundUser) {
            setUser(foundUser.user);
            setIdd(foundUser.id);  
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
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const tokenKey = import.meta.env.VITE_TOKEN_KEY;

        const url = new URL(`${apiUrl}/users/${id}`);

        const tokenD = AES.decrypt(localStorage.getItem("token"), tokenKey);
        const token = tokenD.toString(enc.Utf8);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw Error(
            `Error al obtener datos del usuario: ${response.status}`
          );
        }

        const userData = await response.json();


        setRol(userData.usuario.roles[0].name);
      } catch (error) {
        console.error(
          "Error al obtener los datos adicionales del usuario:",
          error.message
        );
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <button onClick={handleOpenModal}>Abrir Modal</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} idd={idd} />

      <div className="flex flex-col gap-4">

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="w-full rounded-lg bg-cv-primary py-4 px-8">
              <div className="flex flex-row justify-between">
                <p className="text-gray-400">Nombre:</p>
                <p className="text-gray-400">Nota Final:</p>
              </div>

              <div className="flex flex-row justify-between">
                <p>
                  {name
                    .toLowerCase()
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  {id}
                </p>
                <p>15.5</p>
              </div>
            </div>
            <TablaEvaluaciones rol={rol} id={id} setIdd={setIdd} />
          </div>
        )}
      </div>
    </>
  );
};
