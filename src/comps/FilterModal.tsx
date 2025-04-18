import { useRef, useState } from "react";
import close from "../assets/images/icons/x-icon.svg";
import DoubleSlider from "./DoubleSlider";
import check from "../assets/images/icons/check-icon.svg";

type Props = {
  onClose: () => void;
  opened: boolean;
};

export default function FilterModal({ onClose, opened }: Props) {
  const [selectedRank, setRank] = useState<string>();
  const [selectedWord, setWord] = useState<string>();
  const startYear = useRef(0);
  const endYear = useRef(1946);

  const tempFilter = {
    yearStart: 0,
    yearEnd: 1946,
    rank: ["Батальонный Комиссар", "Ветврач", "Военврач"],
    word: [
      "А",
      "Б",
      "В",
      "Г",
      "Д",
      "Е",
      "Ж",
      "З",
      "И",
      "К",
      "Л",
      "М",
      "Н",
      "О",
      "П",
      "Р",
      "С",
      "Т",
      "У",
      "Ф",
      "Х",
      "Ц",
      "Ч",
      "Ш",
      "Щ",
      "Э",
      "Ю",
      "Я",
    ],
  };

  return (
    <div
      className={`ml-[-510px] ${opened && "translate-x-[510px]"} transition duration-300 w-[508px] h-[1080px] gap-[44px] bg-[url(src/assets/images/bg-modal.png)] fixed top-0 left-0 z-[1000] justify-center flex inline overflow-y-auto hide-scroll pl-[80px]`}
    >
      <div className="w-[388px] h-[64px] flex items-top justify-between gap-[121px] mt-[40px] border-b border-light-brown">
        <span className="font-normal text-[40px] leading-[100%] tracking-[4.8px] text-center uppercase text-brown">
          Фильтры
        </span>
        <img
          src={close}
          alt="close"
          className="size-[48px]"
          onClick={onClose}
        />
      </div>
      <div className="w-[388px] h-[153px] flex inline">
        <div className="font-normal text-[24px] leading-[100%] tracking-[2.9px] text-left uppercase text-brown mt-[44px] h-[28px]">
          Дата рождения
        </div>
        <div className="w-[399px] h-[32px] bg-red mt-[20px]" />
        {/* Заменить на норм слайдер */}
        <div className="mt-[20px] flex block w-full h-[53px] gap-[20px]">
          <input className="w-[184px] h-full border border-light-brown focus:outline-none p-[16px] font-normal text-[18px] leading-[100%] tracking-[2.16px] uppercase text-brown" />
          <input className="w-[184px] h-full border border-light-brown focus:outline-none p-[16px] font-normal text-[18px] leading-[100%] tracking-[2.16px] uppercase text-brown" />
        </div>
        <div className="mt-[44px] w-[388px]">
          <div className="font-normal text-[24px] leading-[100%] tracking-[2.9px] text-left uppercase text-brown mt-[44px] h-[28px]">
            Звание
          </div>
          {tempFilter.rank.map((data: string, index: number) => (
            <div
              key={index}
              onClick={() => {selectedRank===data ? setRank(undefined) : setRank(data)}}
              className="font-normal flex text-[18px] leading-[100%] tracking-[2.16px] items-center gap-[16px] text-left uppercase text-brown mt-[44px] h-[28px]"
            >
              {selectedRank===data ? (
                <div 
                  className="size-[24px] bg-red flex justify-center items-center">
                  <img src={check} alt="selected" className="size-[16px]" />
                </div>
              ) : (
                <div
                  className="size-[24px] border border-light-brown"
                />
              )}
              {data}
            </div>
          ))}
        </div>
      </div>
      <div className="flex inline w-[388px] h-[220px] absolute left-[80px] bottom-0 justify-center">
          <button className="w-full h-[69px] bg-red ml-">       {/*крч надо верхнуюю часть обернуть в див, а эту отдельно, там скролл будет именно у верхней части*/}

          </button>
      </div>
    </div>
  );
}
