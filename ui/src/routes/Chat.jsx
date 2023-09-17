import { useState } from "react";
import { useParams } from "react-router";
import ChatHeader from "../components/ChatHeader";
import ChatLog from "../components/ChatLog";
import InputBar from "../components/InputBar";

const Chat = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { topic, lang } = useParams();
    return(
        <>
            <ChatHeader topic={topic}/>
            {
                logs.length === 0 ?
                <div className="w-full h-full flex justify-center content-center">
                    <h2>Hmm... It's a bit empty here</h2>
                </div> :
                <ChatLog logs={logs} setLogs={setLogs}/>
            }
            {/* <ChatLog logs={logs} setLogs={setLogs}/> */}
            <InputBar logs={logs} setLogs={setLogs} topic={topic} lang={lang} loading={loading} setLoading={setLoading}/>
        </> 
    );
}

export default Chat;