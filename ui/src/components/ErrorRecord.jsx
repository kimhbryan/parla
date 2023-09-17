import { Disclosure } from '@headlessui/react'
import { ReactComponent as UserLogo } from "../images/userLogo.svg"

const ErrorRecord = (userMessage, feedback) => {
    return (
        <div>
            <div className="grid m-6">
                <div>
                    <UserLogo className="w-8 h-10"/>
                    {/* <p>{botMessage}</p> */}
        
                </div>
            </div>
            <div className="mx-auto max-w-3xl my-5 py-0 text-sm rounded-2xl bg-[rgba(235,245,241,1)] border border-[rgba(89,146,123,1)] p-2">
                <Disclosure>
                    <Disclosure.Button className="py-2 px-2 flex">
                        -> Suggestion
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500 flex px-2 py-2">
                        {/* {feedback} */}
                    </Disclosure.Panel>
                </Disclosure>
            </div>
        </div>
    );
}

export default ErrorRecord;