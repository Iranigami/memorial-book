import backspace from "../assets/images/icons/backspace-icon.svg";
import globe from "../assets/images/icons/globe.svg";
import shift from "../assets/images/icons/shift-icon.svg";

type Props = {
  type: string;
  text: string;
  className?: string;
  clickHandler?: () => void;
};

export default function Key({ type, text, className, clickHandler }: Props) {
  return (
    <button
      className={`h-[48px] flex justify-center items-center text-center rounded-[8px] ${type === "symbol" && "bg-white"} ${className} active:bg-[#E1E3E3] key-shadow font-montserrat`}
      onClick={clickHandler}
    >
      {text}
      {type === "backspace" && <img src={backspace} alt="backspace" />}
      {type === "lang" && <img src={globe} alt="lang" />}
      {type === "shift" && <img src={shift} alt="shift" />}
    </button>
  );
}
