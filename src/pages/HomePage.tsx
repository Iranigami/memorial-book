import Header from "../comps/Header";
import search from "../assets/images/icons/search-icon.svg";
import filter from "../assets/images/icons/filter-icon.svg";
import scroll from "../assets/images/icons/scroll-icon.svg";
import photo from "../assets/images/temp-person.png";
import bg from "../assets/images/bg.jpg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "../comps/FilterModal";
import axios from "axios";
import { Person, Persons } from "../conf";

export default function HomePage() {
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null)
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPersons, setAllPersons] = useState<Persons>([]);
  const [isLastPageLoaded, setLastPageLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);

    const lastItemRef = useCallback((node: any) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect() 
  
      observer.current = new IntersectionObserver(entries => { 
        if (entries[0].isIntersecting && !isLastPageLoaded) {
          setCurrentPage(currentPage+1)
        }
      })
  
      if (node) observer.current.observe(node) 
    }, [isLoading])
  
  
  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://book-memory-sections-out.itlabs.top/api/members`;
    axios.get(apiUrl, {
      params: {
        itemsPerPage: 50,
        page: currentPage,
      }
    })    .then(response => {
      (response.data[0] === undefined) && setLastPageLoaded(true)
      setAllPersons(prevState => [
        ...prevState,
        ...response.data
      ]);
      setLoading(false);    })
  }, [currentPage]);


  function changeScrollerPosition() {
    const winScroll = document.getElementById("scrollable")!.scrollLeft;
    const width =
      document.getElementById("scrollable")!.scrollWidth;
    const scrolled = (winScroll / width) * 10000;
    document.getElementById("horScroll")!.style.translate =
      scrolled + "px";
  }

  return (
    <>
      <Header />
      <img
        src={bg}
        alt="background"
        className="absolute fixed z-[-1] w-full opacity-[40%] top-0 left-0"
      />
      <div className="pl-[80px] h-[704px] top-[296px] fixed mask-[linear-gradient(to_right,_rgba(0,0,0,1),rgba(0,0,0,1)_90%,_rgba(0,0,0,0.5))] mask-size-[100%]">
        <div className="flex w-[1840px] h-[69px] gap-[16px]">
          <button
            onClick={() => navigate("/search")}
            className="w-[280px] h-full bg-red text-white font-normal uppercase tracking-[2.2px] leading-[100%] flex gap-[16px] justify-center items-center text-[18px]"
          >
            <img src={search} alt="search" className="size-[32px]" />
            Поиск героя
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="w-[280px] h-full text-light-brown border border-light-brown uppercase tracking-[2.2px] leading-[100%] flex gap-[16px] justify-center items-center  text-[18px]"
          >
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
        {(isLoading && currentPage===1) && (
          <div className="w-[50px] h-[50px] outline outline-dotted outline-light-brown outline-[10px] rounded-full animate-spin absolute left-0 right-0 mx-auto mt-[180px]"/>
        )}
        <div
          hidden = {(isLoading&&currentPage===1)}
          className={`w-[1840px] overflow-x-scroll hide-scroll grid grid-rows-2 grid-flow-col gap-[16px] mt-[40px]`}
          id="scrollable"
          onScroll={function () {
            changeScrollerPosition();
          }}
        >
          {allPersons!.map((person: Person, index: number) => (
            <div
              onClick = {() => navigate(`/person/${person.id}`)}
              key={index}
              className={`relative items-end flex ${index === 0 ? "col-span-2 row-span-2 w-[428px] h-[571px] p-[24px]" : "w-[208px] h-[277px] p-[12px]"}`}
            >
              <img
                src={photo}
                alt="photo"
                className={`w-full h-full absolute z-[-1] ${index === 0 ? "m-[-24px]" : "m-[-12px]"}`}
              />
              <span className={`w-full text-white leading-[100%] tracking-[0px] italic font-bold z-1 ${index === 0 ? "text-[28px]" : "text-[16px]"}`}>
                {person.name}
              </span>
            </div>
          ))}
            <div 
              hidden = {isLastPageLoaded}
              ref={lastItemRef}
              className="w-[30px] h-[30px] outline outline-dotted outline-light-brown outline-[10px] rounded-full animate-spin mx-auto mt-[100px]"/>
        </div>
      </div>
      <FilterModal opened={isModalOpen} onClose={() => setModalOpen(false)} />
      {isModalOpen && (
        <div className="w-full h-full fixed bg-black opacity-[60%] top-0 left-0" />
      )}
    </>
  );
}
