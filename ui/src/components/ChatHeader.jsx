import {ReactComponent as Logo} from "../images/logo.svg";
import { Link } from "react-router-dom";


const ChatHeader = ({topic, darkMode}) => {
    return(
        <div className={`fixed top-0 flex flex-row w-full justify-between ${darkMode?"bg-[#424242]":"bg-white"} border-b-2 border-[#474747] px-3 pt-10 pb-3.5 z-10`}>
            <Link to="/">
                <span className="inline-flex align-middle">
                    <Logo className="w-12 h-12"/>
                    <h1 className={`font-semibold text-[1.5rem] ${darkMode?"text-white":"text-[#474747]"} self-center ml-4 italic`}>Parla</h1>
                </span>
            </Link>
            <p className={`text-sm font-semibold ${darkMode?"text-white":"text-[#474747]"} self-center mt-3`}>{topic}</p>
        </div>
    );
}

export default ChatHeader;