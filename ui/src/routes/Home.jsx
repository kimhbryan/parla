import '../App.css';
import {ReactComponent as Logo} from "../images/logo.svg";
import {ReactComponent as LandingBlobs} from "../images/landingBlobs.svg";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


const Home = () => {
  const {lang} = useParams();
  return (
    <>
        {/*<LandingBlobs className="fixed w-full h-full"/>*/}
        <Logo />
        <h1 className="font-semibold text-5xl">Ready to Learn?</h1>
        <p className="text-[1.25rem] mt-2">Pick a topic of interest</p>
        <div className="grid grid-cols-2 gap-2 mt-5">
            <Link className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer" to={`/chat/${lang}/sports`}>Hobbies and Sports</Link>
            <Link className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer" to={`/chat/${lang}/food`}>Food and Cuisine</Link>
            <Link className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer" to={`/chat/${lang}/geography-and-travel`}>Travel and Geography</Link>
            <Link className="bg-[#424242] text-sm px-20 py-4 text-[#E2E2E2] border-solid border-2 rounded-full font-semibold cursor-pointer" to={`/chat/${lang}/news`}>Current Events and News</Link>
        </div>
    </>
  );
}

export default Home;
