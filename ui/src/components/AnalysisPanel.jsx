import ChatRecord from "./ChatRecord";
import ComfortRecord from "./ComfortRecord";
import ErrorRecord from "./ErrorRecord";

const AnalysisPanel = ({userMessage, botMessage, score, feedback}) => {
    return (
        <>
            <ChatRecord userMessage={userMessage} botMessage={botMessage}/>
            <hr className="text-[rgba(255,193,180,1)]"/>
            <ComfortRecord score={score}/>
            <hr className="text-[rgba(255,193,180,1)]"/>
            <ErrorRecord userMessage={userMessage} feedback={feedback}/>

        </>
    );
}

export default AnalysisPanel;