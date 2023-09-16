import '../App.css';
import {ReactComponent as Logo} from "../images/logo.svg";
import {ReactComponent as LandingBlobs} from "../images/landingBlobs.svg";


const Home = () => {
  return (
    <>
        {/*<LandingBlobs className="fixed w-full h-full"/>*/}
        <Logo />
        <h1 className="font-semibold text-5xl">Welcome</h1>
        <p className="text-[1.25rem] mt-2">What Topic Are You Interested In Today?</p>
        <div className="grid grid-cols-2 gap-2 mt-5">
            <a className="bg-[#E2E2E2] text-sm px-8 py-4 text-[#424242] rounded-md font-semibold cursor-pointer">Hobbies and Sports</a>
            <a className="bg-[#E2E2E2] text-sm px-8 py-4 text-[#424242] rounded-md font-semibold  cursor-pointer">Food and Cuisine</a>
            <a className="bg-[#E2E2E2] text-sm px-8 py-4 text-[#424242] rounded-md font-semibold  cursor-pointer">Travel and Geography</a>
            <a className="bg-[#E2E2E2] text-sm px-8 py-4 text-[#424242] rounded-md font-semibold  cursor-pointer">Current Events and News</a>
        </div>
    </>
  );
}

export default Home;
