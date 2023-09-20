import { useEffect, useState } from 'react';

export const RelojAnalogico = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = (360 / 12) * hours + (360 / 12) * (minutes / 60);
  const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  const secondAngle = (360 / 60) * seconds;

  return (
    <div className="mx-auto mt-5 w-40 h-40 rounded-full bg-gray-200 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 origin-bottom bg-gray-500 w-1.5 h-8 -ml-0 -mt-8 rounded-t-3xl" style={{ transform: `rotate(${hourAngle}deg)` }} />
      <div className="absolute left-1/2 top-1/2 origin-bottom bg-gray-500 w-1 h-12 -ml-0 -mt-12 rounded-t-3xl" style={{ transform: `rotate(${minuteAngle}deg)` }} />
      <div className="absolute left-1/2 top-1/2 origin-bottom bg-gray-500 w-0.5 h-20 ml-0 -mt-20 rounded-t-3xl" style={{ transform: `rotate(${secondAngle}deg)` }} />
      <div className="font-bold absolute text-black text-xl top-2 left-1/2 transform translate-x-[-50%]">12</div>
      <div className="font-bold absolute text-black text-xl top-1/2 right-2 transform translate-y-[-50%]">3</div>
      <div className="font-bold absolute text-black text-xl bottom-2 left-1/2 transform translate-x-[-50%]">6</div>
      <div className="font-bold absolute text-black text-xl top-1/2 left-2 transform translate-y-[-50%]">9</div>
    </div>
  );
};