import { useEffect, useState } from "react";

const FrasesLogin = () => {
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * Frases.length);
    setRandomQuote(Frases[randomIndex]);
  }, []);

  return (
    <p className="w-full h-full font-light text-lg leading-tight">
      {randomQuote}
    </p>
  );
};

const Frases = [
  "Céntrate hacia dónde quieres ir, no en lo que temes.",
  "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
  "La vida es 10% lo que te sucede y 90% cómo reaccionas ante ello.",
  "El éxito no es el final, el fracaso no es fatal: lo que cuenta es el coraje para seguir adelante.– Winston Churchill",
  "Trabaja duro en silencio, deja que tu éxito haga ruido.",
];

export default FrasesLogin;
