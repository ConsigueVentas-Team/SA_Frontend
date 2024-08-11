import { AES, enc } from "crypto-js";

export const optimizaciónUpdate = (users) => {
    

    users.forEach(user=> {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("surname", user.surname);
      formData.append("email", user.email);
      formData.append("dni", user.dni);
      formData.append("position_id", user.position.id);
      formData.append("cellphone", user.cellphone);
      formData.append("shift", user.shift);
      formData.append("birthday", user.birthday);
      formData.append("date_start", user.date_start);
      formData.append("date_end", user.date_end);
      formData.append("avatar", user.avatar);
      formData.append("role", user.role.id);
      formData.append("status", user.status);
      formData.append("status_description", user.status_description);

    formData.append("_method", "PATCH");
      fecthUpdate(user.id, formData);
    })    
}

const fecthUpdate = async (id, formData)=>{
  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/users/${id}/update`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if(response.ok) console.log(response)
  }catch(err) {
    console.log(err)
  }
}