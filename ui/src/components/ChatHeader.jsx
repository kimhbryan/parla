import {ReactComponent as Logo} from "../images/logo.svg";
import { Link } from "react-router-dom";


const ChatHeader = () => {
    return(
        <div className="fixed top-0 flex flex-row w-full justify-between bg-white px-3 pt-8 pb-2">
            <Link to="/">
                <span className="inline-flex align-middle">
                    <Logo className="w-12 h-12"/>
                    <h1 className="font-semibold text-[1.5rem] text-[#474747] self-center ml-4">App Name</h1>
                </span>
            </Link>
            <p className="text-sm font-semibold text-[#474747] self-center mt-3">Topic</p>
        </div>
    );
}

export default ChatHeader;