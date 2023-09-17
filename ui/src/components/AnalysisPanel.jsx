import ChatRecord from "./ChatRecord";
import ComfortRecord from "./ComfortRecord";
import ErrorRecord from "./ErrorRecord";

const AnalysisPanel = ({userMessage, botMessage}) => {
    return (
        <>
            <ChatRecord userMessage={userMessage} botMessage={botMessage}/>
            <hr className="text-[rgba(255,193,180,1)]"/>
            <ComfortRecord />
            <hr className="text-[rgba(255,193,180,1)]"/>
            <ErrorRecord />

        </>
    );
}

export default AnalysisPanel;