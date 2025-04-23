import { useState } from "react";
import Key from "./Key";
import next from "../assets/images/icons/next.svg";
import close from "../assets/images/icons/close-icon.svg";

type Props = {
  opened: boolean;
  enterButton: (letter: string) => void;
  onClose: () => void;
  page: string;
  onBackspace: () => void;
  onEnter: () => void;
};

export default function Keyboard({
  opened,
  enterButton,
  onClose,
  page,
  onBackspace,
  onEnter,
}: Props) {
  const [language, setLanguage] = useState("RUS");
  const [uppercase, setUppercase] = useState(false);
  const [isNumbersShown, setNumbersShown] = useState(false);
  return (
    <div
      className={`transition ${opened && "translate-y-[-600px]"} duration-700 ${page === "filter" ? "ml-[722px] mt-[400px]" : "mx-[500px] mt-[664px]"} fixed absolute left-0 right-0 z-10 font-montserrat font-medium text-[18px]`}
    >
      <div
        className={`w-[920px] h-[320px] rounded-[17px] bg-[#FAFAFA] font-manrope text-[#373737] justify-center items-center text-center px-[30.12px] pt-[24px]`}
      >
        <div className="flex h-[32px] w-full justify-between">
          <div
            hidden={page !== "filter"}
            className="w-[218px] h-full gap-[8px] flex justify-center items-center"
          >
            <img src={next} alt="back" className="-scale-x-100" />
            Предыдущее поле
          </div>
          <div
            hidden={page !== "filter"}
            className="w-[218px] h-full gap-[8px] flex justify-center items-center"
          >
            Следующее поле
            <img src={next} alt="previous" className="" />
          </div>
        </div>
        <div className="flex gap-[8px] justify-center items-center text-center mt-[24px]">
          {language === "RUS" &&
            !isNumbersShown &&
            ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    setUppercase(false);
                  }}
                />
              ),
            )}
          {language === "ENG" &&
            !isNumbersShown &&
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    setUppercase(false);
                  }}
                />
              ),
            )}
          {isNumbersShown &&
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(text);
                    setUppercase(false);
                  }}
                />
              ),
            )}
        </div>
        <div className="flex gap-[10px] justify-center items-center text-center mt-[8px]">
          {language === "RUS" &&
            !isNumbersShown &&
            ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    setUppercase(false);
                  }}
                />
              ),
            )}
          {language === "ENG" &&
            !isNumbersShown &&
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    setUppercase(false);
                  }}
                />
              ),
            )}
          {isNumbersShown &&
            ["-", "/", ":", ";", "(", ")", "$", "&", "@", '"'].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(text);
                    setUppercase(false);
                  }}
                />
              ),
            )}
        </div>
        <div className="flex gap-[10px] justify-center items-center text-center mt-[8px]">
          <Key
            text=""
            type="shift"
            className="bg-keyboard-gray w-[104px]"
            clickHandler={() => setUppercase(!uppercase)}
          />
          {language === "RUS" &&
            !isNumbersShown &&
            ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "ё"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    setUppercase(false);
                  }}
                />
              ),
            )}
          {language === "ENG" &&
            !isNumbersShown &&
            ["z", "x", "c", "v", "b", "n", "m"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    setUppercase(false);
                  }}
                />
              ),
            )}
          {isNumbersShown &&
            [".", ",", "?", "!", "'"].map((text: string, index: number) => (
              <Key
                key={index}
                text={text}
                type="symbol"
                className="w-[65px]"
                clickHandler={() => {
                  enterButton(text);
                  setUppercase(false);
                }}
              />
            ))}
          <Key
            text={""}
            type="backspace"
            className="w-[103px] bg-keyboard-gray"
            clickHandler={() => {
              onBackspace();
            }}
          />
        </div>
        <div className="flex gap-[10px] justify-center items-center text-center mt-[12.44px]">
          <Key
            text={"&123"}
            type="nums"
            className="w-[110px] bg-keyboard-gray"
            clickHandler={() => setNumbersShown(!isNumbersShown)}
          />
          <Key
            text=""
            type="lang"
            className="w-[110px] bg-keyboard-gray"
            clickHandler={() => {
              setLanguage(`${language === "RUS" ? "ENG" : "RUS"}`);
            }}
          />
          <Key
            text={"Пробел"}
            type="symbol"
            className="w-[552px]"
            clickHandler={() => {
              enterButton(" ");
              setUppercase(false);
            }}
          />
          <Key
            text={"Ввод"}
            type="enter"
            className="bg-red text-white w-[152px]"
            clickHandler={onEnter}
          />
        </div>
      </div>
      <div
        onClick={onClose}
        className="mt-[20px] w-[88px] h-[56px] rounded-[24px] bg-white ml-[416px] flex justify-center items-center"
      >
        <img src={close} alt="close" className="mx-auto" />
      </div>
    </div>
  );
}
