import "../App.css";
import { ReactComponent as Parla } from "../images/Parla.svg";
import { ReactComponent as Logo } from "../images/logo_lang.svg";
import { ReactComponent as LandingBlobs } from "../images/landingBlobs.svg";

const Language = () => {
  return (
    <>
      {/*<LandingBlobs className="fixed w-full h-full"/>*/}
      {/* <Parla /> */}
      <Logo />
      {/* <h1 className="font-semibold text-5xl">Welcome</h1> */}
      <p className="text-[1.25rem] mt-2">Select a Language</p>
      <div className="grid grid-cols-3 col-auto gap-2 mt-5 justify-center">
        <a className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer">
          English
        </a>
        <a className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer">
          Français
        </a>
        <a className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer">
          Deutsch
        </a>
      </div>
      <div className="grid grid-cols-2 col-auto gap-2 mt-5 justify-center">
        <a className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer">
          Español
        </a>
        <a className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer">
          Italiano
        </a>
      </div>
    </>
  );
};

export default Language;
