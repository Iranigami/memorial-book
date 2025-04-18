import victory from "../assets/images/victory80.png";

type Props = {
  darkMode?: boolean;
};

export default function Header({ darkMode }: Props) {
  return (
    <div
      className={`h-[164px] flex fixed top-[80px] left-[80px] justify-left items-center gap-[48px] mb-[44px] ${darkMode && "z-1"}`}
    >
      <img src={victory} alt="victory80" className="h-full" />
      <div className="leading-[100%] tracking-[0px] font-bold text-[64px]">
        <div className={darkMode ? "text-white" : "text-brown"}>
          Музей Боевой и Трудовой Славы
        </div>
        <div className={darkMode ? "text-light-gray" : "text-light-brown"}>
          город Александров
        </div>
      </div>
    </div>
  );
}
