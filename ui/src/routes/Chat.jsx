import { useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatLog from "../components/ChatLog";
import InputBar from "../components/InputBar";

const Chat = () => {
    const [logs, setLogs] = useState(["USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye",])
    return(
        <>
            <ChatHeader />
            <ChatLog logs={logs} setLogs={setLogs} />
            <InputBar logs={logs} setLogs={setLogs} />
        </> 
    );
}

export default Chat;