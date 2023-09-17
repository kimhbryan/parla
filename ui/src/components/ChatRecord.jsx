import {ReactComponent as BotLogo} from "../images/botLogo.svg"
import {ReactComponent as UserLogo} from "../images/userLogo.svg"


const ChatRecord = (userMessage, botMessage) => {
    return (
        <div className="grid grid-rows-2 m-6">
            <div>
                <BotLogo className="w-8 h-10"/>
                {/* <p>{botMessage}</p> */}
    
            </div>
            <div>
                <UserLogo className="w-8 h-10"/>
                {/* <p>{userMessage}</p> */}

            </div>
        </div>
    );
}

export default ChatRecord;