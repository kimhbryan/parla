import {ReactComponent as BotLogo} from "../images/botLogo.svg"
import {ReactComponent as UserLogo} from "../images/userLogo.svg"


const ChatRecord = ({userMessage, botMessage}) => {
    return (
        <div className="grid grid-rows-2 m-6 gap-10">
            <div className="flex flex-row">
                <BotLogo className="w-8 h-10 mr-3"/>
                <p className="text-sm text-left">{botMessage}</p>

            </div>
            <div className="flex flex-row">
                <UserLogo className="w-8 h-10 mr-3"/>
                <p className="text-sm text-left">{userMessage}</p>

            </div>
        </div>
    );
}

export default ChatRecord;