import { useEffect, useState } from "react";
import { AES, enc } from "crypto-js";
import CakeIcon from "@mui/icons-material/Cake";
import { BirthdayList, Calendar } from "../../components/cumpleaños";
import Loading from "../../components/essentials/Loading";

export const Birthday = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [month, setMonth] = useState(new Date());  
  const [loading, setLoading] = useState(false);
  // const [selectedDay, setSelectedDay] = useState('')

  const tokenD = AES.decrypt(
    localStorage.getItem("token"),
    import.meta.env.VITE_TOKEN_KEY
  );
  const token = tokenD.toString(enc.Utf8);

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays = async (
    selectedMonth = new Date().getMonth() + 1,
    selectedDay = ""
  ) => {
    try {
      setLoading(true)
      const url = new URL(import.meta.env.VITE_API_URL + "/birthday/details");

      url.searchParams.append("m", selectedMonth);
      url.searchParams.append("d", selectedDay);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBirthdays(data);
      } else {
        console.error("Error al obtener los cumpleaños:", data.error);
      }
    } catch (error) {
      console.error("Error al obtener los cumpleaños:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleDayClick = (selectedDay) => {
    const selectedMonth = selectedDay.getMonth() + 1;
    const selectedDayOfMonth = selectedDay.getDate();
    fetchBirthdays(selectedMonth, selectedDayOfMonth);
  };

  return (
    <>
      <section>
        <div className="w-full mb-5">
          <nav className="flex">
            <ol className="inline-flex items-center space-x-1 uppercase md:space-x-3">
              <li className="inline-flex items-center">
                <div className="inline-flex items-end gap-2 text-base font-medium text-white">
                  <CakeIcon />
                  <span className="ml-1 text-base font-medium leading-none">
                    Cumpleaños
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {loading ? <Loading />
          : (
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              <div className="w-full">
                <BirthdayList data={birthdays} selectedMonth={month.toLocaleString("es-ES", { month: "long" }).toUpperCase()} />
              </div>
              <div className="w-full">
                <Calendar
                  birthdays={birthdays}
                  fetchBirthdays={fetchBirthdays}                  
                  setCurrentMonth={setMonth}
                  onDayClick={handleDayClick}                  
                  currentMonth={month}
                />
              </div>
            </div>
          )}
      </section>
    </>
  );
};
