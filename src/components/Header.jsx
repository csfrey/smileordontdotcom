import { Textfit } from "@ataverascrespo/react18-ts-textfit";

const Header = () => (
  <header className="font-peckham flex justify-center sticky top-0 bg-[#fcd612] z-10 pb-4">
    <div className="w-[150px] m-0 cursor-pointer">
      <Textfit mode="single" style={{ textAlign: "center" }}>
        SMILE
      </Textfit>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center grow mx-2">
          <div className="border" />
        </div>
        <div className="leading-1 text-2xl">OR</div>
        <div className="flex flex-col justify-center grow mx-2">
          <div className="border" />
        </div>
      </div>
      <Textfit mode="single" style={{ textAlign: "center" }}>
        DONT
      </Textfit>
      <Textfit mode="single" style={{ lineHeight: ".25rem" }}>
        PHOTOGRAPHY
      </Textfit>
    </div>
  </header>
);

export default Header;
