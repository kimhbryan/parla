import { useRef, useState, useEffect } from "react";
import { ReactComponent as BotLogo} from "../images/botLogo.svg";
import { ReactComponent as UserLogo} from "../images/userLogo.svg";


const ChatLog = ({logs, setLogs}) => {
    const containerRef = useRef(null);
    useEffect(() => {
        if(containerRef.current) {
            const container = containerRef.current;
            container.scrollTo(0, container.scrollHeight);
        }
      }, [containerRef.current]);

    return (
        <div ref={containerRef} className="overflow-y-scroll h-full absolute bottom-[5rem] w-full">
            {
                logs.map((log, i) => {
                    let [role, message] = log.split(':');
                    return (
                        <div className={`${i % 2 === 0 ? "bg-[#D9D9D9]" : "bg:[#424242]"} w-full py-20 px-5 flex justify-center`}>
                            <div className="absolute left-[25%]">
                                {
                                role === "AI" ? 
                                <BotLogo className="w-10 h-10"/> :
                                <UserLogo className="w-10 h-10"/>
                                }
                            </div>
                            <div className="mx-0 my-auto flex flex-row justify-left text-left w-[40%]">
                                <p className={`text-sm ${i % 2 === 0 ? "text-[#424242]" : "text-[#D9D9D9]"}`}>{message}</p>
                            </div>
                        </div>
                    );
                })
            }
            
        </div>
    );
}

export default ChatLog;