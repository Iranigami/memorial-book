import Header from "../comps/Header";
import bg from "../assets/images/bg.jpg";
import searchIcon from "../assets/images/icons/search-icon.svg";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header darkMode={true} />
      <div className="w-full h-full bg-linear-to-b from-[#323232] to-[#00000000] fixed top-0" />
      <img
        src={bg}
        alt="background"
        className="absolute fixed w-full opacity-[82%] top-0 left-0"
      />
      <div className="w-full h-full bg-[#09090985] fixed top-0 flex inline justify-center text-center items-center">
        <div className="text-white text-[40px] font-normal leading-[100%] tracking-[4.8px] mt-[455px] mx-auto">
          ПОИСК ПО БАЗЕ ГЕРОЕВ
        </div>
        <div className="mt-[65px] w-[872px] h-[80px] justify-center flex mx-auto relative items-center">
          <input
            id="search"
            placeholder="Кого вы ищите?"
            className="focus:outline-none w-full h-full px-[32px] italic font-normal text-[32px] leadind-[100%] tracking-[0px] border-b-[2px] border-[#C1A886]"
          />
          <img
            src={searchIcon}
            alt="search"
            className="absolute right-[12px] size-[48px]"
          />
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-[296px] w-[576px] h-[69px] border border-white flex justify-center items-center mx-auto font-normal uppercase leading-[100%] text-[18px] tracking-[4.8px]"
        >
          На главную
        </button>
      </div>
    </>
  );
}
