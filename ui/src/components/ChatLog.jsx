import { useState } from "react";
import { ReactComponent as BotLogo} from "../images/botLogo.svg";
import { ReactComponent as UserLogo} from "../images/userLogo.svg";


const ChatLog = () => {
    const [logs, setLogs] = useState(["USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye",])
    return (
        <div className="overflow-y-scroll h-full absolute bottom-[5rem] w-full">
            {
                logs.map((log, i) => {
                    let [role, message] = log.split(':')
                    return (
                        <div className={`${i % 2 === 0 ? "bg-[#D9D9D9]" : "bg:[#424242]"} w-full py-20 px-5 align-middle`}>
                            <div className="absolute left-20">
                                {
                                role === "AI" ? 
                                <BotLogo className="w-10 h-10"/> :
                                <UserLogo className="w-10 h-10"/>
                                }
                            </div>
                            <div className="mx-0 my-auto flex flex-row justify-center">
                                <p className="text-sm">{message}</p>
                            </div>
                        </div>
                    );
                })
            }
            
        </div>
    );
}

export default ChatLog;