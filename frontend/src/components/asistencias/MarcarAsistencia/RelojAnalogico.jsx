import { useEffect, useState } from 'react';
import './relojAnalogico.css';

export const RelojAnalogico = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const segundos = hora.getSeconds() * 6;
  const minutos = hora.getMinutes() * 6 + segundos / 60;
  const horas = ((hora.getHours() - 5) % 12) / 12 * 360 + 90 + minutos / 12;

  return (
    <div className="reloj-analogico mx-auto mt-5">
      <div className="reloj-analogico__marca reloj-analogico__marca--hora" style={{ transform: `rotate(${horas}deg)` }} />
      <div className="reloj-analogico__marca reloj-analogico__marca--minuto" style={{ transform: `rotate(${minutos}deg)` }} />
      <div className="reloj-analogico__marca reloj-analogico__marca--segundo" style={{ transform: `rotate(${segundos}deg)` }} />
      <div className="reloj-analogico__numero reloj-analogico__numero--12">12</div>
      <div className="reloj-analogico__numero reloj-analogico__numero--3">3</div>
      <div className="reloj-analogico__numero reloj-analogico__numero--6">6</div>
      <div className="reloj-analogico__numero reloj-analogico__numero--9">9</div>
    </div>
  );
};