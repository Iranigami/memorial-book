import Header from "../comps/Header";
import photo from "../assets/images/temp-person.png";
import medal from "../assets/images/icons/medal.svg";
import bg from "../assets/images/bg.jpg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Person } from "../conf";

export default function PersonPage() {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://book-memory-sections-out.itlabs.top/api/members/${personId}`;
    axios.get(apiUrl).then((r) => {
      setPerson(r.data);
      setLoading(false);
    });
  }, [personId]);

  return (
    <>
      <Header />
      <img
        src={bg}
        alt="background"
        className="absolute fixed z-[-1] w-full opacity-[40%] top-0 left-0"
      />
      {isLoading && (
        <div className="w-[50px] h-[50px] outline outline-dotted outline-light-brown outline-[10px] rounded-full animate-spin absolute left-0 right-0 mx-auto mt-[180px]" />
      )}
      <div
        hidden={isLoading}
        className="ml-[80px] h-[704px] top-[296px] fixed border-t-2 border-[#8B8785] w-[1760px] justify-between flex pt-[44px]"
      >
        <div className="flex inline mt-[]">
          <div className="font-bold text-[48px] leading-[100%] tracking-[0px] text-brown">
            {person!.name || "Нет информации"}
          </div>
          <div className="mt-[40px] flex block gap-[72px]">
            <div className="flex inline">
              <div className="text-[32px] font-bold italic leading-[100%] tracking-[0px] text-dark-red">
                Год рождения
              </div>
              <div className="text-[24px] font-normal leading-[100%] tracking-[0px] text-brown mt-[8px]">
                {person!.yearStartAt || "Нет информации"}
              </div>
            </div>
            <div className="flex inline">
              <div className="text-[32px] font-bold italic leading-[100%] tracking-[0px] text-dark-red">
                Место рождения
              </div>
              <div className="text-[24px] font-normal leading-[100%] tracking-[0px] text-brown mt-[8px]">
                {person!.city || "Нет информации"}
              </div>
            </div>
          </div>
          <div className="mt-[20px] flex block gap-[72px]">
            <div className="flex inline">
              <div className="text-[32px] font-bold italic leading-[100%] tracking-[0px] text-dark-red">
                Звание
              </div>
              <div className="text-[24px] font-normal leading-[100%] tracking-[0px] text-brown mt-[8px]">
                {person!.ranks || "Нет информации"}
              </div>
            </div>
            <div className="flex inline">
              <div className="text-[32px] font-bold italic leading-[100%] tracking-[0px] text-dark-red">
                Призван в армию
              </div>
              <div className="text-[24px] font-normal leading-[100%] tracking-[0px] text-brown mt-[8px]">
                {person!.calledUponDate || "Нет информации"}
              </div>
            </div>
            <div className="flex inline">
              <div className="text-[32px] font-bold italic leading-[100%] tracking-[0px] text-dark-red">
                Как погиб
              </div>
              <div className="text-[24px] font-normal leading-[100%] tracking-[0px] text-brown mt-[8px]">
                {person!.howDie || "Нет информации"}
              </div>
            </div>
          </div>
          <div className="mt-[20px] flex block gap-[72px]">
            <div className="flex inline">
              <div className="text-[32px] font-bold italic leading-[100%] tracking-[0px] text-dark-red">
                Место гибели (захоронение)
              </div>
              <div className="text-[24px] font-normal leading-[100%] tracking-[0px] text-brown mt-[8px]">
                {person!.placeDeath || "Нет информации"}
              </div>
            </div>
            <div className="flex inline">
              <div className="text-[32px] font-bold italic leading-[100%] tracking-[0px] text-dark-red">
                Дата гибели
              </div>
              <div className="text-[24px] font-normal leading-[100%] tracking-[0px] text-brown mt-[8px]">
                {(person!.monthDeath || " ") +
                  " " +
                  (person!.yearEndAt || "Нет информации")}
              </div>
            </div>
          </div>
          <div className="flex block mt-[111px] gap-[16px]">
            <button
              onClick={() => navigate("/")}
              className="w-[426px] h-[69px] border border-brown flex justify-center items-center mx-auto font-normal uppercase leading-[100%] text-[18px] tracking-[4.8px] text-brown"
            >
              На главную
            </button>
            <button
              onClick={() => navigate(`/person/${Number(personId) + 1}`)}
              className="w-[426px] h-[69px] bg-red flex justify-center items-center mx-auto font-normal uppercase leading-[100%] text-[18px] tracking-[4.8px] text-white flex gap-[5.5px]"
            >
              <img src={medal} alt="img" className="size-[32px]" />
              Следующий герой
            </button>
          </div>
          <div className="font-normal text-[18px] text-brown leading-[100%] tracking-[0px] mt-[16px]">
            Для стены памяти информация получена от родных, близких и друзей
            героев
          </div>
        </div>
        <img src={photo} alt="photo" className="w-[428px] h-[571px]" />
      </div>
    </>
  );
}
