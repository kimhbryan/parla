import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import AnalysisPanel from "../components/AnalysisPanel";
import ChatHeader from "../components/ChatHeader";
import {ReactComponent as BlobsLight} from "../images/blobsLight.svg"
import { URL } from "../constants/pathConstants"
import "./analysis.css"

const tabHeaders = ["Response 1", "Response 2", "Response 3"];
const tabContent = ["Content 1", "Content 2", "Content 3"];



const Analysis = () => {
    const location = useLocation();
    const {chatHistory} = location.state ?? {chatHistory: []}
    const {lang} = useParams()
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const getFeedback = async () => {
            const feedbackForm = new FormData();
            for (let i = 0; i < chatHistory.length; i++) {
                console.log(chatHistory[i]["USER"])
                feedbackForm.append(`user_transcript[]`, chatHistory[i]["USER"]);
            }
            const fetchFeedback = await fetch(`${URL}/feedback`, {
                method: 'POST',
                header: {
                    'Content-Type': 'multipart/form-data'
                },
                body: feedbackForm,
            });
            
            const feedbackJSON = await fetchFeedback.json();
            setFeedback(feedbackJSON);
            
            // console.log(feedbackJSON["1"])
        
        }

        getFeedback();

    }, []);



    return (
        <div className="analysis w-screen h-screen">
            <ChatHeader topic={"Analysis Results"} darkMode={true}/>
            <BlobsLight className="fixed w-100 h-100 z-0"/>
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h3 className="z-20 text-black">Thank you for learning with <i className="font-bold">Parla</i> today.</h3>
                <p className="text-black text-sm">{feedback?feedback["overall"]:""}</p>  
            </div>
            <Tab.Group className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-3/5 rounded-xl border-2 border-[rgba(255,127,99,0.3)] mt-10" as="div">
            <Tab.List  as="div" className="grid grid-cols-3 m-0 justify-around space-x-1 rounded-t-xl bg-[rgba(217,166,229,0.28)]">
                {
                    tabHeaders.map((header, index) => {
                        let border = "";
                        if(index == 0) {
                            border = "rounded-tl-lg border-r-2 border-t-0 border-l-0"
                        } else if (index == tabHeaders.length - 1) {
                            border = "rounded-tr-lg border-l-2 border-t-0 border-r-0"
                        } else {
                            border = "border-t-0 border-x-0"
                        }
                        return(
                            <Tab className={classNames("!m-0 text-black border-2  border-[rgba(255,127,99,0.3)] focus:bg-[rgba(255,193,180,1)] focus:font-semibold text-[1.4rem] h-20", border)}>{header}</Tab>
                        )
                    })
                }
            </Tab.List>
            <Tab.Panels as="div" className="border-b-0">
                {
                    chatHistory.map((entry, index) => {
                        return(
                            <Tab.Panel className="text-black border-bottom-none">
                                <AnalysisPanel userMessage={entry["USER"]} botMessage={entry["AI"]} score={feedback?feedback?.[String(index)]?.[1]: ""} feedback={feedback?feedback?.[String(index)]?.[0]: ""}/>
                            </Tab.Panel>
                        )
                    })
                }
            </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default Analysis;