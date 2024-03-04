import toast from "react-hot-toast";

export default function mostrarErrores(errors) {
    for (const field in errors) {
      errors[field].forEach((error) => {
        toast.error(error);
      });
    }
  }