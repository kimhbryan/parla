import { useState } from "react";

const ChatLog = () => {
    const [logs, setLogs] = useState(["HI", "BYE", "HI", "BYE", "HI", "HI", "BYE", "HI", "BYE", "HI", "HI", "BYE", "HI", "BYE", "HI"])
    return (
        <div className="overflow-y-scroll h-full absolute bottom-[5rem] w-full">
            {
                logs.map((log, i) => {
                    return (
                        <div className={`${i % 2 === 0 ? "bg-[#D9D9D9]" : "bg:[#424242]"} w-full py-20 px-5`}>
                            {log.split(':')[1]}
                        </div>
                    );
                })
            }
            
        </div>
    );
}

export default ChatLog;