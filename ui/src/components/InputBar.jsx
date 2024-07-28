import { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import RecordButton from './RecordButton';
import toWav from 'audiobuffer-to-wav';
import axios from 'axios';
import { transform } from 'lodash';
import { Link } from 'react-router-dom';
import { URL } from "../constants/pathConstants"


const partitionLogs = (logs) => {
    var result = [];
    for (var i = 0; i < logs.length; i += 2) {
        result.push(logs.slice(i, i + 2));
    }

    return result.map((entry) => {
        return {
            [entry[0]?.split(":")[0]]: entry[0]?.split(":")[1],
            [entry[1]?.split(":")[0]]: entry[1]?.split(":")[1],
        }

    })
}

const InputBar = ({logs, setLogs, topic, lang, loading, setLoading}) => {
    const recorderControls = useAudioRecorder()
    const [isRecording, setIsRecording] = useState(false);
    const addAudioElement2 = async (blob) => {
        const audioForm = new FormData();
        const chatForm = new FormData();
        const translateForm = new FormData();
        const location = window.location.hostname;
        const logsCopy = [...logs]; // Make a copy of logs to avoid issues with state updates

        try {
            audioForm.append("blob", blob);
            audioForm.append("lang", lang);
            // Fetch transcription
            const fetchTranscribe = await fetch(`${URL}/transcribe`, {
                method: 'POST',
                body: audioForm,
            });
            const transcribeResponse = await fetchTranscribe.text();
    
            // Update logs with transcribe response
            logsCopy.push(`USER: ${transcribeResponse}`);
            
            chatForm.append("message", transcribeResponse);
            chatForm.append("chat_history", logsCopy.join('|'));
    
            // Fetch chat response
            const fetchChat = await fetch(`${URL}/chat/${topic}`, {
                method: 'POST',
                body: chatForm,
            });
            const chatResponse = await fetchChat.text();
            
            // // Update chatForm and fetch translation
            translateForm.append("text", chatResponse);
            translateForm.append("target", lang);
    
            // Fetch translation
            const fetchTranslate = await fetch(`${URL}/translate`, {
                method: 'POST',
                body: translateForm,
            });
            const translateResponse = await fetchTranslate.text();
            // console.log(translateResponse);
            setLogs((logs) => [...logs, `USER: ${transcribeResponse}`, `AI: ${translateResponse}`]);
        } catch (e) {
            console.error(e); // Handle errors more gracefully, e.g., show an error message
        }
    }
    
    const startRecording = () => {
        recorderControls.startRecording();
        setIsRecording(true);
    }
    const stopRecording = () => {
        recorderControls.stopRecording();
        setIsRecording(false);
    }
    return(
        <div className="fixed bottom-0 w-full h-20 bg-[#424242] border-t-2 border-t-white z-10">
            <div className="hidden">
                <AudioRecorder 
                    onRecordingComplete={addAudioElement2}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }} 
                    downloadFileExtension="wav"
                    recorderControls={recorderControls}
                />
            </div>
            {
                logs.length < 6 ?
                <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} stopRecording={() => stopRecording()} startRecording={() => startRecording()}/>:
                <Link className="border-none rounded-3xl w-30 h-15 bg-[#E0F1EA] text-[#355146] text-[0.75rem] font-semibold px-12 py-3 my-4" state={{chatHistory: partitionLogs(logs)}} to="/analysis">
                    View Analysis
                </Link>
            }
        </div>


    );
}

export default InputBar;