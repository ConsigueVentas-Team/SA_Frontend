import React, { useEffect, useState } from 'react';

const useUser = (userId) => {
    const [user, setUser] = useState();

    const fetchData = async () => {
        try {
          const tokenD = AES.decrypt(
            localStorage.getItem("token"),
            import.meta.env.VITE_TOKEN_KEY
          );
          const token = tokenD.toString(enc.Utf8);
          const response = await fetch(
            import.meta.env.VITE_API_URL + `/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setUser(data);            
          } else {
            console.error("Error fetching data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(()=>{
        fetchData();
      },[])

      return {user}
};

export default useUser;