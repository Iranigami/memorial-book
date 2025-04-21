import { useEffect, useRef, useState } from "react";
import close from "../assets/images/icons/x-icon.svg";
import check from "../assets/images/icons/check-icon.svg";
import axios from "axios";
import { Filters } from "../conf";
import { useNavigate } from "react-router-dom";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
type Props = {
  onClose: () => void;
  opened: boolean;
};

export default function FilterModal({ onClose, opened }: Props) {
  const [selectedRank, setRank] = useState<string>();
  const [selectedWord, setWord] = useState<string>();
  const startYear = useRef(0);
  const endYear = useRef(1999);
  const [filter, setFilter] = useState<Filters>({});
  const [isLoading, setLoading] = useState(true);
  const [isRanksOpenedFull, setRanksOpenedFull] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const apiUrl = 'https://book-memory-sections-out.itlabs.top/api/members/filters/get';
    axios.get(apiUrl).then((r) => {
      setFilter(r.data);
      setLoading(false);
    });
  }, []);
  
  var slider = document.getElementById('slider');
  //@ts-ignore
  if (slider && slider.noUiSlider) {
  //@ts-ignore
    slider.noUiSlider.destroy();
}
  if (slider !== null) {
    noUiSlider.create(slider, {
        start: [0, 1950],
        connect: true,
        range: {
            min: Number(filter.yearStart) || 0,
            max: Number(filter.yearEnd) || 1999
        }
    });
}

  return (
    <div
      className={`ml-[-510px] ${opened && "translate-x-[510px]"} transition duration-300 w-[508px] h-[1080px] gap-[44px] bg-[url(src/assets/images/bg-modal.png)] fixed top-0 left-0 z-[1000] justify-center flex inline pl-[80px]`}
    >
      <div className="overflow-y-auto hide-scroll h-[860px]">
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
        <div id="slider"></div>
        <div className="mt-[20px] flex block w-full h-[53px] gap-[20px]">
          <input value={filter.yearStart} className="w-[184px] h-full border border-light-brown focus:outline-none p-[16px] font-normal text-[18px] leading-[100%] tracking-[2.16px] uppercase text-brown" />
          <input value={filter.yearEnd} className="w-[184px] h-full border border-light-brown focus:outline-none p-[16px] font-normal text-[18px] leading-[100%] tracking-[2.16px] uppercase text-brown" />
        </div>
      </div>
      <div className="mt-[44px] w-[388px]">
        <div className="font-normal text-[24px] leading-[100%] tracking-[2.9px] text-left uppercase text-brown mt-[44px] h-[28px]">
          Звание
        </div>
        {!isLoading && filter.rank!.slice(0, isRanksOpenedFull ? undefined : 3).map((data: string, index: number) => (
          <div
            key={index}
            onClick={() => {selectedRank===data ? setRank(undefined) : setRank(data)}}
            className="font-normal flex text-[18px] leading-[100%] tracking-[2.16px] items-center gap-[16px] text-left uppercase text-brown mt-[16px] h-[28px]"
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
        <div onClick={() => setRanksOpenedFull(!isRanksOpenedFull)} className="text-[18px] font-bold text-red leading-[100%] tracking-[2.16px] mt-[20px]">
          {isRanksOpenedFull ? "Скрыть" : "Посмотреть все"}
        </div>
      </div>
      <div className="mt-[44px] w-[388px] mb-[44px]">
        <div className="font-normal text-[24px] leading-[100%] tracking-[2.9px] text-left uppercase text-brown mt-[44px] h-[28px]">
          По буквам
        </div>
        <div className="grid grid-cols-7 gap-[16px] mt-[20px]">
        {!isLoading && filter.word!.map((data: string, index: number) => (
          <div
            key={index}
            onClick={() => {selectedWord===data ? setWord(undefined) : setWord(data)}}
            className={`${selectedWord===data ? "bg-red flex text-white" : "border border-light-brown text-light-brown"} font-normal justify-center items-center flex text-[18px] leading-[100%] tracking-[2.16px] items-center gap-[16px] text-left uppercase text-brown size-[40px]`}
          >
            {data}
          </div>
        ))}
        </div>
      </div>

      </div>
      <div className="flex inline w-[388px] h-[220px] absolute left-[80px] bottom-[-20px] justify-center">
          <button 
            onClick={()=>{
            navigate(`/result?yearStart=${startYear.current}&yearEnd=${endYear.current}&ranks=${selectedRank}&word=${selectedWord}`)
            }}
            className="w-full h-[69px] bg-red font-normal flex text-[18px] leading-[100%] tracking-[2.16px] items-center text-center uppercase text-white justify-center flex">     
            Применить
          </button>
          <button 
            onClick={()=>{
              setRank(undefined);
              setWord(undefined);
              startYear.current=0;
              endYear.current=1946;
            }}
            className="w-full mt-[20px] h-[69px] border border-light-brown font-normal flex text-[18px] leading-[100%] tracking-[2.16px] items-center text-center uppercase text-brown justify-center flex">  
            Очистить
          </button>
      </div>
    </div>
  );
}
