import Header from "../comps/Header";
import bg from "../assets/images/bg.jpg";
import searchIcon from "../assets/images/icons/search-icon.svg";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import Keyboard from "../comps/Keyboard";

export default function SearchPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const inputField = document.getElementById("search")!;
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currAnswer = event.target.value;
    setText(currAnswer);
  };

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
        <div
          className={`text-white text-[40px] font-normal leading-[100%] tracking-[4.8px] ${isKeyboardOpen ? "mt-[332px]" : "mt-[445px]"} mx-auto`}
        >
          ПОИСК ПО БАЗЕ ГЕРОЕВ
        </div>
        <div className="mt-[65px] w-[872px] h-[80px] justify-center flex mx-auto relative items-center">
          <input
            onFocus={() => {
              setKeyboardOpen(true);
            }}
            onChange={handleChange}
            value={text}
            autoComplete="off"
            id="search"
            placeholder="Кого вы ищите?"
            className="focus:outline-none w-full h-full px-[32px] italic font-normal text-[32px] leadind-[100%] tracking-[0px] border-b-[2px] border-[#C1A886]"
          />
          <button
            className="absolute right-[12px] size-[48px]"
            onClick={() => {
              navigate(
                `/result?name=${(inputField as HTMLInputElement).value}`,
              );
            }}
          >
            <img className="size-[48px]" src={searchIcon} alt="search" />
          </button>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-[296px] w-[576px] h-[69px] border border-white flex justify-center items-center mx-auto font-normal uppercase leading-[100%] text-[18px] tracking-[4.8px]"
        >
          На главную
        </button>
      </div>
      <Keyboard
        page="search"
        opened={isKeyboardOpen}
        onClose={() => setKeyboardOpen(false)}
        enterButton={(button: string) => {
          (inputField as HTMLInputElement).value += button;
        }}
        onBackspace={() =>
          ((inputField as HTMLInputElement).value = (
            inputField as HTMLInputElement
          ).value.substring(
            0,
            (inputField as HTMLInputElement).value.length - 1,
          ))
        }
        onEnter={() => {
          navigate(`/result?name=${(inputField as HTMLInputElement).value}`);
        }}
      />
    </>
  );
}
