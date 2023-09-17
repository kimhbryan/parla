import { useState } from "react";
import { useParams } from "react-router";
import ChatHeader from "../components/ChatHeader";
import ChatLog from "../components/ChatLog";
import InputBar from "../components/InputBar";

const Chat = () => {
    const [logs, setLogs] = useState(["USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye", "USER: hi", "AI: bye",])
    const { topic, lang } = useParams();
    return(
        <>
            <ChatHeader topic={topic}/>
            <ChatLog logs={logs} setLogs={setLogs}/>
            <InputBar logs={logs} setLogs={setLogs} topic={topic} lang={lang}/>
        </> 
    );
}

export default Chat;