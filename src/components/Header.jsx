import { Textfit } from "@ataverascrespo/react18-ts-textfit";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="font-peckham flex justify-center sticky top-0 bg-[#fcd612] z-10 pb-4">
    <Link to="/" className="w-[150px] m-0 cursor-pointer">
      {/* <Textfit mode="single" max={40} style={{ textAlign: "center" }}>
        SMILE
      </Textfit> */}
      <div className="text-center text-[35px]">SMILE</div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center grow mr-2">
          <div className="border" />
        </div>
        <div className="leading-1 text-2xl">OR</div>
        <div className="flex flex-col justify-center grow ml-2">
          <div className="border" />
        </div>
      </div>
      {/* <Textfit mode="single" style={{ textAlign: "center" }}>
        DONT
      </Textfit> */}
      <div className="text-center text-[38px]">DONT</div>
      {/* <Textfit mode="single" style={{ lineHeight: ".25rem" }}>
        PHOTOGRAPHY
      </Textfit> */}
      <div className="text-center text-[14px]">PHOTOGRAPHY</div>
    </Link>
  </header>
);

export default Header;
