import Header from "../comps/Header";
import search from "../assets/images/icons/search-icon.svg";
import filter from "../assets/images/icons/filter-icon.svg";
import scroll from "../assets/images/icons/scroll-icon.svg";
import photo from "../assets/images/temp-person.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchResultPage() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  function changeScrollerPosition() {
    const winScroll = document.getElementById("scrollable")!.scrollLeft;
    const width =
      document.getElementById("scrollable")!.scrollWidth -
      document.documentElement.clientWidth;
    const scrolled = (winScroll / width) * 100;
    document.getElementById("horScroll")!.style.translate =
      scrolled * 7.5 + "px";
  }

  return (
    <>
      <Header />
      <div className="pl-[80px] h-[704px] top-[296px] fixed mask-[linear-gradient(to_right,_rgba(0,0,0,1),rgba(0,0,0,1)_90%,_rgba(0,0,0,0.5))] mask-size-[100%]">
        <div className="flex w-[1840px] h-[69px] gap-[16px]">
          <button
            onClick={() => navigate("/search")}
            className="w-[280px] h-full bg-red text-white font-normal uppercase tracking-[2.2px] leading-[100%] flex gap-[16px] justify-center items-center text-[18px]"
          >
            <img src={search} alt="search" className="size-[32px]" />
            Поиск героя
          </button>
          <button className="w-[280px] h-full text-light-brown border border-light-brown uppercase tracking-[2.2px] leading-[100%] flex gap-[16px] justify-center items-center  text-[18px]">
            <img src={filter} alt="filter" className="size-[32px]" />
            Фильтр
          </button>
          <div className="w-[1248px] h-full flex gap-[20px] items-center relative">
            <div className="min-w-[380px] h-full text-light-brown uppercase tracking-[4.8px] leading-[100%] flex gap-[16px] justify-center items-center text-[40px]">
              Стена памяти
            </div>
            <div className="w-full h-[1px] border-t-2 border-light-brown border-dashed">
              <img
                id="horScroll"
                src={scroll}
                alt="scroll"
                className={`absolute mt-[-33px]`}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[1840px] overflow-x-scroll hide-scroll grid grid-rows-2 grid-flow-col gap-[16px] mt-[40px]`}
          id="scrollable"
          onScroll={function () {
            changeScrollerPosition();
          }}
        >
          <div className="col-span-2 row-span-2 w-[428px] h-[571px] relative items-end flex p-[24px]">
            <img
              src={photo}
              alt="photo"
              className="w-full h-full absolute z-[-1] m-[-24px]"
            />
            <span className="w-full text-white leading-[100%] tracking-[0px] italic text-[28px] font-bold z-1">
              Михаил Петрович <br /> Зубенко
            </span>
          </div>
          {[
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2,
            3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
            6, 7, 8, 9,
          ].map((index: number) => (
            <div
              key={index}
              className="w-[208px] h-[277px] relative items-end flex p-[12px]"
            >
              <img
                src={photo}
                alt="photo"
                className="w-full h-full absolute z-[-1] m-[-12px]"
              />
              <span className="w-full text-white leading-[100%] tracking-[0px] italic text-[16px] font-bold z-1">
                Михаил Петрович <br /> Зубенко
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
